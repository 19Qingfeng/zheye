<template>
  <div class="file-upload">
    <div class="file-upload-container" v-bind="$attrs" @click="handleUpload">
      <template v-if="fileStatus === 'ready'">
        <slot name="ready">
          <button class="btn btn-primary">上传文件</button>
        </slot>
      </template>
      <template v-if="fileStatus === 'loading'">
        <slot name="loading">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </slot>
      </template>
      <template v-if="fileStatus === 'success'">
        <slot name="success" :data="fileResponse">上传成功</slot>
      </template>
      <template v-if="fileStatus === 'error'">
        <slot name="error">上传失败</slot>
      </template>
    </div>
    <div class="upload-tip" v-show="fileStatus === 'ready'">
      <slot name="tip">上传文件提示内容。</slot>
    </div>

    <input
      ref="fileInput"
      type="file"
      class="file-input d-none"
      @change="onFileChange"
    />
  </div>
</template>

<script lang='ts'>
import request from '@/api/config/request'
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

type FileStatus = 'success' | 'error' | 'loading' | 'ready';
type BeforeFunc = (file: File) => boolean;
type uploadResFunc = (res: any, file: File) => void;
interface UploadInfo {
  status: FileStatus;
  url?: string;
}

export default defineComponent({
  name: 'Upload',
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      require: true
    },
    beforeUpload: {
      type: Function as PropType<BeforeFunc>
    },
    uploadSuccess: {
      type: Function as PropType<uploadResFunc>
    },
    uploadError: {
      type: Function as PropType<uploadResFunc>
    },
    defaultUrl: {
      type: String
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<FileStatus>(props.defaultUrl ? 'success' : 'ready')
    const fileResponse = ref<any>(
      props.defaultUrl ? { url: props.defaultUrl } : ''
    )
    const handleUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleSingleFile = async (file: File) => {
      const name = file.name
      const formData = new FormData()
      formData.append(name, file)
      // 处理上传
      return request({
        url: props.action,
        method: 'post',
        data: formData
      })
    }
    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
        }
        const fileList = Array.from(files)
        fileStatus.value = 'loading'
        // 暂时单选
        const file = fileList[0]
        handleSingleFile(file)
          .then((res) => {
            fileStatus.value = 'success'
            fileResponse.value = res
            if (props.uploadSuccess) props.uploadSuccess(res, file)
          })
          .catch((error) => {
            fileStatus.value = 'error'
            if (props.uploadError) props.uploadError(error, file)
          })
          .finally(() => {
            target.value = ''
          })
      }
    }

    return {
      fileInput,
      fileStatus,
      handleUpload,
      onFileChange,
      fileResponse
    }
  }
})
</script>
<style lang="scss" scoped>
.file-upload {
  .upload-tip {
    font-size: 12px;
    color: #333;
  }
}
</style>

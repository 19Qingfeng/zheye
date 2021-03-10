<template>
  <div class="container">
    <Upload
      action="/upload"
      class="mb-2"
      :beforeUpload="onBeforeUpload"
      :uploadSuccess="onSuccess"
      :uploadError="onError"
    >
      <template #ready> 准备 </template>
      <template #success="dataProps">
        <img :src="dataProps.data.url" :width="500" />
      </template>
      <template #tip> 限制文件上传 </template>
    </Upload>
    <router-view></router-view>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import Upload from '@/components/Upload/index.vue'
export default defineComponent({
  components: {
    Upload
  },
  setup () {
    // 上传之前的钩子函数
    const onBeforeUpload = (file: File) => {
      console.log(file, 'file')
      return true
    }
    const onSuccess = (res: any, file: File) => {
      // 上传成功
      console.log(res, '返回结果')
      console.log(file, '上传的文件')
    }
    const onError = (error: any, file: File) => {
      // 上传失败
      console.log(error, '上传失败')
      console.log(file, '上传失败的文件')
    }
    return {
      onBeforeUpload,
      onSuccess,
      onError
    }
  }
})
</script>

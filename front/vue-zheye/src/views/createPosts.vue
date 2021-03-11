<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <upload
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      action="/upload"
      :beforeUpload="onBeforeUpload"
      :uploadSuccess="onUploadSuccess"
      :uploadError="onUploadError"
      defaultUrl="https://th.wallhaven.cc/lg/pk/pkkm6p.jpg"
    >
      <template #ready>
        <h2>点击上传头图</h2>
      </template>
      <template #tip>
        <div class="tip">
          <div>头图大小不得超过1Mb。</div>
          <div>仅仅支持image/png格式</div>
        </div>
      </template>
      <template #success="scopeProps">
        <img :src="scopeProps.data.url" />
      </template>
    </upload>
    <validate-form @onFormSubmit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <validate-input
          :rules="titleRules"
          v-model="title"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label"> 文章内容 </label>
        <validate-input
          v-model="context"
          :rules="contextRules"
          placeholder="请输入文章内容"
          rows="10"
          tag="textarea"
          type="textarea"
        >
        </validate-input>
      </div>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import Upload from '@/components/Upload/index.vue'
import { useUpload } from '@/hooks/useUpload'
import ValidateForm from '@/components/validateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import type { CreatePostParams } from '@/api/home/interface'

export default defineComponent({
  name: 'CreatePosts',
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const column = computed(() => {
      return store.state.user.user.column
    })
    const author = computed(() => {
      return store.state.user.user._id
    })
    const title = ref('')
    const context = ref('')
    const titleRules = [
      {
        type: 'require',
        message: '必填项'
      }
    ]
    const contextRules = [
      {
        type: 'require',
        message: '必填项'
      }
    ]
    // 上传逻辑
    const {
      response,
      onBeforeUpload,
      onUploadError,
      onUploadSuccess
    } = useUpload(1, ['image/png', 'image/jpeg'])
    // 点击提交 boolean
    const getParams: () => CreatePostParams = () => {
      return {
        title: title.value,
        content: context.value,
        column: column.value!,
        author: author.value!,
        image: response.success && (response.success as any).id
      }
    }
    const onFormSubmit = async (boolean: boolean) => {
      if (boolean) {
        const params = getParams()
        await store.dispatch('home/createPost', params)
        router.push({
          name: 'Home'
        })
      }
    }
    return {
      title,
      context,
      titleRules,
      onFormSubmit,
      contextRules,
      onBeforeUpload,
      onUploadError,
      onUploadSuccess
    }
  }
})
</script>
<style lang="scss">
.create-post-page {
  .file-upload-container {
    height: 200px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }
  .tip {
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    response:{{ response }}
    <upload
      action="/upload"
      :beforeUpload="onBeforeUpload"
      :uploadSuccess="onUploadSuccess"
      :uploadError="onUploadError"
    />
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Upload from '@/components/Upload/index.vue'
import ValidateForm from '@/components/validateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import { useUpload } from '@/hooks/useUpload'

export default defineComponent({
  name: 'CreatePosts',
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const router = useRouter()
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
    // 点击提交 boolean
    const onFormSubmit = (boolean: boolean) => {
      if (boolean) {
        // store.commit('home/createPosts', mockProps)
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
      ...useUpload(1, ['image/png'])
    }
  }
})
</script>

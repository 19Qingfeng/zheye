<template>
  <validate-form @on-form-submit="onSubmit" ref="form">
    <div class="mb-3">
      <validate-input placeholder="请输入邮箱" v-model="email" :rules="rules" />
      <validate-input
        placeholder="请输入密码"
        type="password"
        v-model="password"
        :rules="rules"
      />
    </div>

    <template #footer>
      <div class="mb-3">
        <span class="btn btn-primary me-3">提交</span>
        <span class="btn btn-secondary">取消</span>
      </div>
    </template>
  </validate-form>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'
import ValidateInput, { RulesProps } from '../components/ValidateInput.vue'
import ValidateForm from '../components/validateForm.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const form = ref<any>(null)
    const password = ref('111111')
    const email = ref('111@test.com')
    const rules = reactive<RulesProps>([
      { type: 'require', message: '请输入邮箱' }
    ])
    const onSubmit = async (validate: boolean) => {
      if (validate) {
        const obj = {
          email: email.value,
          password: password.value
        }
        await store.dispatch('user/getLoginInfo', obj)
        form.value.clearFormData()
        router.push({ name: 'Home' })
      }
    }
    return {
      rules,
      form,
      email,
      password,
      onSubmit
    }
  }
})
</script>

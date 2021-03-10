<template>
  <validate-form @on-form-submit="onSubmit" ref="form">
    <div class="mb-3">
      <validate-input placeholder="请输入邮箱" v-model="email" :rules="rules" />
      <validate-input placeholder="请输入昵称" v-model="name" :rules="rules" />
      <validate-input
        placeholder="请输入密码"
        type="password"
        v-model="password"
        :rules="rules"
      />
      <validate-input
        placeholder="请再次输入密码"
        type="password"
        v-model="rePassword"
        :rules="reRules"
      />
    </div>

    <template #footer>
      <div class="mb-3">
        <span class="btn btn-primary me-3">注册新用户</span>
      </div>
    </template>
  </validate-form>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProps } from '../components/ValidateInput.vue'
import ValidateForm from '../components/validateForm.vue'

export default defineComponent({
  name: 'Register',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const email = ref('')
    const name = ref('')
    const password = ref('')
    const rePassword = ref('')
    const rules = [{ type: 'require', message: '必填项' }]
    const reRules: RulesProps = [
      {
        type: 'custom',
        validate: (value) => {
          return value === password.value
        },
        message: '两次输入密码不一致'
      }
    ]
    const onSubmit = () => {
      // nothing
    }
    return {
      email,
      name,
      password,
      rePassword,
      rules,
      reRules,
      onSubmit
    }
  }
})
</script>

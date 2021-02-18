<template>
  <forgot-password-form />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ForgotPasswordForm from 'Forms/ForgotPassword.vue'

@Component({
  components: {
    ForgotPasswordForm,
  },
})
export default class ForgotPasswordPage extends Vue {
  layout() {
    return 'auth'
  }

  head() {
    return {
      title: 'Восстановление забытого пароля',
    }
  }
}
</script>

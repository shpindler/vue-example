<template>
  <login-form />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LoginForm from 'Forms/Login.vue'

@Component({
  components: {
    LoginForm,
  },
})
export default class AuthPage extends Vue {
  layout() {
    return 'auth'
  }

  head() {
    return {
      title: 'Вход',
    }
  }
}
</script>

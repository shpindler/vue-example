<template>
  <password-reset-form
    v-if="isValidToken"
    :uidb64="$route.params.uidb64"
    :token="$route.params.token"
  />
  <div v-else>
    <div class="mb-4">
      Данная ссылка для восстановления пароля уже была использована!
      Воспользуйтесь службой восстановления пароля ещё раз!
    </div>
    <div class="text-right">
      <vue-btn
        :to="{ name: 'auth' }"
        variant="primary"
      >
        ОК
      </vue-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PasswordResetForm from 'Forms/PasswordReset.vue'
import { Context } from '@nuxt/types'
import { checkPasswordResetToken } from '@/business/user/auth/api'

@Component({
  components: {
    PasswordResetForm,
  },
})
export default class PasswordResetPage extends Vue {
  layout() {
    return 'auth'
  }

  asyncData({ app, route }: Context): Promise<{ isValidToken: boolean }> {
    if (route.params.token === 'set-password') {
      return Promise.resolve({ isValidToken: true })
    }
    return checkPasswordResetToken.call(
      app,
      route.params.uidb64,
      route.params.token,
    )
      .then(() => ({
        isValidToken: true,
      }))
      .catch(() => ({
        isValidToken: false,
      }))
  }

  head() {
    return {
      title: 'Установка нового пароля',
    }
  }
}
</script>

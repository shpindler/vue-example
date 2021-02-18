<template>
  <vue-form
    class="login-form"
    @submit.prevent="onSubmit"
  >
    <section>
      <vue-text-field
        id="username"
        v-model="form.username"
        :state="getStateFor('username')"
        :error-message="getErrorMessageFor('username')"
        class="field__input w-100"
        name="username"
        label="Логин или e-mail"
      />
      <vue-text-field
        id="password"
        v-model="form.password"
        :state="getStateFor('password')"
        :error-message="getErrorMessageFor('password')"
        class="field__input w-100"
        name="password"
        type="password"
        label="Пароль"
      />
    </section>
    <div class="mb-2 text-right">
      <vue-link
        :to="{ name: 'auth-forgot-password' }"
        class="font-size-1"
      >
        Забыли пароль?
      </vue-link>
    </div>
    <div class="text-center">
      <vue-error :message="errorMessage" class="mb-4" />
      <vue-btn
        :disabled="$store.state.user.loading"
        class="login-form__submit"
        type="submit"
        variant="primary"
      >
        Войти
      </vue-btn>
    </div>
  </vue-form>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Validations } from 'vuelidate-property-decorators'
import { required } from 'vuelidate/lib/validators'
import FormMixin from './form'
import { LoginData } from '@/business/user/auth/types'
import { userStore } from '@/store'

@Component
export default class LoginForm extends mixins(FormMixin) {
  form: LoginData = {
    username: '',
    password: '',
  }

  errorMessage = ''

  @Validations()
  validations = {
    form: {
      username: { required },
      password: { required },
    },
  }

  send(data: LoginData): Promise<void> {
    return userStore.login(data)
      .then(({ uidb64, token }) => {
        if (uidb64 && token) {
          this.$router.push({
            name: 'auth-reset-uidb64-token',
            params: {
              uidb64,
              token,
              password: this.form.password,
            },
          })
        } else {
          this.$router.push({ name: 'auth-role' })
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message
        }
      })
  }
}
</script>

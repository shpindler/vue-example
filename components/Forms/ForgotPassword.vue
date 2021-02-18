<template>
  <vue-form
    class="password-reset-form"
    @submit.prevent="onSubmit"
  >
    <vue-text-field
      id="email"
      v-model="form.email"
      :state="getStateFor('email')"
      :error-message="getErrorMessageFor('email')"
      type="email"
      name="email"
      class="mb-4 w-100"
      label="E-mail"
    />
    <div class="text-center">
      <vue-error :message="errorMessage" class="mb-4" />
      <vue-btn
        :disabled="$store.state.user.loading"
        type="submit"
        variant="primary"
      >
        Отправить
      </vue-btn>
    </div>
  </vue-form>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { Validations } from 'vuelidate-property-decorators'
import { email, required } from 'vuelidate/lib/validators'
import FormMixin from './form'
import { getPasswordResetLink } from '@/business/user/auth/api'
import { PasswordResetLinkData } from '@/business/user/auth/types'

@Component
export default class ForgotPasswordForm extends mixins(FormMixin) {
  form: PasswordResetLinkData = {
    email: '',
  };

  errorMessage = ''

  @Validations()
  validations = {
    form: {
      email: { email, required },
    },
  };

  send(data: PasswordResetLinkData): Promise<void> {
    this.$store.commit('SET_LOADING', true)
    return getPasswordResetLink.call(this, data)
      .then(() => {
        this.$router.push({ name: 'auth-email-sent' })
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message
        }
      })
      .finally(() => {
        this.$store.commit('SET_LOADING', false)
      })
  }
}
</script>

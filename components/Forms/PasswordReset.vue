<template>
  <vue-form
    class="password-reset-form"
    @submit.prevent="onSubmit"
  >
    <section :class="{ 'mb-5': !errorMessage, 'mb-4': errorMessage }">
      <vue-text-field
        id="newPassword1"
        v-model="form.newPassword1"
        :title="tooltipText"
        :state="getStateFor('newPassword1')"
        :error-message="getErrorMessageFor(
          'newPassword1',
          {
            minLength: passwordMinLength,
            maxLength: passwordMaxLength,
            difference: passwordDifference
          }
        )"
        type="password"
        name="newPassword1"
        label="Пароль"
        class="w-100"
      />
      <vue-text-field
        id="newPassword2"
        v-model="form.newPassword2"
        :state="getStateFor('newPassword2')"
        :error-message="getErrorMessageFor('newPassword2')"
        type="password"
        name="newPassword2"
        label="Подтверждение пароля"
        class="w-100"
      />
    </section>
    <div class="text-center">
      <div
        class="mb-4 text-red"
        v-html="errorMessage"
      />
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
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import { Validations } from 'vuelidate-property-decorators'
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'
import FormMixin from './form'
import {
  hasNumber,
  hasUpperCaseLetter,
  hasLowerCaseLetter,
  hasSpecialSymbol,
  stringsDifference,
} from './validators'
import { FormErrors } from '@/types'
import { resetPassword } from '@/business/user/auth/api'
import { PasswordResetData } from '@/business/user/auth/types'

interface Errors extends FormErrors {
  newPassword1?: string[];
  newPassword2?: string[];
}

@Component
export default class PasswordResetForm extends mixins(FormMixin) {
  @Prop() readonly uidb64!: string
  @Prop() readonly token!: string

  form: PasswordResetData = {
    newPassword1: '',
    newPassword2: '',
  }

  errors: Errors = {}

  passwordMinLength = 8
  passwordMaxLength = 20
  passwordDifference = 4

  tooltipText =
    'Длина от 8 до 20 символов. ' +
    'Должен содержать хотя бы одну цифру, заглавную и строчную буквы, ' +
    'и один спец.символ.'

  @Validations()
  validations() {
    const newPassword1: any = {
      required,
      minLength: minLength(this.passwordMinLength),
      maxLength: maxLength(this.passwordMaxLength),
      hasNumber,
      hasUpperCaseLetter,
      hasLowerCaseLetter,
      hasSpecialSymbol,
    }
    if (this.originalPassword) {
      newPassword1.stringsDifference = stringsDifference(
        this.originalPassword, this.passwordDifference,
      )
    }
    return {
      form: {
        newPassword1,
        newPassword2: {
          required,
          passwordConfirm: sameAs(() => this.form.newPassword1),
        },
      },
    }
  }

  get errorMessage(): string {
    return this.errors.all ? this.errors.all.join('; ') : ''
  }

  get originalPassword(): string {
    return this.$route.params.password
  }

  send(data: PasswordResetData): Promise<void> {
    this.$store.commit('SET_LOADING', true)
    return resetPassword.call(this, this.uidb64, this.token, data)
      .then(() => {
        this.$router.push({ name: 'auth-reset-complete' })
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })
      .finally(() => {
        this.$store.commit('SET_LOADING', false)
      })
  }
}
</script>

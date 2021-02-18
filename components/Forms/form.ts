/** Миксин с общей функциональностью форм.  */
import { Component, mixins } from 'nuxt-property-decorator'
import { Validate } from 'vuelidate-property-decorators'
import { validationMixin } from 'vuelidate'
import { decline } from '@/utils'

interface FormData {
  [key: string]: any;
}

interface ErrorParams {
  minLength?: number;
  maxLength?: number;
  difference?: number;
}

const Errors = {
  Required: 'Обязательное поле.' as string,
  PasswordConfirm: 'Пароли не совпадают.' as string,
  MinLength: (l = 0): string => `Минимальная длина: ${l}.`,
  MaxLength: (l = 0): string => `Максимальная длина: ${l}.`,
  HasNumber: 'Должно содержать хотя бы одну цифру.' as string,
  HasUpperCaseLetter: 'Должно содержать хотя бы одну заглавную букву.' as
    string,
  HasLowerCaseLetter: 'Должно содержать хотя бы одну строчную букву.' as string,
  HasSpecialSymbol: 'Должно содержать хотя бы один специальный символ.' as
    string,
  StringsDifference: (d = 0): string =>
    `Старый и новый пароли должны различаться
    как минимум на ${d} ${decline(['символ', 'символа', 'символов'], d)}.`,
  Default: 'Некорректные данные.' as string,
}

@Component
export default class FormMixin extends mixins(validationMixin) {
  @Validate({})
  form: FormData = {}

  isValid(): boolean {
    this.$v.$touch()
    return !this.$v.$invalid
  }

  getStateFor(field: string): boolean {
    const vForm = this.$v.form
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return !vForm || !vForm[field] || !vForm[field].$error
  }

  getErrorMessageFor(field: string, params: ErrorParams = {}): string {
    const vForm = this.$v.form
    const vField = vForm ? vForm[field] : null

    if (!vField || !vField.$error) {
      return ''
    }

    if (vField.required === false) {
      return Errors.Required
    } else if (vField.passwordConfirm === false) {
      return Errors.PasswordConfirm
    } else if (vField.minLength === false) {
      return Errors.MinLength(params.minLength)
    } else if (vField.maxLength === false) {
      return Errors.MaxLength(params.maxLength)
    } else if (vField.hasNumber === false) {
      return Errors.HasNumber
    } else if (vField.hasUpperCaseLetter === false) {
      return Errors.HasUpperCaseLetter
    } else if (vField.hasLowerCaseLetter === false) {
      return Errors.HasLowerCaseLetter
    } else if (vField.hasSpecialSymbol === false) {
      return Errors.HasSpecialSymbol
    } else if (vField.stringsDifference === false) {
      return Errors.StringsDifference(params.difference)
    } else {
      return Errors.Default
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(data: FormData): Promise<void> {
    return Promise.resolve()
  }

  getFormData(): FormData {
    return this.form
  }

  onSubmit(): Promise<void> {
    if (this.isValid()) {
      return this.send(this.getFormData())
    }
    return Promise.resolve()
  }
}

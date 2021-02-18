import {
  ApiContext,
  AxiosResponse,
} from '../../types'
import {
  LoginData,
  LoginResponseData,
  PasswordResetLinkData,
  PasswordResetData,
} from './types'
import { convertToFormData } from '@/utils'

export function login(
  this: ApiContext,
  data: LoginData,
): AxiosResponse<LoginResponseData> {
  return this.$axios.post('/auth/login', data, {
    transformRequest: [convertToFormData],
  })
}

export function logout(this: ApiContext): AxiosResponse<{}> {
  return this.$axios.post('/auth/logout')
}

export function getPasswordResetLink(
  this: ApiContext,
  data: PasswordResetLinkData,
): AxiosResponse<{}> {
  return this.$axios.post('/password_reset', data, {
    transformRequest: [convertToFormData],
  })
}

export function resetPassword(
  this: ApiContext,
  uidb64: string,
  token: string,
  data: PasswordResetData,
): AxiosResponse<{}> {
  return this.$axios.get(`/reset/${uidb64}/${token}`).then(() => {
    return this.$axios.post(`/reset/${uidb64}/set-password`, data, {
      transformRequest: [
        (data: { new_password_1: string; new_password_2: string }) => {
          return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            new_password1: data.new_password_1,
            // eslint-disable-next-line @typescript-eslint/camelcase
            new_password2: data.new_password_2,
          }
        }, convertToFormData],
    })
  })
}

export function checkPasswordResetToken(
  this: ApiContext,
  uidb64: string,
  token: string,
): AxiosResponse<{}> {
  return this.$axios.post(`/auth/reset/${uidb64}/${token}`)
}

export function checkAuthentication(this: ApiContext): AxiosResponse<{}> {
  return this.$axios.head('/me')
}

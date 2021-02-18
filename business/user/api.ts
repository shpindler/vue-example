import { ApiContext, AxiosResponse } from '../types'
import { UpdateUserData, UserResponseData } from './types'
import { convertToFormData, formatDates, removeUndefined } from '@/utils'

export function fetchUser(
  this: ApiContext,
): AxiosResponse<UserResponseData> {
  return this.$axios.get('/me')
}

export function updateUser(
  this: ApiContext,
  data: UpdateUserData,
): AxiosResponse<UserResponseData> {
  return this.$axios.post('/me', data, {
    transformRequest: [removeUndefined, formatDates, convertToFormData],
  })
}

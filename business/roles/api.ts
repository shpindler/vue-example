import { ApiContext, AxiosResponse } from '../types'
import { RolesRowsData, SetRoleData, RawRole } from './types'
import { convertToFormData } from '@/utils'

export function getCurrentRole(this: ApiContext):
  AxiosResponse<{ role: RawRole }> {
  return this.$axios.get('/auth/current-role')
}

export function getRoles(this: ApiContext): AxiosResponse<RolesRowsData> {
  return this.$axios.get('/auth/roles')
}

export function setRole(
  this: ApiContext,
  data: SetRoleData,
): AxiosResponse<{}> {
  return this.$axios.post('/auth/roles', data, {
    transformRequest: [convertToFormData],
  })
}

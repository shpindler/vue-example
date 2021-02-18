import { ApiContext, AxiosResponse } from '../types'
import { GetActionsResponseData } from './types'

export function getActions(this: ApiContext):
  AxiosResponse<GetActionsResponseData> {
  return this.$axios.get('/desk/data')
}

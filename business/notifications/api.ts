import ReconnectingWebSocket from 'reconnecting-websocket'
import { ApiContext, AxiosResponse } from '../types'
import { RawNotification } from './types'

export function getNotifications(this: ApiContext):
  AxiosResponse<RawNotification[]> {
  return this.$axios.get('/notifications')
}

export function getWebSocket(): ReconnectingWebSocket {
  const isSecure = location.protocol === 'https:'
  return new ReconnectingWebSocket(
    `ws${isSecure ? 's' : ''}://${location.host}/websocket/notifications`,
  )
}

export function markAsSeen(this: ApiContext): AxiosResponse<{}> {
  return this.$axios.post('/notifications/mark-as-seen')
}

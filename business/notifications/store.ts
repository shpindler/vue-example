import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { getNotifications, getWebSocket, markAsSeen } from './api'
import { Notification, parseNotification } from './models'

@Module({
  name: 'notifications',
  stateFactory: true,
  namespaced: true,
})
export class NotificationsModule extends VuexModule {
  notifications: Notification[] = []

  get unseenNotifications(): Notification[] {
    return this.notifications.filter(({ seen }) => !seen)
  }

  @Mutation
  SET_NOTIFICATIONS(payload: Notification[]): void {
    this.notifications = payload
  }

  @Mutation
  ADD_NOTIFICATION(payload: Notification): void {
    this.notifications.unshift(payload)
  }

  @Mutation
  MARK_AS_SEEN(): void {
    this.notifications.forEach((n) => {
      n.seen = true
    })
  }

  @Action
  establishWebSocket(): void {
    getWebSocket().onmessage = ({ data }) => {
      this.context.commit(
        'ADD_NOTIFICATION',
        parseNotification(JSON.parse(data)),
      )
    }
  }

  @Action
  getNotifications(): Promise<Notification[]> {
    return getNotifications.call((this as any).store)
      .then(({ data }) => {
        this.context.commit('SET_NOTIFICATIONS', data.map(parseNotification))
        return this.notifications
      })
  }

  @Action
  markAsSeen(): Promise<void> {
    return markAsSeen.call((this as any).store)
      .then(() => {
        this.context.commit('MARK_AS_SEEN')
      })
  }
}

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import RolesModule from '@/store/roles'
import UserModule from '@/store/user'
import NotificationsModule from '@/store/notifications'

// eslint-disable-next-line import/no-mutable-exports
let rolesStore: RolesModule
// eslint-disable-next-line import/no-mutable-exports
let userStore: UserModule
// eslint-disable-next-line import/no-mutable-exports
let notificationsStore: NotificationsModule

function initialiseStores(store: Store<any>): void {
  rolesStore = getModule(RolesModule, store)
  userStore = getModule(UserModule, store)
  notificationsStore = getModule(NotificationsModule, store)
}

export { initialiseStores, rolesStore, userStore, notificationsStore }

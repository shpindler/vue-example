import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { checkAuthentication, login, logout } from './auth/api'
import { LoginData, LoginResponseData } from './auth/types'
import { fetchUser, updateUser } from './api'
import { UpdateUserData } from './types'
import { UserProfile } from './models'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
export class UserModule extends VuexModule {
  user: UserProfile | null = null
  loggedIn = false

  @Mutation
  SET_USER(payload: UserProfile | null): void {
    this.user = payload
  }

  @Mutation
  SET_LOGGED_IN(payload: boolean): void {
    this.loggedIn = payload
  }

  @Mutation
  RESET(): void {
    this.loggedIn = false
    this.user = null
  }

  @Action
  fetchUser(): Promise<UserProfile> {
    return fetchUser.call((this as any).store)
      .then(({ data }) => {
        this.context.commit('SET_USER', new UserProfile(data.user))
        return this.user as UserProfile
      })
  }

  @Action({ rawError: true })
  login(payload: LoginData): Promise<LoginResponseData> {
    this.context.commit('SET_LOADING', true, { root: true })
    return login.call((this as any).store, payload)
      .then(({ data }) => {
        if (data.user) {
          this.context.commit('SET_LOGGED_IN', true)
          this.context.commit('SET_USER', new UserProfile(data.user))
        }
        return data
      })
      .finally(() => {
        this.context.commit('SET_LOADING', false, { root: true })
      })
  }

  @Action
  logout(): Promise<void> {
    return logout.call((this as any).store)
      .then(() => {
        return this.context.dispatch('reset', undefined, { root: true })
      })
  }

  @Action
  updateUser(form: UpdateUserData): Promise<UserProfile> {
    return updateUser.call((this as any).store, form)
      .then(({ data }) => {
        this.context.commit('SET_USER', new UserProfile(data.user))
        return this.user as UserProfile
      })
  }

  @Action
  async checkAuthentication(): Promise<boolean> {
    this.context.commit(
      'SET_LOGGED_IN',
      await checkAuthentication.call((this as any).store)
        .then(() => true)
        .catch(() => false),
    )
    return this.loggedIn
  }
}

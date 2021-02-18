import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { SetRoleData } from './types'
import { getCurrentRole, getRoles, setRole } from './api'
import { Role } from './models'

@Module({
  name: 'roles',
  stateFactory: true,
  namespaced: true,
})
export class RolesModule extends VuexModule {
  role: Role | null = null
  availableRoles: Role[] = []

  @Mutation
  SET_ROLE(role: Role): void {
    this.role = role
  }

  @Mutation
  SET_AVAILABLE_ROLES(roles: Role[]): void {
    this.availableRoles = roles
  }

  @Mutation
  RESET(): void {
    this.role = null
    this.availableRoles = []
  }

  @Action
  setRole(role: SetRoleData): Promise<void> {
    const { roleId } = role
    this.context.commit('SET_LOADING', true, { root: true })
    return setRole.call((this as any).store, role)
      .then(() => {
        this.context.commit(
          'SET_ROLE',
          this.availableRoles.find(({ id }) => id === roleId),
        )
      })
      .finally(() => {
        this.context.commit('SET_LOADING', false, { root: true })
      })
  }

  @Action
  getRoles(): Promise<Role[]> {
    if (this.availableRoles.length) {
      return Promise.resolve(this.availableRoles)
    }
    return getRoles.call((this as any).store)
      .then(({ data }) => {
        const roles = data.rows.map(Role.parse)
        this.context.commit('SET_AVAILABLE_ROLES', roles)
        return roles
      })
  }

  @Action
  getCurrentRole(): Promise<Role | null> {
    if (this.role) {
      return Promise.resolve(this.role)
    }
    return getCurrentRole.call((this as any).store)
      .then(({ data }) => {
        this.context.commit('SET_ROLE', Role.parse(data.role))
        return this.role
      })
  }
}

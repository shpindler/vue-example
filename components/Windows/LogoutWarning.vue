<template>
  <vue-warning-confirm
    :disabled="loading"
    :height="195"
    v-bind="$attrs"
    @ok="logout"
    @cancel="$emit('close')"
    v-on="$listeners"
  >
    Вы действительно хотите выйти из системы?
  </vue-warning-confirm>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Role } from '@/business/roles/models'
import { rolesStore, userStore } from '@/store'

@Component
export default class LogoutWarning extends Vue {
  loading = false

  async logout(): Promise<void> {
    this.loading = true
    const roles: Role[] = await rolesStore
      .getRoles()
      .then((roles: Role[]): Role[] => roles)
    if (roles.length > 1) {
      await this.$router.push('/auth/role')
    } else {
      await userStore.logout()
      await this.$router.push('/auth')
    }
    this.loading = false
  }
}
</script>

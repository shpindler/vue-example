<template>
  <section v-if="roles.length > 1" class="roles-page">
    <role-form-with-logout
      :roles="roles"
      @logout="logout"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import RoleFormWithLogout from 'Containers/RoleFormWithLogout.vue'
import { Role } from '@/business/roles/models'
import { userStore, rolesStore } from '@/store'

@Component({
  components: {
    RoleFormWithLogout,
  },
})
export default class RoleSelectionPage extends Vue {
  get middleware() {
    return 'auth'
  }

  layout() {
    return rolesStore.availableRoles.length < 2 ? 'default' : 'auth'
  }

  asyncData(): Promise<{ roles: Role[] }> {
    return rolesStore.getRoles()
      .then((roles) => {
        if (roles.length === 1) {
          rolesStore.SET_ROLE(roles[0])
        }

        return { roles }
      })
  }

  beforeCreate() {
    if (rolesStore.availableRoles.length < 2) {
      this.$router.push('/')
    }
  }

  logout(): Promise<void> {
    return userStore.logout().then(() => {
      this.$router.push('/auth')
    })
  }
}
</script>

<style lang="scss">
.roles-page {
  margin: 0 -24px;
  margin-top: -24px;
}
</style>

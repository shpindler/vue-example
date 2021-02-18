<template functional>
  <section class="role-form-with-logout">
    <section>
      <role-form :roles="props.roles" />
    </section>
    <footer class="pl-4 pt-5">
      <span
        class="bold clickable brightness-on-hover transitioned"
        @click="listeners.logout"
      >
        Выйти
      </span>
    </footer>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Role } from '@/business/roles/models'

export default Vue.extend({
  name: 'RoleFormWithLogout',
  functional: true,
  props: {
    roles: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Role[]>,
  },
})
</script>

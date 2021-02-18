<template>
  <form class="roles-form">
    <section
      v-for="(role, i) in roles"
      :key="`role-${i}`"
      :class="{ selected: role === selected }"
      class="roles-form__item pl-4 pa-3"
      @click="selected = role"
      @dblclick="onSubmit"
    >
      {{ role.name }}
    </section>
  </form>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import FormMixin from './form'
import { SetRoleData } from '@/business/roles/types'
import { Role } from '@/business/roles/models'
import { rolesStore } from '@/store'

@Component
export default class RoleForm extends mixins(FormMixin) {
  @Prop({ default: () => [] }) readonly roles!: Role[]

  selected: Role | null = null

  isValid(): boolean {
    return this.selected !== null
  }

  getFormData(): SetRoleData {
    if (this.selected === null) {
      throw new Error('Роль не выбрана.')
    }

    return {
      roleId: this.selected.id,
      userType: this.selected.userType,
    }
  }

  send(data: SetRoleData): Promise<void> {
    return rolesStore.setRole(data)
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>

<style lang="scss" scoped>
.roles-form__item {
  border-bottom: 1px solid map_get($colors, gray);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: rgba(244, 246, 249, 0.4);
  }

  &.selected {
    background-color: rgba(244, 246, 249, 0.6);
  }
}
</style>

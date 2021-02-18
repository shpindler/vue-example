<template>
  <workspace-toolbar-item
    :to="url"
    :icon="action.icon"
    :title="action.name"
    :with-arrow="!!action.actions.length"
    v-bind="$attrs"
    @click="openWindow"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import WorkspaceToolbarItem from 'WorkspaceToolbarItem.vue'
import ActionMixin from './action'

@Component({
  components: {
    WorkspaceToolbarItem,
  },
})
export default class WorkspaceToolbarAction extends mixins(ActionMixin) {}
</script>

<template>
  <workspace :actions="actions" :toolbar-actions="toolbarActions" />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import Workspace from 'Workspace.vue'
import { Action } from '@/business/actions/models'
import { getActions } from '@/business/actions/api'

@Component({
  components: {
    Workspace,
  },
})
export default class IndexPage extends Vue {
  get middleware() {
    return ['auth', 'role']
  }

  async asyncData({ $axios }: Context):
    Promise<{ actions: Action[]; toolbarActions: Action[] }> {
    const { data: { desktop } } = await getActions.call({ $axios })
    const { desktopItems, menuItems } = JSON.parse(desktop)
    return {
      actions: desktopItems.map(Action.parse),
      toolbarActions: menuItems.map(Action.parse),
    }
  }

  head() {
    return {
      title: 'Рабочий стол',
    }
  }
}
</script>

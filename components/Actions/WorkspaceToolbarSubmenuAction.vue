<template>
  <article
    :class="{ 'workspace-toolbar-submenu-item_menu-opened': menuOpened }"
    class="workspace-toolbar-submenu-item"
  >
    <vue-link
      :to="url"
      class="workspace-toolbar-submenu-item__link"
      @click.native="onClick"
    >
      {{ action.name }}
      <vue-icon
        v-if="action.actions.length"
        :size="18"
        class="workspace-toolbar-submenu-item__dropdown-icon ml-1"
      >
        keyboard_arrow_down
      </vue-icon>
    </vue-link>
    <vue-collapse-transition>
      <ul
        v-if="menuOpened"
        class="pl-3 pt-4"
      >
        <li
          v-for="(action, i) in action.actions"
          :key="`action-${i}`"
          class="workspace-toolbar-submenu-item__list-item"
        >
          <workspace-toolbar-submenu-action
            :action="action"
            v-on="$listeners"
          />
        </li>
      </ul>
    </vue-collapse-transition>
  </article>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ActionMixin from './action'

@Component({
  name: 'WorkspaceToolbarSubmenuAction',
})
export default class WorkspaceToolbarSubmenuAction extends mixins(ActionMixin) {
  menuOpened = false;

  onClick(): void {
    if (this.action.url) {
      this.openWindow()
    } else {
      this.menuOpened = !this.menuOpened
    }
  }
}
</script>

<style lang="scss" scoped>
.workspace-toolbar-submenu-item {
  margin-bottom: map_get($offsets, 4);

  &:last-of-type {
    margin-bottom: 0;
  }
}

.workspace-toolbar-submenu-item/deep/ .vue-link {
  display: flex;
  align-items: center;
  color: map_get($colors, darkest);
  line-height: 1;

  &:hover {
    color: map_get($colors, dark);
  }
}

.workspace-toolbar-submenu-item__dropdown-icon {
  transform-origin: center;
  transition: 0.2s;
}

.workspace-toolbar-submenu-item_menu-opened
  .workspace-toolbar-submenu-item__dropdown-icon {
  transform: rotate(180deg);
}

.workspace-toolbar-submenu-item__list-item {
  margin-bottom: map_get($offsets, 4);

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>

<template functional>
  <article
    :class="[$style.workspaceToolbarItem, data.class, data.staticClass, {
      [$style.active]: props.active,
      [$style.workspaceToolbarItem_opened]: props.opened,
    }, 'pr-2']"
    :title="props.title"
    v-bind="data.attrs"
    class="clickable"
    v-on="listeners"
  >
    <vue-icon :class="$style.workspaceToolbarItem__icon">
      <slot name="icon">
        {{ props.icon }}
      </slot>
    </vue-icon>
    <span :class="$style.workspaceToolbarItem__title">
      <slot name="title">{{ props.title }}</slot>
    </span>
    <vue-icon
      v-if="props.withArrow"
      :class="[
        $style.workspaceToolbarItem__icon,
        $style.workspaceToolbarItem__icon_arrow,
      ]"
      class="ml-auto"
    >
      chevron_right
    </vue-icon>
    <slot />
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'WorkspaceToolbarItem',
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    icon: {
      type: String,
      default: 'build',
    } as PropOptions<string>,
    title: {
      type: String,
      default: 'Новый элемент',
    } as PropOptions<string>,
    opened: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    withArrow: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

<style lang="scss" module>
.workspaceToolbarItem {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-width: 300px;
  height: 55px;
  padding-left: 28px;
  line-height: 24px;
  transition: background-color 0.4s ease;

  &:hover {
    background-color: map_get($colors, dark);
  }
}

.workspaceToolbarItem.active .workspaceToolbarItem__icon:first-of-type {
  color: map_get($colors, white);
}

.workspaceToolbarItem__icon {
  color: map_get($colors, dark);
  transition: color 0.4s ease;

  &_arrow {
    opacity: 0;
  }
}

.workspaceToolbarItem:hover .workspaceToolbarItem__icon {
  color: map_get($colors, light-gray);
}

.workspaceToolbarItem.active .workspaceToolbarItem__icon:first-of-type {
  color: map_get($colors, white);
}

.workspaceToolbarItem__title {
  opacity: 0;
  color: map_get($colors, light-gray);
  font-size: 14px;
}

.workspaceToolbarItem_opened .workspaceToolbarItem__title,
.workspaceToolbarItem_opened .workspaceToolbarItem__icon_arrow {
  position: static;
  opacity: 1;
}

.workspaceToolbarItem_opened .workspaceToolbarItem__icon:first-of-type {
  margin-right: map_get($offsets, 4);
}

.workspaceToolbarItem_opened .workspaceToolbarItem__icon_arrow {
  position: static;
  opacity: 1;
}
</style>

<template>
  <section :class="$style.workspaceToolbarSubmenu">
    <header :class="$style.workspaceToolbarSubmenu__header">
      <span data-testid="submenu-title">{{ title }}</span>
    </header>
    <section class="py-4 px-3">
      <template v-for="(item, i) in items">
        <slot name="item" :item="item" :index="i">
          <action
            :key="`action-${i}-${item.name}`"
            :action="item"
            @window-opened="$emit('close')"
          />
        </slot>
      </template>
      <p
        v-if="!items.length"
        :class="$style.workspaceToolbarSubmenu__placeholder"
      >
        {{ placeholder }}
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import WorkspaceToolbarSubmenuAction from 'Actions/WorkspaceToolbarSubmenuAction.vue'
import { SubmenuItem } from '@/types'

@Component({
  components: {
    Action: WorkspaceToolbarSubmenuAction,
  },
})
export default class WorkspaceToolbarSubmenu extends Vue {
  @Prop({ default: '' }) readonly title!: string;
  @Prop({ default: () => [] }) readonly items!: SubmenuItem[];
  @Prop({ type: String, default: 'Пусто' }) readonly placeholder!: string
}
</script>

<style lang="scss" module>
@import '../assets/scss/resources/_colors.scss';
@import '../assets/scss/resources/_spacing.scss';
@import '../assets/scss/resources/_sizes.scss';

.workspaceToolbarSubmenu {
  position: absolute;
  left: 100%;
  top: 0;
  width: 262px;
  height: 100%;
  background-color: map_get($colors, white);
  box-shadow: 0 4px 20px 0 rgba(57, 74, 88, 0.2);
  overflow-y: auto;
}

.workspaceToolbarSubmenu__header {
  display: flex;
  align-items: center;
  height: 70px;
  padding-right: map_get($offsets, 4);
  padding-left: map_get($offsets, 3);
  border-bottom: 1px solid map_get($colors, light-gray);
  font-size: map_get($font-sizes, 3);
  font-weight: bold;
}

.workspaceToolbarSubmenu__placeholder {
  text-align: center;
  color: map_get($colors, dark-gray);
}
</style>

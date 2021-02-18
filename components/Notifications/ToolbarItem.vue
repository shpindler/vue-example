<template>
  <workspace-toolbar-item
    :class="$style.notificationsAction"
    :with-arrow="true"
    title="Уведомления"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #icon>
      notifications
    </template>
    <section
      v-if="count"
      :class="$style.notificationsAction__counter"
      data-testid="count"
    >
      {{ count }}
    </section>
  </workspace-toolbar-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import WorkspaceToolbarItem from 'WorkspaceToolbarItem.vue'

@Component({
  components: {
    WorkspaceToolbarItem,
  },
})
export default class NotificationsToolbarItem extends Vue {
  @Prop({ type: Number, default: 0 }) readonly count!: number
}
</script>

<style lang="scss" module>
@import '../../assets/scss/resources/_colors.scss';

.notificationsAction {
  position: relative;
}

.notificationsAction__counter {
  position: absolute;
  bottom: 12px;
  left: 38px;
  min-width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: map_get($colors, red);
  text-align: center;
  color: map_get($colors, white);
  font-size: 10px;
  line-height: 15px;
}
</style>

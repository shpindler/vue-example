<template functional>
  <header
    :class="[data.class, data.staticClass]"
    class="window-header"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot name="title">
      <h2 :inner-html.prop="props.title | nowrap" />
    </slot>
    <window-controls
      v-bind="props.controls"
      @minimize="listeners.minimize"
      @restore="listeners.restore"
      @maximize="listeners.maximize"
      @close="listeners.close"
    />
  </header>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { WindowControls } from '@/types/windows'

export default Vue.extend({
  name: 'WindowHeader',
  functional: true,
  props: {
    title: {
      type: String,
      default: '',
    } as PropOptions<string>,
    controls: {
      type: Object,
      default: () => new WindowControls(),
    } as PropOptions<WindowControls>,
  },
})
</script>

<style lang="scss" scoped>
.window-header {
  padding: 26px 20px 25px 20px;
  border-bottom: 1px solid map_get($colors, gray);
}
</style>

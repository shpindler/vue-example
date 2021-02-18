<template functional>
  <div
    :style="{
      top: `${props.top}px`,
      left: `${props.left}px`,
      width: `${props.width}px`,
      height: `${props.height}px`,
    }"
    class="window-resizing-overlay"
  />
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'WindowResizingOverlay',
  functional: true,
  props: {
    top: {
      type: Number,
      required: true,
    } as PropOptions<number>,
    left: {
      type: Number,
      required: true,
    } as PropOptions<number>,
    width: {
      type: Number,
      required: true,
    } as PropOptions<number>,
    height: {
      type: Number,
      required: true,
    } as PropOptions<number>,
  },
})
</script>

<style lang="scss" scoped>
.window-resizing-overlay {
  position: absolute;
  z-index: 10000;
  border: 1px dashed var(--primary);

  &::before {
    content: "";
    position: fixed;
    z-index: 5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

<template functional>
  <img
    :class="[data.class, data.staticClass, { contain: props.contain }]"
    :style="{
      maxWidth: props.maxWidth ? `${props.maxWidth}px` : null,
      maxHeight: props.maxHeight ? `${props.maxHeight}px` : null
    }"
    v-bind="data.attrs"
    class="vue-img"
    v-on="listeners"
  >
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueImg',
  props: {
    maxWidth: {
      type: [String, Number],
      default: '',
    } as PropOptions<string | number>,
    maxHeight: {
      type: [String, Number],
      default: '',
    } as PropOptions<string | number>,
    contain: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

<style lang="scss" scoped>
.vue-img.contain {
  max-width: 100%;
  max-height: 100%;
}
</style>

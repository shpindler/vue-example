<template functional>
  <component
    :is="props.tag"
    :class="[data.class, data.staticClass, { app: props.app }]"
    :style="{ minHeight: `${props.minHeight}px` }"
    v-bind="data.attrs"
    class="vue-footer"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueFooter',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'footer',
    } as PropOptions<string>,
    app: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    minHeight: {
      type: [String, Number],
      default: '',
    } as PropOptions<string | number>,
  },
})
</script>

<style lang="scss" scoped>
.vue-footer {
  &.app {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

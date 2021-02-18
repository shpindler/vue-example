<template functional>
  <component
    :is="props.tag"
    :class="[data.class, data.staticClass, `vue-card_loading_${props.loading}`]"
    v-bind="data.attrs"
    class="vue-card position-relative"
    v-on="listeners"
  >
    <slot />
    <vue-progress-bar
      v-if="props.loading"
      class="vue-card__progress-bar"
    />
  </component>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueCard',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'article',
    } as PropOptions<string>,
    loading: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

<style lang="scss">
.progress-bar.vue-card__progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>

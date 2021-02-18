<template functional>
  <component
    :is="props.tag"
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="vue-card-text"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueCardText',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    } as PropOptions<string>,
  },
})
</script>

<template functional>
  <component
    :is="props.tag"
    :class="[$style.VueError, data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
    v-html="props.message"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueError',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    message: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" module>
@import '../../assets/scss/resources/colors.scss';

.VueError {
  color: map_get($colors, red);
}
</style>

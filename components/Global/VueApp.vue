<template functional>
  <div
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="vue-application"
    v-on="listeners"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueApp',
  functional: true,
})
</script>

<style lang="scss" scoped>
.vue-application {
  height: 100vh;
}
</style>

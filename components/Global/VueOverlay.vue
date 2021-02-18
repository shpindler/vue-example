<template functional>
  <div class="vue-overlay" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueOverlay',
  functional: true,
})
</script>

<style lang="scss" scoped>
.vue-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

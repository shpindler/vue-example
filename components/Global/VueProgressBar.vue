<template functional>
  <div
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="progress-bar"
    v-on="listeners"
  >
    <div class="progress-bar__thumb inc" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VueProgressBar',
  functional: true,
})
</script>

<style lang="scss">
.progress-bar {
  position: relative;
  height: 5px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--primary);
    opacity: 0.4;
  }
}

.progress-bar__thumb {
  position: absolute;
  height: 100%;
  border-radius: 4px;
  background-color: var(--primary);
}
</style>

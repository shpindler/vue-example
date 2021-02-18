<template functional>
  <footer
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="window-footer"
    v-on="listeners"
  >
    <slot name="beforeButtons" />
    <slot
      :close="listeners.close"
      name="buttons"
    >
      <vue-btn
        class="window-button ml-auto"
        @click="listeners.close"
      >
        Закрыть
      </vue-btn>
    </slot>
    <slot name="afterButtons" />
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WindowFooter',
  functional: true,
})
</script>

<style lang="scss" scoped>
.window-footer {
  display: flex;
  padding: 10px 20px;
  border-top: 1px solid map_get($colors, gray);
  background-color: map_get($colors, light-gray);
}

.window-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>

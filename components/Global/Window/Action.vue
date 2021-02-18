<template functional>
  <vue-btn
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    class="window-action"
    v-on="listeners"
  >
    <slot>
      <vue-icon
        v-if="props.icon"
        class="window-action__icon"
      >
        {{ props.icon }}
      </vue-icon>
      <template v-if="props.text">
        {{ props.text }}
      </template>
    </slot>
  </vue-btn>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'WindowAction',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    } as PropOptions<string>,
    text: {
      type: String,
      default: '',
    } as PropOptions<string>,
  },
})
</script>

<style lang="scss">
.vue-btn.window-action {
  display: inline-flex;
  align-items: center;
  border: none;
  color: map_get($colors, dark-gray);
  font-weight: bold;
  box-shadow: none;
  opacity: 0.85;
  transition: 0.2s;

  &:hover {
    background-color: transparent;
    color: map_get($colors, dark-gray);
    opacity: 1;
  }

  &:active {
    box-shadow: none;
  }
}

.window-action__icon {
  margin-right: map_get($offsets, 1);
  color: var(--primary);
}
</style>

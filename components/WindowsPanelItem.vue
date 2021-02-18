<template functional>
  <article
    :class="[
      data.class,
      data.staticClass,
      {
        active: props.active,
        disabled: props.disabled,
      },
    ]"
    v-bind="data.attrs"
    :inner-html.prop="props.title | nowrap"
    class="windows-panel-item px-3"
    v-on="listeners"
  />
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'WindowsPanelItem',
  functional: true,
  props: {
    title: {
      type: String,
      required: true,
    } as PropOptions<string>,
    active: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    disabled: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

<style lang="scss">
.windows-panel-item {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 30px;
  border-radius: 3px;
  background-color: map_get($colors, gray);
  transition: 0.2s;

  font-size: 13px;
  line-height: 30px;
  font-weight: 500;

  cursor: pointer;

  &:hover:not(.disabled),
  &:active:not(.disabled),
  &.active {
    background-color: map_get($colors, light-gray);
  }

  &:active:not(.disabled),
  &.active:not(.disabled) {
    box-shadow: inset 0 1px 3px 0 #1a1f27;
  }

  &.active,
  &.disabled {
    cursor: default;
  }

  &.disabled {
    opacity: 0.8;
  }
}
</style>

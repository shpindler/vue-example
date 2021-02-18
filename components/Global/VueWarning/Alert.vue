<template functional>
  <window
    :win="{
      ...props.win,
      resizable: props.resizable,
      title: props.title,
      width: props.width,
      height: props.height,
      disabled: props.disabled,
    }"
    :class="[data.class, data.staticClass]"
    class="alert"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <vue-row
      tag="section"
      align-v="center"
      class="alert__body m-0 py-3"
    >
      <vue-col
        tag="section"
        cols="2"
      >
        <slot name="icon">
          <vue-icon
            color="var(--info)"
            size="35"
          >
            info
          </vue-icon>
        </slot>
      </vue-col>
      <vue-col
        tag="section"
        cols="10"
      >
        <slot>{{ props.text }}</slot>
      </vue-col>
    </vue-row>
    <template #footerButtons>
      <slot name="footerButtons" />
    </template>
  </window>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { WindowProps } from '@/types/windows'

export default Vue.extend({
  name: 'VueWarningAlert',
  functional: true,
  props: {
    win: {
      type: Object,
      default: () => ({}),
    } as PropOptions<Partial<WindowProps>>,
    title: {
      type: String,
      default: '',
    } as PropOptions<string>,
    text: {
      type: String,
      default: '',
    } as PropOptions<string>,
    resizable: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
    width: {
      type: Number,
      default: 400,
    } as PropOptions<number>,
    height: {
      type: Number,
      default: 170,
    } as PropOptions<number | undefined>,
    disabled: {
      type: Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
})
</script>

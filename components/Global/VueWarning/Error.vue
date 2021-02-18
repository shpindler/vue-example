<template functional>
  <vue-warning-alert
    :title="props.title"
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #icon>
      <vue-icon
        color="var(--error)"
        size="35"
      >
        error
      </vue-icon>
    </template>
    <slot />
    <template #footerButtons>
      <slot name="footerButtons" />
    </template>
  </vue-warning-alert>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueWarningError',
  functional: true,
  props: {
    title: {
      type: String,
      default: 'Ошибка',
    } as PropOptions<string>,
  },
})
</script>

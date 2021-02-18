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
        color="var(--info)"
        size="35"
      >
        help
      </vue-icon>
    </template>
    <slot />
    <template #footerButtons>
      <slot name="footerButtons">
        <vue-row align-h="center" class="grow">
          <vue-col cols="auto">
            <vue-btn
              @click="
                () => {
                  if (listeners['update:visible']) {
                    listeners['update:visible'](!props.visible);
                  }
                  if (listeners.ok) listeners.ok();
                }
              "
            >
              <slot name="ok">
                Да
              </slot>
            </vue-btn>
          </vue-col>
          <vue-col cols="auto">
            <vue-btn
              @click="
                () => {
                  if (listeners['update:visible']) {
                    listeners['update:visible'](!props.visible);
                  }
                  if (listeners.cancel) listeners.cancel();
                }
              "
            >
              <slot name="cancel">
                Нет
              </slot>
            </vue-btn>
          </vue-col>
        </vue-row>
      </slot>
    </template>
  </vue-warning-alert>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'VueWarningConfirm',
  functional: true,
  props: {
    title: {
      type: String,
      default: 'Подтверждение',
    } as PropOptions<string>,
  },
})
</script>

<template functional>
  <article
    :style="{ minWidth: `${props.size}px`, minHeight: `${props.size}px` }"
    :class="[$style.avatar, data.class, data.staticClass]"
    class="d-flex align-self-center rounded"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <vue-img
      v-if="props.avatar"
      :src="props.avatar"
      :width="`${props.size}`"
      :class="$style.avatar__image"
    />
    <vue-icon
      v-else
      :size="props.size"
      :class="$style.avatar__placeholder"
      class="text-dark"
    >
      account_circle
    </vue-icon>
  </article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'Avatar',
  functional: true,
  props: {
    avatar: {
      type: String,
      default: '',
    } as PropOptions<string>,
    size: {
      type: Number,
      default: 38,
    } as PropOptions<number>,
  },
})
</script>

<style lang="scss" module>
.avatar .avatar__image {
  display: block;
}

.avatar .avatar__placeholder {
  display: block;
}
</style>

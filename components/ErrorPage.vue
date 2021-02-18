<template functional>
  <vue-row
    v-bind="data.attrs"
    tag="article"
    align-h="center"
    align-v="center"
    class="not-found-page h-100"
    v-on="listeners"
  >
    <vue-col
      cols="12"
      class="text-center text-dark-blue"
    >
      <section class="not-found-page__image mb-4">
        <slot name="image" />
      </section>
      <h1 class="not-found-page__code mb-3">
        <slot name="code" />
      </h1>
      <p class="not-found-page__description mb-5">
        <slot name="description" />
      </p>
      <slot />
    </vue-col>
  </vue-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ErrorPage',
  functional: true,
})
</script>

<style lang="scss" scoped>
.not-found-page__code {
  font-size: 120px;
  line-height: 1;
}

.not-found-page__description {
  font-size: 21px;
  line-height: 1;
}
</style>

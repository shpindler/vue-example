<template functional>
  <div
    :class="[data.class, data.staticClass]"
    class="vue-content"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VueContent',
  functional: true,
}
</script>

<style lang="scss" scoped>
.vue-content {
  box-sizing: border-box;
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  height: 100%;
  padding-bottom: 40px;
}
</style>

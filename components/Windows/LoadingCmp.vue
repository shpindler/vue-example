<template>
  <div class="loading-window-cmp">
    <vue-spinner variant="info" size="32" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class LoadingWindowCmp extends Vue {}
</script>

<style lang="scss" scoped>
.loading-window-cmp {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: map_get($colors, white);
    opacity: 0.5;
  }
}
</style>

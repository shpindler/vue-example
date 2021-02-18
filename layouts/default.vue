<template>
  <vue-app class="position-relative">
    <slot name="beforeContent" />
    <vue-content class="site-content">
      <vue-container
        class="position-relative fill-height py-0"
        fluid
      >
        <slot>
          <nuxt />
        </slot>
      </vue-container>
    </vue-content>
    <slot name="afterContent" />
  </vue-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.site-content {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("~assets/img/bg__train.jpg");
  background-size: cover;
  background-position: center;
}
</style>

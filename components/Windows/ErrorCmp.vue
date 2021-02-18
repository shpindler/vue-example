<template>
  <vue-warning-error v-bind="$attrs" v-on="$listeners">
    Не удалось загрузить окно.
  </vue-warning-error>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class ErrorWindowCmp extends Vue {}
</script>

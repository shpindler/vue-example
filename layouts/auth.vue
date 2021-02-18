<template>
  <default-layout>
    <auth-forms-wrapper>
      <nuxt />
    </auth-forms-wrapper>
    <template #afterContent>
      <site-footer />
    </template>
  </default-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import AuthFormsWrapper from 'AuthFormsWrapper.vue'
import SiteFooter from 'SiteFooter.vue'
import DefaultLayout from '@/layouts/default.vue'

@Component({
  components: {
    DefaultLayout,
    AuthFormsWrapper,
    SiteFooter,
  },
})
export default class AuthPage extends Vue {}
</script>

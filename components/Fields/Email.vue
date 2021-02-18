<template>
  <vue-text-field
    :id="_uid"
    :value="value"
    name="email"
    label="E-mail"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { FieldMixin } from './field'

@Component
export default class EmailField extends mixins(FieldMixin) {}
</script>

<style lang="scss" scoped></style>

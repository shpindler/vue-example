<template>
  <vue-text-field
    :id="_uid"
    :value="value"
    name="ucpk"
    label="Наименование УЦПК"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { FieldMixin } from './field'

@Component
export default class UcpkField extends mixins(FieldMixin) {}
</script>

<style lang="scss" scoped></style>

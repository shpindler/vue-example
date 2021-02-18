<template>
  <vue-text-field
    :id="_uid"
    :value="value"
    name="first-name"
    label="Имя"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { FieldMixin } from './field'

@Component
export default class FirstNameField extends mixins(FieldMixin) {}
</script>

<style lang="scss" scoped></style>

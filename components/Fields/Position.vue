<template>
  <vue-text-field
    :id="_uid"
    :value="value"
    name="position"
    label="Должность"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { FieldMixin } from './field'

@Component
export default class PositionField extends mixins(FieldMixin) {}
</script>

<style lang="scss" scoped></style>

<template>
  <vue-date-field
    :id="_uid"
    :value="value"
    :max-date="new Date()"
    name="date-of-birth"
    label="Дата рождения"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model } from 'nuxt-property-decorator'

@Component
export default class DateOfBirthField extends Vue {
  @Model('update:value', { type: Date }) readonly value!: Date
}
</script>

<style lang="scss" scoped></style>

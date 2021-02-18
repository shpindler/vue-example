<template>
  <vue-text-field
    :id="_uid"
    v-mask="'+# (###) ###-##-##'"
    :value="value"
    name="phone"
    label="Телефон"
    placeholder="+_ (___) ___-__-__"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { FieldMixin } from './field'

@Component
export default class PhoneField extends mixins(FieldMixin) {}
</script>

<style lang="scss" scoped></style>

import Vue from 'vue'
import { Component, Model, mixins } from 'nuxt-property-decorator'

@Component
export class FieldModelMixin extends Vue {
  @Model('update:value', { default: '' }) readonly value!: string;
}

@Component
export class FieldMixin extends mixins(FieldModelMixin) {}

<template>
  <article
    :class="{ 'vue-text-field_error': !state }"
    class="vue-text-field w-100"
  >
    <input
      :id="id"
      :class="inputClass"
      :value="value"
      class="vue-text-field__input w-100"
      v-bind="$attrs"
      @input="$emit('update:value', $event.target.value)"
      v-on="$listeners"
    >
    <slot name="label">
      <label
        v-if="label"
        :for="id"
        class="vue-text-field__label"
      >
        {{ label }}
      </label>
    </slot>
    <slot name="error">
      <div
        v-if="errorMessage"
        class="vue-text-field__error red--text"
        v-html="errorMessage"
      />
    </slot>
  </article>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import { FieldModelMixin } from '@/components/Fields/field'

@Component({
  inheritAttrs: false,
})
export default class VueTextField extends mixins(FieldModelMixin) {
  @Prop() readonly inputClass!: string
  @Prop() readonly id: string | undefined;
  @Prop() readonly label: string | undefined;
  @Prop({ default: true }) readonly state!: boolean;
  @Prop() readonly errorMessage: string | undefined;
}
</script>

<style lang="scss" scoped>
.vue-text-field {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: map_get($offsets, 3);

  &:last-of-type {
    margin-bottom: 0;
  }
}

.vue-text-field__label {
  order: 1;
  margin-bottom: map_get($offsets, 1);
  text-transform: uppercase;
  color: map_get($colors, dark-gray);
  font-size: map_get($font-sizes, 1);
}

.vue-text-field__input {
  order: 2;
  box-sizing: border-box;
  height: 38px;
  padding: 0;
  padding-left: 14px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.21);
  border: solid 1px map_get($colors, light-gray);
  background-color: map_get($colors, white);
  color: map_get($colors, darkest);
  font-size: map_get($font-sizes, 2);
  transition: all 0.2s ease;

  &:focus {
    border-color: map_get($colors, darkest);
    outline: none;
  }

  &:disabled {
    background-image: linear-gradient(
      to bottom,
      map_get($colors, light-gray),
      map_get($colors, light-gray)
    );
  }
}

.vue-text-field_error .vue-text-field__input {
  border-color: map_get($colors, red);
}

.vue-text-field__error {
  position: absolute;
  top: calc(100% - 6px);
  margin-top: map_get($offsets, 1);
  color: map_get($colors, red);
  font-size: map_get($font-sizes, 1);
}
</style>

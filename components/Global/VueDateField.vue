<template>
  <article
    class="vue-date-field"
    :class="{ 'vue-date-field_disabled': disabled }"
  >
    <vue-text-field
      v-model="inputValue"
      v-mask="'##.##.####'"
      input-class="vue-date-field__input"
      :disabled="disabled"
      v-bind="$attrs"
      @change="onInputValueChange"
    />
    <vue-icon
      v-if="!disabled"
      :size="24"
      class="vue-date-field__trigger vue-date-field__trigger_calendar"
      @click="isCalendarOpened = !isCalendarOpened"
    >
      today
    </vue-icon>
    <vue-icon
      v-if="!disabled"
      :size="18"
      class="vue-date-field__trigger vue-date-field__trigger_increment"
      @click="changeDateByDays(1)"
    >
      arrow_drop_up
    </vue-icon>
    <vue-icon
      v-if="!disabled"
      :size="18"
      class="vue-date-field__trigger vue-date-field__trigger_decrement"
      @click="changeDateByDays(-1)"
    >
      arrow_drop_down
    </vue-icon>
    <transition v-if="!disabled" name="fade">
      <vue-calendar
        v-show="isCalendarOpened"
        :min-date="minDate"
        :max-date="maxDate"
        class="vue-date-field__calendar"
        @dayclick="$emit('update:value', $event.date)"
      />
    </transition>
    <window-event v-if="!disabled" event="click" @click="closeCalendarIfOutside" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Model, Watch } from 'nuxt-property-decorator'

@Component
export default class VueDateField extends Vue {
  @Model('update:value', { type: Date }) readonly value: Date | undefined

  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  @Prop({
    type: Date,
    default: () => new Date(new Date().getFullYear() - 100, 0, 1),
  })
  readonly minDate!: Date

  @Prop({
    type: Date,
    default: () => new Date(new Date().getFullYear() + 100, 0, 1),
  })
  readonly maxDate!: Date

  isCalendarOpened = false
  inputValue = ''

  @Watch('value', { immediate: true })
  onValueChange(newValue: Date): void {
    this.inputValue = newValue ? newValue.toLocaleDateString('ru') : ''
  }

  updateValue(newValue: Date): void {
    if (newValue >= this.minDate && newValue <= this.maxDate) {
      this.$emit('update:value', newValue)
    }
  }

  onInputValueChange(): void {
    const [day, month, year] = this.inputValue.split('.').map(p => parseInt(p))
    this.updateValue(new Date(year, month - 1, day))
  }

  changeDateByDays(days: number): void {
    const _value = this.value || new Date()
    _value.setDate(_value.getDate() + days)
    this.updateValue(new Date(_value))
  }

  closeCalendarIfOutside(e: MouseEvent): void {
    if (
      this.isCalendarOpened &&
      !e.composedPath().includes(this.$el)
    ) {
      this.isCalendarOpened = false
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-date-field {
  position: relative;
}

.vue-date-field:not(.vue-date-field_disabled)/deep/ .vue-date-field__input {
  padding-left: 30px;
  padding-right: 30px;
}

.vue-date-field__trigger {
  position: absolute;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }

  &_calendar {
    top: 29px;
    left: 5px;
  }

  &_increment {
    top: 25px;
    right: 5px;
  }

  &_decrement {
    bottom: 2px;
    right: 5px;
  }
}

.vue-date-field/deep/ .vue-date-field__calendar {
  position: absolute;
  z-index: 100;
}
</style>

<template>
  <window
    :class="$style.cropper"
    :win="_window"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <vue-cropper
      ref="cropper"
      :src="src"
      :class="$style.cropper__component"
      :aspect-ratio="aspectRatio"
    />
    <template #footerButtons>
      <vue-btn class="ml-auto" @click="save">
        Сохранить
      </vue-btn>
    </template>
  </window>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from 'nuxt-property-decorator'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { WindowProps } from '@/types/windows'

@Component({
  components: {
    VueCropper,
  },
})
export default class Cropper extends Vue {
  @Prop({ default: () => ({}) }) readonly win!: WindowProps
  @Prop({ type: String, default: '' }) readonly src!: string
  @Prop({ type: Number, default: 1 }) readonly aspectRatio!: number

  @Ref('cropper') readonly cropper!: typeof VueCropper

  get _window(): WindowProps {
    return {
      ...new WindowProps({
        title: 'Установка аватара пользователя',
        height: 650,
      }),
      ...this.win,
    }
  }

  save(): void {
    this.$emit('update-image', this.cropper.getCroppedCanvas())
    this.$emit('close')
  }
}
</script>

<style lang="scss" module>
.cropper {
  overflow: hidden;
}

.cropper__component {
  width: 100%;
  height: 100%;
}
</style>

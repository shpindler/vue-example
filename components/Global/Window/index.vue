<template>
  <article
    ref="window"
    :class="{
      'window_relocating': relocating,
      'window_maximized': maximized,
      'window_disabled': disabled,
    }"
    :style="style"
    class="window"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="_window.resizable && !maximized">
      <window-resizer
        v-for="direction in [
          'top',
          'top-right',
          'right',
          'bottom-right',
          'bottom',
          'bottom-left',
          'left',
          'top-left'
        ]"
        :key="`resizer-${direction}`"
        :direction="direction"
        @resize="resize"
        @update:resizing-overlay-props="
          $emit('update:resizing-overlay-props', $event)
        "
      />
    </template>

    <slot name="header">
      <window-header
        :class="`window-header_cursor_${headerCursor}`"
        :title="title"
        :controls="controls"
        @minimize="minimized = true"
        @maximize="maximized = true"
        @restore="maximized = false"
        @close="$emit('close')"
        @mousedown="startRelocate"
      />
    </slot>
    <slot />
    <slot name="footer">
      <window-footer
        class="mt-auto"
        @close="$emit('close')"
      >
        <template #beforeButtons>
          <slot name="footerBeforeButtons" />
        </template>
        <template #buttons>
          <slot name="footerButtons" />
        </template>
        <template #afterButtons>
          <slot name="footerAfterButtons" />
        </template>
      </window-footer>
    </slot>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { isEqual } from 'lodash'
import { Box } from '@/types'
import {
  ResizingOverlayProps,
  WindowControls,
  WindowCoords,
  WindowProps,
  WindowStyle,
  WindowType,
  WindowMeta,
} from '@/types/windows'

function preventSelection(e: Event): void {
  e.preventDefault()
}

@Component
export default class Window extends Vue implements WindowType {
  @Prop() readonly containerBox!: Box
  @Prop({ default: () => ({}) }) readonly win!: Partial<WindowProps>
  @Prop() readonly zIndex!: number

  coords: WindowCoords = { top: 0, left: 0 }
  dataToRestore = { ...this.coords, width: this.width, height: this.height }
  maximizingOrRestorationDuration = 100
  grubOffsetX = 0
  grubOffsetY = 0
  hidden = false
  transitionOn = false
  relocating = false

  get _window(): WindowProps {
    return { ...new WindowProps(), ...this.win }
  }

  get controls(): WindowControls {
    return {
      minimize: this._window.minimizable,
      close: this._window.canBeClosed,
      maximize: this._window.maximizable && !this.maximized,
      restore: this._window.maximizable && this.maximized,
    }
  }

  get disabled(): boolean {
    return this._window.disabled
  }

  get minimized(): boolean {
    return this._window.minimized
  }

  set minimized(value) {
    this.$emit('update-props', { minimized: value })
  }

  get maximized(): boolean {
    return this._window.maximized
  }

  set maximized(value) {
    this.$emit('update-props', { maximized: value })
  }

  get style(): WindowStyle {
    const result: WindowStyle = {
      zIndex: this.zIndex,
      top: this.coords.top + 'px',
      left: this.coords.left + 'px',
      width: this.width + 'px',
      height: this.height + 'px',
    }
    if (this.transitionOn) {
      result.transition = `${this.maximizingOrRestorationDuration}ms`
    }
    return result
  }

  get title(): string {
    return this._window.title
  }

  get width(): number {
    return this._window.width
  }

  set width(value) {
    this.$emit('update-props', { width: value })
  }

  get height(): number {
    return this._window.height
  }

  set height(value) {
    this.$emit('update-props', { height: value })
  }

  get _meta(): WindowMeta {
    return {
      title: this.title,
      disabled: this.disabled,
    }
  }

  get headerCursor(): string {
    if (this.maximized) {
      return 'default'
    } else if (this.relocating) {
      return 'grabbing'
    } else {
      return 'grab'
    }
  }

  @Watch('maximized', { immediate: true })
  onMaximizedChange(newValue: boolean): void {
    this.transitionOn = true
    if (newValue) {
      setTimeout(() => {
        this.dataToRestore = {
          ...this.coords,
          width: this.width,
          height: this.height,
        }
        this.width = this.containerBox.width
        this.height = this.containerBox.height
        this.coords.top = 0
        this.coords.left = 0
      })
    } else {
      setTimeout(() => {
        this.width = this.dataToRestore.width
        this.height = this.dataToRestore.height
        this.coords.top = this.dataToRestore.top
        this.coords.left = this.dataToRestore.left
      })
    }
    setTimeout(() => {
      this.transitionOn = false
    }, this.maximizingOrRestorationDuration)
  }

  @Watch('_meta', { immediate: true, deep: true })
  onMetaChange(newValue: WindowMeta, oldValue: WindowMeta): void {
    if (!isEqual(newValue, oldValue)) {
      this.$emit('update-meta', newValue)
    }
  }

  created(): void {
    this.coords.top = this.dataToRestore.top =
      (this.containerBox.height - this.height) / 2
    this.coords.left = this.dataToRestore.left =
      (this.containerBox.width - this.width) / 2
  }

  startRelocate(e: MouseEvent): void {
    if (this.maximized) {
      return
    }

    addEventListener('mousemove', this.relocate)
    addEventListener('mouseup', this.stopRelocate)
    document.addEventListener('selectstart', preventSelection)

    const box = this.$el.getBoundingClientRect()
    this.grubOffsetY = e.pageY - box.top - pageYOffset
    this.grubOffsetX = e.pageX - box.left - pageXOffset + (
      document.body.offsetWidth - this.containerBox.width
    )
  }

  relocate(e: MouseEvent): void {
    this.relocating = true

    const OFFSET = 9

    const top = e.pageY - this.grubOffsetY
    if (
      top >= 0 &&
      top <= this.containerBox.height - this.$el.offsetHeight
    ) {
      this.coords.top = top
    }

    const left = e.pageX - this.grubOffsetX
    if (
      left >= 0 &&
      left <=
        this.containerBox.width - this.$el.offsetWidth - OFFSET
    ) {
      this.coords.left = left
    }
  }

  stopRelocate(): void {
    this.relocating = false
    removeEventListener('mousemove', this.relocate)
    removeEventListener('mouseup', this.stopRelocate)
    document.removeEventListener('selectstart', preventSelection)
  }

  resize(data: ResizingOverlayProps): void {
    if (!data) {
      return
    }

    const box = this.containerBox
    const newBox = {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      width: box.width,
      height: box.height,
    }

    this.coords.top = data.top - newBox.top
    this.coords.left = data.left - newBox.left
    this.width = data.width
    this.height = data.height
  }
}
</script>

<style lang="scss" scoped>
.window {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: map_get($colors, white);
  box-shadow: 0 4px 20px 0 rgba(57, 74, 88, 0.2);
  overflow-x: hidden;
  overflow-y: auto;

  &_relocating {
    opacity: 0.5;
  }

  &_maximized {
    border-radius: 0;
  }

  &_disabled {
    &::after {
      content: '';
      position: absolute;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: map_get($colors, white);
      opacity: 0.5;
    }
  }
}

.window_relocating/deep/ > *:not(.window-header) {
  opacity: 0;
}

.window/deep/ .window-header_cursor {
  &_default {
    cursor: default;
  }

  &_grab {
    cursor: grab;
  }

  &_grabbing {
    cursor: grabbing;
  }
}
</style>

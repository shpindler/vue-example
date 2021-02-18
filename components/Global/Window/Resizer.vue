<template>
  <div
    :class="`resizer_direction_${direction}`"
    class="resizer"
    @mousedown="startResize"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { Direction, ResizingOverlayProps } from '@/types/windows'
import { MouseCoords } from '@/types'

@Component
export default class WindowResizer extends Vue {
  @Prop() readonly direction!: Direction
  @Prop({ default: 200 }) readonly minWidth!: number
  @Prop({ default: 200 }) readonly minHeight!: number

  mouseEvent: MouseEvent | null = null

  get mouseCoords(): MouseCoords | undefined {
    if (!this.mouseEvent) {
      return undefined
    }

    return {
      top: this.mouseEvent.pageY,
      bottom: document.body.offsetHeight - this.mouseEvent.pageY,
      left: this.mouseEvent.pageX,
      right: document.body.offsetWidth - this.mouseEvent.pageX,
    }
  }

  handleTopDirection(result: ResizingOverlayProps, top: number): void {
    const limit = result.top + result.height - this.minHeight
    if (top < limit) {
      result.height += result.top - top
      result.top = top
    } else {
      result.height = this.minHeight
      result.top = limit
    }
  }

  handleRightDirection(result: ResizingOverlayProps, left: number): void {
    const newWidth = left - result.left
    result.width = newWidth > this.minWidth ? newWidth : this.minWidth
  }

  handleBottomDirection(result: ResizingOverlayProps, top: number): void {
    const newHeight = top - result.top
    result.height = newHeight > this.minHeight ? newHeight : this.minHeight
  }

  handleLeftDirection(result: ResizingOverlayProps, left: number): void {
    const limit = result.left + result.width - this.minWidth
    if (left < limit) {
      result.width += result.left - left
      result.left = left
    } else {
      result.width = this.minWidth
      result.left = limit
    }
  }

  get overlayProps(): ResizingOverlayProps | undefined {
    if (!this.mouseCoords) {
      return undefined
    }

    const box = this.$parent.$el.getBoundingClientRect()
    const result = {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      width: box.width,
      height: box.height,
    }

    switch (this.direction) {
      case 'top': {
        this.handleTopDirection(result, this.mouseCoords.top)
        break
      }
      case 'right': {
        this.handleRightDirection(result, this.mouseCoords.left)
        break
      }
      case 'bottom': {
        this.handleBottomDirection(result, this.mouseCoords.top)
        break
      }
      case 'left': {
        this.handleLeftDirection(result, this.mouseCoords.left)
        break
      }
      case 'top-right': {
        this.handleTopDirection(result, this.mouseCoords.top)
        this.handleRightDirection(result, this.mouseCoords.left)
        break
      }
      case 'top-left': {
        this.handleTopDirection(result, this.mouseCoords.top)
        this.handleLeftDirection(result, this.mouseCoords.left)
        break
      }
      case 'bottom-right': {
        this.handleBottomDirection(result, this.mouseCoords.top)
        this.handleRightDirection(result, this.mouseCoords.left)
        break
      }
      case 'bottom-left': {
        this.handleBottomDirection(result, this.mouseCoords.top)
        this.handleLeftDirection(result, this.mouseCoords.left)
        break
      }
    }

    return result
  }

  @Watch('overlayProps', { deep: true })
  onOverlayCoordsChanged(newValue: ResizingOverlayProps): void {
    this.$emit('update:resizing-overlay-props', newValue)
  }

  startResize(): void {
    addEventListener('mousemove', this.resize)
    addEventListener('mouseup', this.stopResize)
  }

  resize(e: MouseEvent): void {
    this.mouseEvent = e
  }

  stopResize(): void {
    this.$emit('resize', this.overlayProps)
    this.mouseEvent = null
    removeEventListener('mousemove', this.resize)
    removeEventListener('mouseup', this.stopResize)
  }
}
</script>

<style lang="scss" scoped>
.resizer {
  position: absolute;
  z-index: 1;

  &_direction {
    &_top {
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      cursor: n-resize;
    }

    &_top-right {
      z-index: 2;
      top: 0;
      right: 0;
      width: 5px;
      height: 5px;
      cursor: ne-resize;
    }

    &_right {
      top: 0;
      bottom: 0;
      right: 0;
      width: 5px;
      cursor: e-resize;
    }

    &_bottom-right {
      z-index: 2;
      bottom: 0;
      right: 0;
      width: 5px;
      height: 5px;
      cursor: se-resize;
    }

    &_bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      cursor: s-resize;
    }

    &_bottom-left {
      z-index: 2;
      bottom: 0;
      left: 0;
      width: 5px;
      height: 5px;
      cursor: sw-resize;
    }

    &_left {
      top: 0;
      bottom: 0;
      left: 0;
      width: 5px;
      cursor: w-resize;
    }

    &_top-left {
      z-index: 2;
      top: 0;
      left: 0;
      width: 5px;
      height: 5px;
      cursor: nw-resize;
    }
  }
}
</style>

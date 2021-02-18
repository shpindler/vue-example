<template>
  <vue-col
    tag="article"
    class="windows-panel px-4 overflow-hidden position-relative"
  >
    <section
      ref="body"
      :style="{ transform: `translateX(${translateX}px)` }"
      class="windows-panel__body pr-3"
    >
      <item
        v-for="(w, i) in windows"
        :key="`panel-item-${w.key}`"
        :title="w.title"
        :disabled="w.disabled"
        :active="_activeItemIndex === i"
        class="windows-panel__item"
        @click="w.disabled || (_activeItemIndex = i)"
      />
    </section>
    <vue-btn
      v-if="isOverflowed"
      :disabled="leftScrollLimitReached"
      class="windows-panel__btn windows-panel__btn_scroll_left"
      @mousedown="startScroll('left')"
    >
      <vue-icon>chevron_left</vue-icon>
    </vue-btn>
    <vue-btn
      v-if="isOverflowed"
      :disabled="rightScrollLimitReached"
      class="windows-panel__btn windows-panel__btn_scroll_right"
      @mousedown="startScroll('right')"
    >
      <vue-icon>chevron_right</vue-icon>
    </vue-btn>
  </vue-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, PropSync, Ref, Watch } from 'nuxt-property-decorator'
import { WindowMeta } from '@/types/windows'

@Component({
  components: {
    Item: () => import('WindowsPanelItem.vue'),
  },
})
export default class WindowsPanel extends Vue {
  @Prop({ default: () => [] }) readonly windows!: WindowMeta[]
  @PropSync('activeItemIndex', { default: -1 }) _activeItemIndex!: number

  translateX = 0
  overflowedWidth = 0
  scrollTimer: ReturnType<typeof setTimeout> | undefined
  scrollDirection = ''

  @Ref('body') readonly body!: HTMLElement

  get leftScrollLimitReached(): boolean {
    return this.translateX >= 0
  }

  get rightScrollLimitReached(): boolean {
    return Math.abs(this.translateX) >= this.overflowedWidth
  }

  get isOverflowed(): boolean {
    return this.overflowedWidth > 0
  }

  @Watch('windows.length')
  onWindowsLengthChanged(newValue: number): void {
    this._activeItemIndex = newValue - 1
    if (this.body && this.$el) {
      setTimeout(() => {
        this.overflowedWidth =
          this.body.offsetWidth -
          (this.$el.offsetWidth -
            parseInt(getComputedStyle(this.$el).paddingLeft) -
            parseInt(getComputedStyle(this.$el).paddingRight))
      })
    }
  }

  @Watch('leftScrollLimitReached')
  onLeftScrollLimitReachedChanged(newValue: boolean): void {
    if (newValue) {
      this.stopScroll()
      this.translateX = 0
    }
  }

  @Watch('rightScrollLimitReached')
  onRightScrollLimitReachedChanged(newValue: boolean): void {
    if (newValue) {
      this.stopScroll()
      this.translateX = -this.overflowedWidth
    }
  }

  @Watch('overflowedWidth')
  onOverflowedWidthChanged(newValue: number): void {
    if (Math.abs(this.translateX) > Math.abs(newValue)) {
      this.translateX = -newValue
    }
  }

  @Watch('isOverflowed')
  onIsOverflowedChanged(newValue: boolean): void {
    if (!newValue) {
      this.translateX = 0
    }
  }

  startScroll(direction: string): void {
    this.scrollDirection = direction
    this.scrollTimer = setInterval(this.scroll, 10)
    addEventListener('mouseup', this.stopScroll)
  }

  scroll(): void {
    const step = 5
    if (this.scrollDirection === 'left') {
      this.translateX += step
    } else {
      this.translateX -= step
    }
  }

  stopScroll(): void {
    if (this.scrollTimer) {
      clearInterval(this.scrollTimer)
    }
    removeEventListener('mouseup', this.stopScroll)
  }
}
</script>

<style lang="scss" scoped>
.windows-panel__body {
  display: inline-flex;
  vertical-align: top;
}

.windows-panel__item {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: map_get($offsets, 3);

  &:last-of-type {
    margin-right: 0;
  }
}

.vue-btn.windows-panel__btn {
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0;
  border-radius: 0;
  line-height: 50px;

  &_scroll {
    &_left {
      left: 0;
    }

    &_right {
      right: 0;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { isEqual } from 'lodash'
import { WindowMeta, WindowType, WindowProps } from '@/types/windows'

interface ExtWindowProps extends WindowProps {
  extWin: WindowType & { [key: string]: any };
}

@Component
export default class ExtWindow extends Vue implements WindowType {
  @Prop() readonly win!: ExtWindowProps
  @Prop() readonly zIndex!: number

  get el(): HTMLElement {
    return this.win.extWin.getEl().dom
  }

  get title(): string {
    return this.win.title
  }

  get disabled(): boolean {
    return this.win.disabled
  }

  get minimized(): boolean {
    return this.win.minimized
  }

  set minimized(value) {
    if (value) {
      this.win.extWin.hide()
    } else {
      this.win.extWin.show()
    }
  }

  get maximized(): boolean {
    return this.win.maximized
  }

  set maximized(value) {
    if (value) {
      this.win.extWin.maximize()
    } else {
      this.win.extWin.restore()
    }
  }

  get _meta(): WindowMeta {
    return {
      title: this.title,
      disabled: this.disabled,
    }
  }

  @Watch('_meta', { immediate: true, deep: true })
  onMetaChange(newValue: WindowMeta, oldValue: WindowMeta): void {
    if (!isEqual(newValue, oldValue)) {
      this.$emit('update-meta', newValue)
    }
  }

  @Watch('minimized')
  onMinimizedChange(newValue: boolean): void {
    this.minimized = newValue
  }

  @Watch('maximized')
  onMaximizedChange(newValue: boolean): void {
    this.maximized = newValue
  }

  @Watch('zIndex', { immediate: true })
  onZIndexChange(newValue: number): void {
    if (this.el) {
      this.el.style.zIndex = newValue.toString()
    }
  }

  created(): void {
    if (this.maximized) {
      this.$emit('update-props', { maximized: true })
    }

    this.win.extWin.on('minimize', () => {
      this.$emit('update-props', { minimized: true })
    })
    this.win.extWin.on('show', () => {
      this.$emit('update-props', { minimized: false })
    })

    this.win.extWin.on('maximize', () => {
      this.$emit('update-props', { maximized: true })
    })
    this.win.extWin.on('restore', () => {
      this.$emit('update-props', { maximized: false })
    })

    this.win.extWin.on('disable', () => {
      this.$emit('update-props', { disabled: true })
    })
    this.win.extWin.on('enable', () => {
      this.$emit('update-props', { disabled: false })
    })

    this.win.extWin.on('titlechange', (_: any, newTitle: string) => {
      this.$emit('update-props', { title: newTitle })
    })

    this.el.addEventListener('mousedown', () => {
      this.$emit('mousedown')
    })

    // Если ExtJS обновила z-index, то отменить это изменение.
    new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'style') {
          const oldZIndexRule = m.oldValue && m.oldValue
            .split(' ')
            .map(s => s.split(': '))
            .find(p => p[0] === 'z-index')
          const oldZIndex = oldZIndexRule ? parseInt(oldZIndexRule[1]) : 0
          if (oldZIndex !== this.zIndex) {
            (m.target as HTMLElement).style.zIndex = this.zIndex.toString()
          }
        }
      })
    }).observe(this.el, {
      attributes: true,
      attributeOldValue: true,
    })
  }

  render(): null {
    return null
  }
}
</script>

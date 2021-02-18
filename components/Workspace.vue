<template>
  <vue-row class="workspace h-100">
    <toolbar
      :actions="toolbarActions"
      :expandable="hasMaximizedWindow"
      :z-index="nextZIndex"
    />
    <vue-row
      id="windows-container"
      ref="container"
      :style="{
        overflow: hasMaximizedWindow ? 'hidden' : 'auto',
      }"
      no-gutters
    >
      <vue-col
        tag="section"
        cols="12"
        md="10"
        lg="8"
        class="workspace__body"
      >
        <vue-row
          class="workspace__items"
          align-h="center"
        >
          <vue-col
            v-for="(action, i) in actions"
            :key="`action-${i}`"
            cols="3"
          >
            <action :action="action" />
          </vue-col>
        </vue-row>
      </vue-col>
      <component
        :is="config.component"
        v-for="(config, index) of configs"
        v-show="!isWindowMinimized(config)"
        :key="`window-${config.key}`"
        :z-index="zIndexes[index]"
        :container-box="containerBox"
        v-bind="config.data.props"
        @close="closeWindow(config.key)"
        @update-meta="setWindowMeta(config.key, $event)"
        @update:resizing-overlay-props="resizingOverlayProps = $event"
        @update-props="setWindowProps(config.key, $event)"
        @mousedown="isWindowDisabled(config) || setMaxZIndex(config.key)"
        v-on="config.listeners"
      />
    </vue-row>
    <site-footer>
      <windows-panel
        :windows="windowsMeta"
        :active-item-index="activeWindowIndex"
        @update:activeItemIndex="onActiveWindowIndexUpdate"
      />
    </site-footer>
    <window-resizing-overlay
      v-if="resizingOverlayProps"
      v-bind="resizingOverlayProps"
    />
  </vue-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Ref, Prop, Provide } from 'nuxt-property-decorator'
import { get as _get } from 'lodash'
import SiteFooter from 'SiteFooter.vue'
import WindowsPanel from 'WindowsPanel.vue'
import WorkspaceAction from 'Actions/WorkspaceAction.vue'
import WorkspaceToolbar from 'WorkspaceToolbar.vue'
import LoadingWindowCmp from 'Windows/LoadingCmp'
import ErrorWindowCmp from 'Windows/ErrorCmp'
import {
  ResizingOverlayProps,
  AsyncWindowConfig,
  WindowConfig,
  WindowsManager,
  WindowProps,
  WindowMeta,
  WindowKey,
} from '@/types/windows'
import initExtJsCustom from '@/assets/js/extjs-custom'
import initSmartEvalProxy from '@/assets/js/smart-eval-proxy'
import { Box } from '@/types'
import { Action } from '@/business/actions/models'
import { notificationsStore } from '@/store'

@Component({
  components: {
    SiteFooter,
    WindowsPanel,
    Action: WorkspaceAction,
    Toolbar: WorkspaceToolbar,
  },
})
export default class Workspace extends Vue {
  @Prop({ default: () => [] }) readonly actions!: Action[]
  @Prop({ default: () => [] }) readonly toolbarActions!: Action[]

  configs: AsyncWindowConfig[] = []
  resizingOverlayProps: ResizingOverlayProps | null = null
  containerBox!: Box

  @Ref('container') readonly containerRef!: HTMLElement

  @Provide('windows')
  get windowsManager(): WindowsManager {
    return {
      open: this.openWindow.bind(this),
      close: this.closeWindow.bind(this),
    }
  }

  get activeWindowIndex(): number {
    let result = -1
    let maxZ = 0
    for (let i = 0; i < this.configs.length; ++i) {
      if (!this.isWindowMinimized(this.configs[i]) && this.zIndexes[i] >= maxZ) {
        result = i
        maxZ = this.zIndexes[i]
      }
    }
    return result
  }

  get windowKeys(): WindowKey[] {
    return this.configs.map(({ key }) => key)
  }

  get windowsMeta(): Required<WindowMeta>[] {
    return this.configs.map(({ meta }) => meta)
  }

  get hasMaximizedWindow(): boolean {
    return this.configs.reduce((result: boolean, { data }: AsyncWindowConfig) => {
      return result || (
        _get(data, 'props.win.maximized', false) &&
        !_get(data, 'props.win.minimized', false)
      )
    }, false)
  }

  get zIndexes(): number[] {
    return this.configs.map(({ zIndex }) => zIndex)
  }

  get nextZIndex(): number {
    return this.zIndexes.length ? Math.max(...this.zIndexes) + 1 : 1
  }

  created(): void {
    initExtJsCustom.call(this)
    initSmartEvalProxy.call(this, {
      openWindow: this.openWindow,
      closeWindow: this.closeWindow,
      setActiveWindow: (win: AsyncWindowConfig | undefined) => {
        if (win) {
          this.setMaxZIndex(win.key)
        }
      },
    })
  }

  mounted(): void {
    notificationsStore.establishWebSocket()
    notificationsStore.getNotifications()
    this.setContainerBox()
    addEventListener('resize', this.setContainerBox)
    addEventListener('orientationchange', this.setContainerBox)
  }

  beforeDestroy(): void {
    removeEventListener('resize', this.setContainerBox)
    removeEventListener('orientationchange', this.setContainerBox)
  }

  setContainerBox(): void {
    this.containerBox = this.containerRef.getBoundingClientRect()
  }

  onActiveWindowIndexUpdate(index: number): void {
    const config = this.configs[index]
    if (config) {
      this.setMaxZIndex(config.key)
      if (_get(config, 'data.props.win.minimized', false)) {
        this.setWindowProps(config.key, { minimized: false })
      }
    }
  }

  isWindowDisabled({ data }: AsyncWindowConfig): boolean {
    return _get(data, 'props.win.disabled', false)
  }

  isWindowMinimized({ data }: AsyncWindowConfig): boolean {
    return _get(data, 'props.win.minimized', false)
  }

  openWindow(config: WindowConfig): void {
    let key = config.key
    if (!key) {
      do {
        key = Math.random()
      } while (this.windowKeys.includes(key))
    }
    this.configs.push({
      key,
      data: config.data || {},
      listeners: config.listeners || {},
      component: () => ({
        component: config.component,
        loading: LoadingWindowCmp,
        error: ErrorWindowCmp,
        delay: 200,
        timeout: 10000,
      }),
      zIndex: this.nextZIndex,
      meta: {
        key,
        title: '',
        disabled: false,
      },
    })
  }

  getIndexByKey(configKey: number): number {
    const result = this.configs.findIndex(({ key }) => configKey === key)
    if (result === -1) {
      throw new Error('Window configuration not found.')
    }
    return result
  }

  closeWindow(configKey: number): void {
    const index = this.getIndexByKey(configKey)
    this.configs.splice(index, 1)
  }

  setWindowProps(configKey: number, props: Partial<WindowProps>): void {
    const index = this.getIndexByKey(configKey)
    const config = this.configs[index]
    if (!config) {
      throw new Error('Bad arguments.')
    }
    const _config = { ...config }
    _config.data.props = _config.data.props || {}
    _config.data.props.win = { ..._config.data.props.win, ...props }
    this.$set(this.configs, index, _config)
  }

  setWindowMeta(configKey: number, data: WindowMeta): void {
    const index = this.getIndexByKey(configKey)
    this.configs[index].meta.title = data.title
    this.configs[index].meta.disabled = data.disabled
  }

  setMaxZIndex(configKey: number): void {
    const index = this.getIndexByKey(configKey)
    this.configs[index].zIndex = this.nextZIndex
  }
}
</script>

<style lang="scss" scoped>
.workspace__body {
  padding-left: var(--toolbarWidth);
  margin: auto;
}

#windows-container {
  position: fixed;
  top: 0;
  bottom: var(--footerHeight);
  right: 0;
  left: var(--toolbarWidth);
  background-size: cover;
  background-position: center;
}
</style>

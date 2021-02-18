import Vue, { VNodeData, VueConstructor } from 'vue'
import { ElementCoords } from '@/types'

export interface WindowType extends Vue {
  title: string;
  disabled: boolean;
  _meta: WindowMeta;
}

export type WindowKey = number

interface BaseWindowConfig {
  data?: VNodeData;
  listeners?: { [key: string]: Function | Function[] };
  key?: WindowKey;
}

type AsyncVueComponent = Promise<{ default: VueConstructor; [key: string]: any }>

export interface WindowConfig extends BaseWindowConfig {
  component: AsyncVueComponent;
}

export interface AsyncWindowConfig extends Required<BaseWindowConfig> {
  component: () => ({
    component: AsyncVueComponent;
    loading: VueConstructor;
    error: VueConstructor;
    delay: number;
    timeout: number;
  });
  zIndex: number;
  meta: Required<WindowMeta>;
}

export class WindowProps {
  title: string;
  maximizedCoords: ElementCoords;
  minimizable: boolean;
  canBeClosed: boolean;
  maximizable: boolean;
  resizable: boolean;
  disabled: boolean;
  minimized: boolean;
  maximized: boolean;
  width: number;
  height: number;

  constructor({
    title = '',
    maximizedCoords = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    minimizable = false,
    canBeClosed = true,
    maximizable = false,
    resizable = true,
    disabled = false,
    minimized = false,
    maximized = false,
    width = 600,
    height = 400,
  }: Partial<WindowProps> = {}) {
    this.title = title
    this.maximizedCoords = maximizedCoords
    this.minimizable = minimizable
    this.canBeClosed = canBeClosed
    this.maximizable = maximizable
    this.resizable = resizable
    this.disabled = disabled
    this.minimized = minimized
    this.maximized = maximized
    this.width = width
    this.height = height
  }
}

export interface WindowsManager {
  open: (config: WindowConfig) => void;
  close: (index: number) => void;
}

export class WindowControls {
  minimize: boolean;
  restore: boolean;
  maximize: boolean;
  close: boolean;

  constructor({
    minimize = false,
    restore = false,
    maximize = false,
    close = true,
  }: Partial<WindowControls> = {}) {
    this.minimize = minimize
    this.restore = restore
    this.maximize = maximize
    this.close = close
  }
}

export enum Direction {
  TOP = 'top',
  TOP_RIGHT = 'top-right',
  RIGHT = 'right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  LEFT = 'left',
  TOP_LEFT = 'top-left'
}

export interface WindowCoords {
  top: number;
  left: number;
}

export interface WindowStyle {
  zIndex: number;
  top: string;
  left: string;
  width: string;
  height: string;
  transition?: string;
}

export interface ResizingOverlayProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface WindowMeta {
  key?: WindowKey;
  title: string;
  disabled: boolean;
}

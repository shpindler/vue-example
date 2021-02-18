import 'reflect-metadata'
import { Store } from 'vuex'

declare global {
  interface Window {
    smart_eval: (text: string) => void;
  }
}

declare module 'vue/types/vue' {
  type Element = HTMLElement
}

declare module 'vuex-module-decorators/dist/types/vuexmodule' {
  interface VuexModule {
    store: typeof Store;
  }
}

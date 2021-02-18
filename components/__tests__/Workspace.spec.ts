import { shallowMount } from '@vue/test-utils'
import Component from '../Workspace.vue'
import { notificationsStore } from '@/store'

jest.mock('@/store', () => ({
  notificationsStore: {
    establishWebSocket: jest.fn(),
  },
}))

jest.mock('@/assets/js/extjs-custom.js')
jest.mock('@/assets/js/smart-eval-proxy.js')

const stubs = {
  'vue-col': true,
  'vue-row': true,
}

describe('Workspace', () => {
  test('вызывает действие establishWebSocket хранилища уведомлений.', () => {
    shallowMount(Component, {
      computed: {
        containerRef: () => ({
          getBoundingClientRect: jest.fn(),
        }),
      },
      stubs,
    })
    expect(notificationsStore.establishWebSocket).toHaveBeenCalledTimes(1)
  })
})

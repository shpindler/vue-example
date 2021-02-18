import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueX from 'vuex'
import Component from '../WorkspaceToolbar.vue'
import { markAsSeen } from '@/business/notifications/api'
import { NegativeNotification, PositiveNotification } from '@/business/notifications/models'
import { Role } from '@/business/roles/models'
import { User } from '@/business/user/models'

jest.mock('@/business/notifications/api', () => ({
  markAsSeen: jest.fn(() => Promise.resolve()),
}))

const localVue = createLocalVue()
localVue.use(VueX)
let NuxtStore: any
let store: any

const stubs = [
  'avatar',
  'window-event',
  'vue-row',
  'vue-col',
  'vue-icon',
  'vue-img',
]

const provide = {
  windows: () => ({
    openWindow: jest.fn(),
    closeWindow: jest.fn(),
  }),
}

const computed = {
  role: jest.fn(() => new Role({
    id: 1,
    name: 'Test',
    userType: 'test',
  })),
  user: jest.fn(() => new User({
    firstName: 'test',
    lastName: 'test',
    avatar: '',
    position: '',
  })),
}

describe('WorkspaceToolbar', () => {
  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = '../../.nuxt/store.js'
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
    store.commit('notifications/SET_NOTIFICATIONS', [new PositiveNotification({
      title: '2',
      text: '1',
      date: new Date('2000-10-10'),
      seen: false,
    }),
    new NegativeNotification({
      title: '3',
      text: '2',
      date: new Date('2000-10-10'),
      seen: false,
    })])
  })

  test('при клике на значок уведомлений показывает уведомления.', async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      provide,
      stubs,
      computed,
    })
    const notificationsItem = wrapper.find('[data-testid="notifications-item"]')
    notificationsItem.trigger('click')
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(wrapper.vm.submenuTitle).toEqual('Уведомления')
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(wrapper.vm.submenuItems).toEqual(wrapper.vm.notifications)
  })

  test('при закрытии панели уведомлений помечает все непросмотренные уведомления как просмотренные.', async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      provide,
      stubs,
      computed,
    })
    const notificationsItem = wrapper.find('[data-testid="notifications-item"]')
    notificationsItem.trigger('click')
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    wrapper.vm.closeSubmenu()
    expect(markAsSeen).toHaveBeenCalledTimes(1)
    await wrapper.vm.$nextTick()
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(wrapper.vm.unseenNotifications).toHaveLength(0)
  })
})

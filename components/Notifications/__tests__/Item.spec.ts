import { createLocalVue, shallowMount } from '@vue/test-utils'
import Component from '../Item.vue'
import { NegativeNotification } from '@/business/notifications/models'
import { formatDate } from '@/utils'

const localVue = createLocalVue()
localVue.filter('date', formatDate)

const notification = new NegativeNotification({
  title: '22',
  text: 'Тестовое уведомление.',
  date: new Date('2000-10-10'),
  seen: true,
})

const unseenNotification = new NegativeNotification({
  title: '22',
  text: 'Тестовое уведомление.',
  date: new Date('2000-10-10'),
  seen: false,
})

const stubs = {
  'vue-row': true,
  'vue-col': true,
  'vue-icon': true,
}

describe('Notification', () => {
  test('является экземпляром Vue.', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        notification,
      },
      stubs,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('отображает данные уведомления:', () => {
    test('текст.', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          notification,
        },
        stubs,
      })
      expect(wrapper.find('[data-testid="text"]').text())
        .toContain(notification.text)
    })

    test('заголовок.', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          notification,
        },
        stubs,
      })
      expect(wrapper.find('[data-testid="title"]').text())
        .toContain(notification.title)
    })

    test('дату.', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          notification,
        },
        stubs,
      })
      expect(wrapper.find('[data-testid="date"]').text())
        .toContain('10.10.2000')
    })

    test('изображение.', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          notification,
        },
        stubs,
      })
      expect(wrapper.find('[data-testid="image"]').text())
        .toEqual(notification.image)
    })
  })

  test('корректно отображается.', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        notification,
      },
      stubs,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('имеет прозрачный фон, если сообщение прочитано.', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        notification,
      },
      stubs,
    })
    expect(wrapper.attributes().style).toContain('background-color: transparent;')
  })

  test('имеет цветной фон, если сообщение непрочитано.', () => {
    const wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        notification: unseenNotification,
      },
      stubs,
    })
    expect(wrapper.attributes().style).toContain(
      `background-color: ${notification.color.rgba(0.2)};`,
    )
  })
})

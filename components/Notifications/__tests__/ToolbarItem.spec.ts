import { shallowMount } from '@vue/test-utils'
import Component from '../ToolbarItem.vue'

describe('NotificationToolbarItem', () => {
  test('является экземпляром Vue.', () => {
    const wrapper = shallowMount(Component)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('отображает кол-во непросмотренных уведомлений равное count.', async () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 1,
      },
    })
    const countContainer = wrapper.find('[data-testid="count"]')
    expect(countContainer.text()).toContain('1')
    wrapper.setProps({ count: 2 })
    await wrapper.vm.$nextTick()
    expect(countContainer.text()).toContain('2')
  })

  test('не отображает кол-во непросмотренных уведомлений в случае count = 0.', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        count: 0,
      },
    })
    expect(wrapper.find('[data-testid="count"]').exists()).toBeFalsy()
  })

  test('по умолчанию кол-во непросмотреных уведомлений равно 0.', () => {
    const wrapper = shallowMount(Component)
    expect(wrapper.props().count).toBe(0)
  })

  describe('корректно отображается', () => {
    test('по умолчанию.', () => {
      const wrapper = shallowMount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('с непросмотренными уведомлениями.', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          count: 1,
        },
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})

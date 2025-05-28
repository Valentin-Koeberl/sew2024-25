import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  // Test 1: Component renders properly with default props
  test('renders properly with default props', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Welcome to Your Vue.js App'
      }
    })
    expect(wrapper.text()).toContain('Welcome to Your Vue.js App')
  })

  // Test 2: Component contains all required sections
  test('contains all required sections', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('ul').exists()).toBe(true)
  })

  // Test 3: Links have correct attributes
  test('links have correct attributes', () => {
    const wrapper = mount(HelloWorld)
    const links = wrapper.findAll('a')
    links.forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener')
    })
  })

  // Test 4: Component has correct styling classes
  test('has correct styling classes', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.classes()).toContain('hello')
  })

  // Test 5: Props are properly passed and rendered
  test('props are properly passed and rendered', () => {
    const testMessage = 'Test Message'
    const wrapper = mount(HelloWorld, {
      props: {
        msg: testMessage
      }
    })
    expect(wrapper.find('h1').text()).toBe(testMessage)
  })
}) 
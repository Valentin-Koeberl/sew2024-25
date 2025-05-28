import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import RecipeDetail from '@/components/RecipeDetail.vue'
import axios from 'axios'

jest.mock('axios')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<div>Home</div>' }
    },
    {
      path: '/recipe/:id',
      name: 'RecipeDetail',
      component: RecipeDetail
    }
  ]
})

describe('RecipeDetail.vue', () => {
  let wrapper
  const mockRecipe = {
    id: 1,
    title: 'Test Recipe',
    image: 'test-image.jpg',
    readyInMinutes: 30,
    servings: 4,
    instructions: 'Test instructions'
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    
    axios.get.mockResolvedValue({ data: mockRecipe })
    
    wrapper = mount(RecipeDetail, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true
        },
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    })

    await router.isReady()
  })

  test('shows loading state initially', async () => {
    axios.get.mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ data: mockRecipe }), 100)
    }))
    
    wrapper = mount(RecipeDetail, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true
        },
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    })

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })

  test('fetches and displays recipe data', async () => {
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.find('.recipe-overlay h1').exists()).toBe(true)
    expect(wrapper.find('.recipe-overlay h1').text()).toBe(mockRecipe.title)
    expect(wrapper.find('.recipe-image').attributes('src')).toBe(mockRecipe.image)
    expect(wrapper.find('.info-value').text()).toContain(mockRecipe.readyInMinutes.toString())
  })

  test('handles API errors correctly', async () => {
    axios.get.mockRejectedValue(new Error('API Error'))
    
    wrapper = mount(RecipeDetail, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true
        },
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.vm.error).toBeTruthy()
  })

  test('shows message when no instructions are available', async () => {
    const recipeWithoutInstructions = { ...mockRecipe, instructions: '' }
    axios.get.mockResolvedValue({ data: recipeWithoutInstructions })
    
    wrapper = mount(RecipeDetail, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true
        },
        mocks: {
          $route: {
            params: { id: '1' }
          }
        }
      }
    })
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.find('.no-instructions').exists()).toBe(true)
    expect(wrapper.find('.no-instructions').text()).toContain('No instructions available')
  })

  test('navigates back to home when clicking back button', async () => {
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 0))
    
    await wrapper.find('.back-button').trigger('click')
    await router.isReady()
    
    expect(router.currentRoute.value.path).toBe('/')
  })
}) 
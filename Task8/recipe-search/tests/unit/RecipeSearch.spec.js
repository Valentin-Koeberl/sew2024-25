import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import RecipeSearch from '@/components/RecipeSearch.vue'
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
      component: { template: '<div>Recipe Detail</div>' }
    }
  ]
})

describe('RecipeSearch.vue', () => {
  let wrapper
  const mockRecipes = {
    results: [
      {
        id: 1,
        title: 'Test Recipe 1',
        image: 'test1.jpg',
        readyInMinutes: 30
      },
      {
        id: 2,
        title: 'Test Recipe 2',
        image: 'test2.jpg',
        readyInMinutes: 45
      }
    ]
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    
    axios.get.mockResolvedValue({ data: mockRecipes })
    
    wrapper = mount(RecipeSearch, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          'router-view': true
        }
      }
    })

    await router.isReady()
  })

  test('renders search form', () => {
    expect(wrapper.find('.search-input').exists()).toBe(true)
    expect(wrapper.find('.search-icon').exists()).toBe(true)
  })

  test('searches recipes when input changes', async () => {
    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('pasta')
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('complexSearch'),
      expect.objectContaining({
        params: expect.objectContaining({
          query: 'pasta'
        })
      })
    )
  })

  test('displays recipe cards with correct data', async () => {
    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('pasta')
    
    await new Promise(resolve => setTimeout(resolve, 500))
    await wrapper.vm.$nextTick()
    
    const recipeCards = wrapper.findAll('.recipe-card')
    expect(recipeCards).toHaveLength(2)
    
    const firstCard = recipeCards[0]
    expect(firstCard.find('.recipe-title').text()).toBe(mockRecipes.results[0].title)
    expect(firstCard.find('.recipe-image').attributes('src')).toBe(mockRecipes.results[0].image)
  })

  test('navigates to recipe detail when clicking a recipe', async () => {
    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('pasta')
    
    await new Promise(resolve => setTimeout(resolve, 500))
    await wrapper.vm.$nextTick()
    
    const push = jest.spyOn(router, 'push')
    
    await wrapper.find('.recipe-card').trigger('click')
    
    expect(push).toHaveBeenCalledWith('/recipe/1')
  })

  test('handles API errors', async () => {
    axios.get.mockRejectedValue(new Error('API Error'))
    
    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('pasta')
    
    await new Promise(resolve => setTimeout(resolve, 500))
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.vm.error).toBeTruthy()
  })
}) 
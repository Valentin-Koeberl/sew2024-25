import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductForm from '@/views/ProductForm.vue'
import { useProductStore } from '@/stores/products'
import { createRouter, createWebHistory } from 'vue-router'

describe('ProductForm.vue', () => {
  let router

  beforeEach(() => {
    setActivePinia(createPinia())
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/add', component: ProductForm },
        { path: '/edit/:id', component: ProductForm }
      ]
    })
  })

  it('renders the form with all required fields', async () => {
    const wrapper = mount(ProductForm, {
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('input[name="title"]').exists()).toBe(true)
    expect(wrapper.find('input[name="price"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="description"]').exists()).toBe(true)
    expect(wrapper.find('input[name="imageUrl"]').exists()).toBe(true)
  })

  it('shows validation errors for empty required fields', async () => {
    const wrapper = mount(ProductForm, {
      global: {
        plugins: [router]
      }
    })
    const submitButton = wrapper.find('button[type="submit"]')
    
    await submitButton.trigger('click')
    
    expect(wrapper.text()).toContain('Title is required')
    expect(wrapper.text()).toContain('Price is required')
    expect(wrapper.text()).toContain('Description is required')
  })

  it('validates price format correctly', async () => {
    const wrapper = mount(ProductForm, {
      global: {
        plugins: [router]
      }
    })
    const priceInput = wrapper.find('input[name="price"]')
    
    await priceInput.setValue('invalid')
    await wrapper.find('button[type="submit"]').trigger('click')
    
    expect(wrapper.text()).toContain('Price must be a valid number')
  })

  it('submits form with valid data', async () => {
    const store = useProductStore()
    const wrapper = mount(ProductForm, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.find('input[name="title"]').setValue('Test Product')
    await wrapper.find('input[name="price"]').setValue('99.99')
    await wrapper.find('textarea[name="description"]').setValue('Test Description')
    await wrapper.find('input[name="imageUrl"]').setValue('test.jpg')
    
    await wrapper.find('button[type="submit"]').trigger('click')
    
    expect(store.products).toHaveLength(1)
    expect(store.products[0].title).toBe('Test Product')
    expect(store.products[0].price).toBe(99.99)
  })

  it('loads and displays product data when editing', async () => {
    const store = useProductStore()
    store.products = [{
      id: 1,
      title: 'Existing Product',
      price: 99.99,
      description: 'Existing Description',
      imageUrl: 'existing.jpg'
    }]

    const wrapper = mount(ProductForm, {
      props: {
        productId: 1
      },
      global: {
        plugins: [router]
      }
    })
    
    expect(wrapper.find('input[name="title"]').element.value).toBe('Existing Product')
    expect(wrapper.find('input[name="price"]').element.value).toBe('99.99')
    expect(wrapper.find('textarea[name="description"]').element.value).toBe('Existing Description')
    expect(wrapper.find('input[name="imageUrl"]').element.value).toBe('existing.jpg')
  })
}) 
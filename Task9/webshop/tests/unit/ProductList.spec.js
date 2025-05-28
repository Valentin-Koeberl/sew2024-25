import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductList from '@/views/ProductList.vue'
import { useProductStore } from '@/stores/products'
import { createRouter, createWebHistory } from 'vue-router'

describe('ProductList.vue', () => {
  let router

  beforeEach(() => {
    setActivePinia(createPinia())
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: ProductList },
        { path: '/add', component: { template: '<div>Add Product</div>' } },
        { path: '/edit/:id', component: { template: '<div>Edit Product</div>' } }
      ]
    })
  })

  it('renders the store title correctly', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('h1').text()).toBe('TINy Store')
  })

  it('displays the "Add New Product" button', async () => {
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      }
    })
    const addButton = wrapper.find('.btn-primary')
    expect(addButton.exists()).toBe(true)
    expect(addButton.text()).toBe('Add New Product')
  })

  it('renders product cards with correct data', async () => {
    const store = useProductStore()
    store.products = [
      {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        description: 'Test Description',
        imageUrl: 'test.jpg'
      }
    ]

    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      }
    })
    const productCard = wrapper.find('.product-card')
    
    expect(productCard.exists()).toBe(true)
    expect(productCard.find('h2').text()).toBe('Test Product')
    expect(productCard.find('.price').text()).toContain('99,99')
    expect(productCard.find('.description').text()).toBe('Test Description')
  })

  it('shows edit and delete buttons for each product', async () => {
    const store = useProductStore()
    store.products = [
      {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        description: 'Test Description',
        imageUrl: 'test.jpg'
      }
    ]

    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      }
    })
    const buttons = wrapper.findAll('.card-btn')
    
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Edit')
    expect(buttons[1].text()).toBe('Delete')
  })

  it('calls deleteProduct when delete button is clicked', async () => {
    const store = useProductStore()
    store.products = [
      {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        description: 'Test Description',
        imageUrl: 'test.jpg'
      }
    ]

    const wrapper = mount(ProductList, {
      global: {
        plugins: [router]
      }
    })
    const deleteButton = wrapper.find('.btn-delete')
    
    // Mock window.confirm
    window.confirm = () => true
    
    await deleteButton.trigger('click')
    expect(store.products).toHaveLength(0)
  })
}) 
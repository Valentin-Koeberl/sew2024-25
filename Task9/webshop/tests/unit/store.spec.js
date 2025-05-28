import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from '@/stores/products'

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Clear localStorage before each test
    localStorage.clear()
    // Reset localStorage mock
    vi.clearAllMocks()
  })

  it('initializes with empty products array', () => {
    localStorage.getItem.mockReturnValue(null)
    const store = useProductStore()
    expect(store.products).toEqual([])
  })

  it('adds a new product', () => {
    localStorage.getItem.mockReturnValue(null)
    const store = useProductStore()
    const newProduct = {
      title: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      imageUrl: 'test.jpg'
    }

    store.addProduct(newProduct)
    
    expect(store.products).toHaveLength(1)
    expect(store.products[0]).toMatchObject({
      ...newProduct,
      id: expect.any(Number)
    })
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('updates an existing product', () => {
    localStorage.getItem.mockReturnValue(null)
    const store = useProductStore()
    const product = {
      id: 1,
      title: 'Original Product',
      price: 99.99,
      description: 'Original Description',
      imageUrl: 'original.jpg'
    }
    
    store.products = [product]
    
    const updatedProduct = {
      ...product,
      title: 'Updated Product',
      price: 149.99
    }
    
    store.updateProduct(updatedProduct)
    
    expect(store.products).toHaveLength(1)
    expect(store.products[0]).toEqual(updatedProduct)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('deletes a product', () => {
    localStorage.getItem.mockReturnValue(null)
    const store = useProductStore()
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      imageUrl: 'test.jpg'
    }
    
    store.products = [product]
    store.deleteProduct(1)
    
    expect(store.products).toHaveLength(0)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('persists products to localStorage', () => {
    localStorage.getItem.mockReturnValue(null)
    const store = useProductStore()
    const product = {
      title: 'Test Product',
      price: 99.99,
      description: 'Test Description',
      imageUrl: 'test.jpg'
    }
    
    store.addProduct(product)
    
    // Mock localStorage.getItem to return the saved products
    const savedProducts = JSON.stringify([{ ...product, id: 1 }])
    localStorage.getItem.mockReturnValue(savedProducts)
    
    // Create a new store instance to test persistence
    const newStore = useProductStore()
    expect(newStore.products).toHaveLength(1)
    expect(newStore.products[0]).toMatchObject({
      ...product,
      id: expect.any(Number)
    })
  })
}) 
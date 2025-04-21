import { defineStore } from 'pinia'

export const useProductStore = defineStore('tinyStore', {
  state: () => {
    // Load products from localStorage or use default if none exist
    const savedProducts = localStorage.getItem('products')
    return {
      products: savedProducts ? JSON.parse(savedProducts) : [
        {
          id: 1,
          title: 'Sample Product',
          price: 99.99,
          description: 'This is a sample product description',
          imageUrl: 'https://picsum.photos/200/300'
        }
      ]
    }
  },
  
  actions: {
    addProduct(product) {
      const newProduct = {
        ...product,
        id: Date.now() // Simple ID generation
      }
      this.products.unshift(newProduct)
      this.saveToLocalStorage()
    },
    
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
        this.saveToLocalStorage()
      }
    },
    
    deleteProduct(productId) {
      this.products = this.products.filter(p => p.id !== productId)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products))
    }
  }
}) 
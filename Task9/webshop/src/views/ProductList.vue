<template>
  <div class="product-list">
    <div class="header">
      <h1>TINy Store</h1>
      <router-link to="/product/new" class="btn btn-primary">Add New Product</router-link>
    </div>
    
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.imageUrl" :alt="product.title" class="product-image">
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <p class="price">{{ Number(product.price).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }}</p>
          <p class="description">{{ product.description }}</p>
          <div class="actions">
            <router-link :to="{ name: 'EditProduct', params: { id: product.id }}" class="card-btn btn-edit">Edit</router-link>
            <button @click="deleteProduct(product.id)" class="card-btn btn-delete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/products'
import { storeToRefs } from 'pinia'

const store = useProductStore()
const { products } = storeToRefs(store)

const deleteProduct = (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    store.deleteProduct(id)
  }
}
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.header h1 {
  color: white;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  border-color: var(--pink);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid var(--glass-border);
}

.product-details {
  padding: 20px;
  color: white;
}

.product-details h2 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--pink);
  margin: 10px 0;
}

.description {
  color: rgba(255, 255, 255, 0.8);
  margin: 15px 0;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.card-btn {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: inline-block;
}

.card-btn:hover {
  background: var(--hover-gradient);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: var(--pink);
}

.btn-edit:hover {
  background: linear-gradient(45deg, var(--dark), var(--pink));
}

.btn-delete:hover {
  background: linear-gradient(45deg, #ff0000, var(--dark));
}
</style> 
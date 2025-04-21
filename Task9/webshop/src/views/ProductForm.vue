<template>
  <div class="product-form">
    <h1>{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h1>
    
    <form @submit.prevent="handleSubmit" class="glass-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          required
          class="glass-input"
        >
      </div>
      
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          id="price"
          v-model="form.price"
          step="0.01"
          required
          class="glass-input"
        >
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          class="glass-input"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          type="url"
          id="imageUrl"
          v-model="form.imageUrl"
          required
          class="glass-input"
        >
      </div>
      
      <div class="form-actions">
        <router-link to="/" class="btn btn-cancel">Cancel</router-link>
        <button type="submit" class="btn btn-save">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { useRouter, useRoute } from 'vue-router'

const store = useProductStore()
const router = useRouter()
const route = useRoute()

const isEdit = ref(false)
const form = ref({
  title: '',
  price: '',
  description: '',
  imageUrl: ''
})

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    const product = store.products.find(p => p.id === parseInt(route.params.id))
    if (product) {
      form.value = { ...product }
    }
  }
})

const handleSubmit = () => {
  if (isEdit.value) {
    store.updateProduct(form.value)
  } else {
    store.addProduct(form.value)
  }
  router.push('/')
}
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

.product-form h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.glass-form {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  padding: 30px;
  transition: all 0.3s ease;
}

.glass-form:hover {
  border-color: var(--pink);
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: white;
}

.glass-input {
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  border-color: var(--pink);
}

textarea.glass-input {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
}

.btn-save {
  background-color: #42b983;
  color: white;
}
</style> 
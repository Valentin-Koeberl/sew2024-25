import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductForm from '../views/ProductForm.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/new',
    name: 'NewProduct',
    component: ProductForm
  },
  {
    path: '/product/edit/:id',
    name: 'EditProduct',
    component: ProductForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RecipeSearch from './components/RecipeSearch.vue'
import RecipeDetail from './components/RecipeDetail.vue'
import LegalNotice from './components/LegalNotice.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: RecipeSearch },
    { path: '/recipe/:id', component: RecipeDetail },
    { path: '/legal', component: LegalNotice }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')

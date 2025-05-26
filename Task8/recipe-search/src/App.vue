<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
:root {
  --primary-color: #4CAF50;
  --primary-dark: #388E3C;
  --secondary-color: #FF9800;
  --text-color: #333;
  --light-gray: #f5f5f5;
  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 2rem;
  padding-bottom: 6rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

button {
  cursor: pointer;
  transition: var(--transition);
}

button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
    padding-bottom: 6rem;
  }
}
</style>

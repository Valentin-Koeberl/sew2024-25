<template>
  <header class="header">
    <div class="header-content">
      <h1>Recipe Search</h1>
      <p class="subtitle">Discover delicious recipes from around the world</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style> 
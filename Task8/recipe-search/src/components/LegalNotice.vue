<template>
  <div class="legal-notice">
    <div class="navigation">
      <button @click="$router.push('/')" class="back-button">
        <span class="button-icon">←</span>
        Back to Search
      </button>
    </div>
    <div class="content">
      <h1>Legal Notice (Impressum)</h1>
      <div class="legal-content">
        <p>This application uses the Spoonacular API for recipe data.</p>
        <p>All recipe data and images are provided by Spoonacular.</p>
        <p>This is a demo application for educational purposes.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalNotice'
};
</script>

<style scoped>
.legal-notice {
  padding: 0 0 2rem;
}

.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--light-gray);
  padding: 1rem 2rem;
  margin: -2rem -2rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: white;
  color: var(--text-color);
  border: 1px solid var(--light-gray);
  border-radius: 30px;
  font-weight: 500;
  transition: var(--transition);
  box-shadow: var(--box-shadow);
}

.back-button:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateX(-5px);
}

.button-icon {
  font-size: 1.2rem;
  transition: var(--transition);
}

.back-button:hover .button-icon {
  transform: translateX(-3px);
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

h1 {
  margin-bottom: 2rem;
  color: var(--text-color);
}

.legal-content {
  line-height: 1.8;
}

.legal-content p {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .navigation {
    padding: 1rem;
    margin: -1rem -1rem 1rem;
  }
  
  .content {
    padding: 1.5rem;
  }
}
</style> 
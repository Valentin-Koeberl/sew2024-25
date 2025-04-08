<template>
  <div class="recipe-detail" v-if="recipe">
    <div class="navigation">
      <button @click="$router.push('/')" class="back-button">
        <span class="button-icon">←</span>
        Back to Search
      </button>
    </div>
    <div class="recipe-header">
      <div class="recipe-image-container">
        <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
        <div class="recipe-overlay">
          <h1>{{ recipe.title }}</h1>
        </div>
      </div>
    </div>
    <div class="recipe-content">
      <div class="recipe-info">
        <div class="info-item">
          <span class="info-icon">⏱️</span>
          <div class="info-text">
            <span class="info-label">Ready in</span>
            <span class="info-value">{{ recipe.readyInMinutes }} minutes</span>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">👥</span>
          <div class="info-text">
            <span class="info-label">Servings</span>
            <span class="info-value">{{ recipe.servings }}</span>
          </div>
        </div>
      </div>
      <div class="recipe-section">
        <h2>Instructions</h2>
        <div class="instructions" v-if="recipe.instructions" v-html="recipe.instructions"></div>
        <div v-else class="no-instructions">
          <p>No instructions available for this recipe.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="error">
    <div class="error-content">
      <p>{{ error }}</p>
      <button @click="$router.push('/')" class="back-button">
        <span class="button-icon">←</span>
        Back to Search
      </button>
    </div>
  </div>
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Loading recipe...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecipeDetail',
  data() {
    return {
      recipe: null,
      error: null,
      apiKey: 'f0447911dccc499d80a55d1ac1b37409'
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${this.$route.params.id}/information`,
        {
          params: {
            apiKey: this.apiKey
          }
        }
      );
      this.recipe = response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      this.error = 'Failed to load recipe details. Please try again later.';
      if (error.response) {
        this.error = `Error: ${error.response.data.message || 'Failed to load recipe details'}`;
      }
    }
  }
};
</script>

<style scoped>
.recipe-detail {
  padding: 0 0 2rem;
}

.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
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

.recipe-header {
  margin: 0 -2rem 2rem;
  position: relative;
}

.recipe-image-container {
  position: relative;
  padding-top: 50%;
  overflow: hidden;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.recipe-overlay h1 {
  color: white;
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.recipe-content {
  max-width: 800px;
  margin: 0 auto;
}

.recipe-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.9rem;
  color: #666;
}

.info-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
}

.recipe-section {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.recipe-section h2 {
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-size: 1.5rem;
}

.instructions {
  line-height: 1.8;
}

.instructions >>> p {
  margin-bottom: 1rem;
}

.instructions >>> ol,
.instructions >>> ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.no-instructions {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 3rem 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--light-gray);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #dc3545;
}

.error-content {
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .navigation {
    padding: 1rem;
    margin: -1rem -1rem 1rem;
  }
  
  .recipe-header {
    margin: 0 -1rem 1rem;
  }
  
  .recipe-overlay h1 {
    font-size: 2rem;
  }
  
  .recipe-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .recipe-section {
    padding: 1.5rem;
  }
}
</style> 
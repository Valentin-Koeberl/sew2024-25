<template>
  <div class="recipe-search">
    <div class="search-container">
      <div class="search-box">
        <input
          type="text"
          v-model="searchTerm"
          @input="debouncedSearch"
          placeholder="Search for recipes..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading recipes...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="recipes.length === 0 && searchTerm" class="no-results">
      <p>No recipes found for "{{ searchTerm }}"</p>
      <p class="suggestion">Try a different search term or check your spelling</p>
    </div>
    <div v-else class="recipes-grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card" @click="viewRecipe(recipe.id)">
        <div class="recipe-image-container">
          <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
          <div class="recipe-overlay">
            <span class="view-recipe">View Recipe</span>
          </div>
        </div>
        <div class="recipe-info">
          <h3 class="recipe-title">{{ recipe.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  name: 'RecipeSearch',
  data() {
    return {
      searchTerm: '',
      recipes: [],
      debouncedSearch: null,
      loading: false,
      error: null,
      apiKey: 'f0447911dccc499d80a55d1ac1b37409'
    };
  },
  created() {
    this.debouncedSearch = debounce(this.searchRecipes, 500);
    
    // Restore search state from sessionStorage
    const savedSearch = sessionStorage.getItem('recipeSearch');
    if (savedSearch) {
      const { searchTerm, recipes } = JSON.parse(savedSearch);
      this.searchTerm = searchTerm;
      this.recipes = recipes;
    }
  },
  methods: {
    async searchRecipes() {
      if (!this.searchTerm) {
        this.recipes = [];
        this.error = null;
        sessionStorage.removeItem('recipeSearch');
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: this.apiKey,
              query: this.searchTerm,
              number: 12
            }
          }
        );
        this.recipes = response.data.results;
        
        // Save search state to sessionStorage
        sessionStorage.setItem('recipeSearch', JSON.stringify({
          searchTerm: this.searchTerm,
          recipes: this.recipes
        }));
      } catch (error) {
        console.error('Error fetching recipes:', error);
        this.error = 'Failed to fetch recipes. Please try again later.';
        if (error.response) {
          this.error = `Error: ${error.response.data.message || 'Failed to fetch recipes'}`;
        }
      } finally {
        this.loading = false;
      }
    },
    viewRecipe(id) {
      this.$router.push(`/recipe/${id}`);
    }
  }
};
</script>

<style scoped>
.recipe-search {
  padding: 1rem 0;
}

.search-container {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1.1rem;
  border: 2px solid var(--light-gray);
  border-radius: var(--border-radius);
  transition: var(--transition);
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.recipe-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  cursor: pointer;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.recipe-image-container {
  position: relative;
  padding-top: 75%;
  overflow: hidden;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.recipe-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.recipe-card:hover .recipe-overlay {
  opacity: 1;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.05);
}

.view-recipe {
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 20px;
}

.recipe-info {
  padding: 1.5rem;
}

.recipe-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.loading, .error, .no-results {
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

.no-results {
  color: #666;
}

.suggestion {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .search-input {
    font-size: 1rem;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  }
}
</style> 
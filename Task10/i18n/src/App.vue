<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">i18n</div>
        <div class="language-switcher">
          <button 
            @click="toggleLanguage" 
            class="language-btn"
          >
            {{ currentLocale.toUpperCase() }}
          </button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="card">
        <h2>{{ $t('currentTime') }}</h2>
        <p>{{ formattedDateTime }}</p>
      </div>

      <div class="card">
        <h2>{{ $t('sampleNumber') }}</h2>
        <p>{{ $n(1234.56, 'decimal') }}</p>
      </div>

      <div class="card">
        <h2>{{ t('currency') }}</h2>
        <p>{{ $n(1234.56, 'currency') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {useI18n} from 'vue-i18n'

const { t, locale, d } = useI18n()

const currentLocale = computed(() => locale.value)
const formattedDateTime = computed(() => {
  return d(new Date(), 'long')
})

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'de' : 'en'
  locale.value = newLocale
  document.querySelector('html').setAttribute('lang', newLocale)
}
</script>

<style>
:root {
--primary-color: #4a90e2

;
  --secondary-color: #2c3e50;
  --background-color: #f5f6fa;
  --card-background: #ffffff;
  --text-color: #2c3e50;
  --border-radius: 8px;
  --spacing: 1rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

.navbar {
  background-color: var(--card-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.language-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.language-btn:hover {
  background-color: #357abd;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 var(--spacing);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }

  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>

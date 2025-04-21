<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'TINy Store'
}
</script>

<style>
:root {
  --glass-bg: rgba(0, 0, 0, 0.2);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --primary-gradient: linear-gradient(135deg, 
    #0a0a0a 0%, 
    #111111 40%, 
    #1a1a1a 70%, 
    rgba(26, 26, 26, 0.97) 85%,
    rgba(255, 105, 180, 0.15) 100%
  );
  --hover-gradient: linear-gradient(45deg, 
    rgba(255, 105, 180, 0.2) 0%, 
    rgba(0, 0, 0, 0.8) 100%
  );
  --pink: #ff69b4;
  --dark: #000000;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  min-height: 100vh;
  background: var(--primary-gradient);
  background-attachment: fixed;
  position: relative;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 40%;
  background: radial-gradient(
    circle at top right,
    rgba(255, 105, 180, 0.08),
    rgba(255, 105, 180, 0.05) 30%,
    transparent 70%
  );
  pointer-events: none;
}

body {
  margin: 0;
  padding: 0;
}

/* Global button styles */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: white;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--hover-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn:hover::before {
  opacity: 1;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-color: var(--pink);
}

.btn-primary {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.btn-edit {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.btn-delete {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.btn-cancel {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.btn-save {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}
</style>

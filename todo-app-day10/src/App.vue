<template>
  <div id="app" class="app-root">
    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
const apiConfig = { url: 'http://localhost:3000' };
const userSettings = { theme: 'light' };
provide('apiConfig', apiConfig);
provide('userSettings', userSettings);
</script>

<style scoped>
.app-root {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px #0001;
}
</style>
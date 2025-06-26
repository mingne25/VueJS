<template>
  <div id="app" class="app-root">
    <ErrorBoundary>
      <router-view />
    </ErrorBoundary>
  </div>
</template>

<script setup>
import ErrorBoundary from './components/ErrorBoundary.vue';
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  max-width: 700px;
  margin: 0 auto;
  padding: 32px 16px 40px 16px;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  border-radius: 18px;
  box-shadow: 0 4px 32px #0001;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
@media (max-width: 800px) {
  .app-root {
    max-width: 100vw;
    padding: 12px 2vw 24px 2vw;
    border-radius: 0;
  }
}
</style>
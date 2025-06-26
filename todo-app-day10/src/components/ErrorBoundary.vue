<!-- filepath: e:\VueJS\VueJS\todo-app-day10\src\components\ErrorBoundary.vue -->
<template>
  <slot v-if="!error" />
  <div v-else class="error-boundary">
    <h2>Đã xảy ra lỗi!</h2>
    <pre>{{ error.message }}</pre>
  </div>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  data() {
    return { error: null };
  },
  errorCaptured(err) {
    this.error = err;
    // Ngăn lỗi lan ra ngoài
    return false;
  }
};
</script>

<style scoped>
.error-boundary {
  color: #dc2626;
  background: #fee2e2;
  border-radius: 8px;
  padding: 18px 24px;
  margin: 24px 0;
  text-align: center;
}
</style>
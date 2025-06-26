<template>
  <div>
    <slot v-if="!error" />
    <div v-else class="text-red-500 text-center">Có lỗi xảy ra. Vui lòng thử lại.</div>
  </div>
</template>
<script>
export default {
  data: () => ({ error: false }),
  errorCaptured() {
    this.error = true;
    return false;
  }
};
</script>
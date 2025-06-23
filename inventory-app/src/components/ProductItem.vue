<template>
  <div class="item">
    <span>{{ product.name }} - {{ product.price }} × {{ product.quantity }}</span>
    <div>
      <button @click="$emit('edit', product)">Sửa</button>
      <button @click="$emit('delete', product.id)">Xóa</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['product'])
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>

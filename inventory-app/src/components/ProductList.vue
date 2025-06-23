<template>
  <div class="list">
    <ProductItem 
      v-for="product in store.products" 
      :key="product.id" 
      :product="product"
      @edit="$emit('edit', $event)"
      @delete="store.deleteProduct($event)"
    />
  </div>
</template>

<script setup>
import { useInventoryStore } from '@/stores/inventory'
import ProductItem from './ProductItem.vue'

// const emit = defineEmits(['edit'])
const store = useInventoryStore()
</script>

<style scoped>
.list {
  margin-top: 16px;
}
</style>

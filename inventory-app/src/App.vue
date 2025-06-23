<template>
  <div class="app">
    <h1>Quản lý Kho hàng</h1>
    <ProductForm :initialData="editing" @submit="handleSubmit" />
    <p>Tổng giá trị kho: {{ store.totalValue }} - Số sản phẩm: {{ store.productCount }}</p>
    <ProductList @edit="startEdit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useInventoryStore } from './stores/inventory'
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'



const store = useInventoryStore()
const editing = ref(null)
console.log(store.products)

onMounted(() => {
  store.fetchProducts()
})

const handleSubmit = (product) => {
  if (editing.value) {
    store.updateProduct(editing.value.id, product)
    editing.value = null
  } else {
    store.addProduct(product)
  }
}

const startEdit = (product) => {
  editing.value = product
}
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
</style>

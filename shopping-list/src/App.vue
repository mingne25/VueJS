<template>
  <div class="app">
      <Navbar />
  <FilterTabs 
    :activeFilter="filter" 
    @change-filter="filter = $event" 
  />

  <button @click="startAddItem" style="margin-bottom: 16px;">Thêm mặt hàng mới</button>

  <keep-alive>
    <component 
      :is="currentView" 
      v-bind="currentProps" 
      @submit="handleSubmit" 
      @toggle="toggleItem" 
      @delete="deleteItem" 
      @edit="editItem" 
    />
  </keep-alive>

  <ItemList 
    v-if="showList" 
    :items="filteredItems" 
    @toggle="toggleItem" 
    @edit="editItem" 
    @delete="deleteItem"
  >
    <template #default>
      <h2>Shopping List</h2>
    </template>
    <template #empty>
      <p>Không có mặt hàng nào.</p>
    </template>
  </ItemList>

  <ItemForm
    v-if="!showList"
    :initialData="editingItem"
    @submit="handleSubmit"
  >
  </ItemForm>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import FilterTabs from './components/FilterTabs.vue'
import ItemList from './components/ItemList.vue'
import ItemForm from './components/ItemForm.vue'
import Navbar from './components/Navbar.vue'


const items = ref([])
const editingItem = ref(null)
const filter = ref('all')
const currentView = ref('ItemList')
const currentProps = computed(() => editingItem.value ? { initialData: editingItem.value } : { items: filteredItems.value })
const showList = computed(() => !editingItem.value)

const filteredItems = computed(() => {
  if (filter.value === 'purchased') return items.value.filter(i => i.purchased)
  if (filter.value === 'not-purchased') return items.value.filter(i => !i.purchased)
  return items.value
})


// Load/save localStorage
onMounted(() => {
  const saved = localStorage.getItem('shopping-list')
  if (saved) {
    items.value = JSON.parse(saved)
  }
})

watch(items, () => {
  localStorage.setItem('shopping-list', JSON.stringify(items.value))
}, { deep: true })

function handleSubmit(item) {
  if (item.id) {
    // Nếu có id, là sửa
    const idx = items.value.findIndex(i => i.id === item.id)
    if (idx !== -1) items.value[idx] = item
  } else {
    // Nếu không có id, là thêm mới
    items.value.push({ ...item, id: Date.now() })
  }
  editingItem.value = null
}

function toggleItem(id) {
  const item = items.value.find(i => i.id === id)
  if (item) item.purchased = !item.purchased
}

function deleteItem(id) {
  items.value = items.value.filter(i => i.id !== id)
}

function editItem(item) {
  editingItem.value = { ...item }
}

function startAddItem() {
  editingItem.value = { name: '', quantity: 1, purchased: false }
}

</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 0 auto;
}
</style>

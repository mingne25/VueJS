<template>
  <button
    v-for="f in filters"
    :key="f"
    :class="{ active: f === activeFilter }"
    @click="$emit('change-filter', f)"
  >{{ labels[f] }}</button>
</template>

<script setup>
defineProps({
  activeFilter: String
})
const filters = ['all', 'purchased', 'not-purchased']
const labels = { all: 'Tất cả', purchased: 'Đã mua', 'not-purchased': 'Chưa mua' }

defineEmits(['change-filter'])
</script>

<style scoped>
button {
  margin-right: 8px;
}
.active {
  font-weight: bold;
  /* border-bottom: 2px solid blue; */
}
</style>

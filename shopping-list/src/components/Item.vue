<template>
  <div :class="{ purchased: item.purchased }">
    <input type="checkbox" :checked="item.purchased" @change="$emit('toggle', item.id)" />
    {{ item.name }} (x{{ item.quantity }})
    <button @click="$emit('edit', item)">Edit</button>
    <button @click="$emit('delete', item.id)">Delete</button>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    validator: (val) => 'id' in val && 'name' in val && 'purchased' in val
  }
})
</script>

<style scoped>
.purchased {
  /* text-decoration: line-through; */
  color: #888;
}
</style>

<template>
  <slot>
    
  </slot>
  <div v-if="items.length">
    <Item
      v-for="item in items"
      :key="item.id"
      :item="item"
      @toggle="$emit('toggle', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
  <slot name="empty" v-else></slot>
</template>

<script setup>
import Item from './Item.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle', 'edit', 'delete'])
</script>


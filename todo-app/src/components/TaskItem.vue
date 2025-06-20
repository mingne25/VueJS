<template>
  <li
    class="flex justify-between items-center p-2 border-b hover:bg-gray-100 animate__animated animate__fadeIn"
    :class="{ 'line-through text-gray-500': task.completed }"
    :style="{ backgroundColor: task.completed ? '#f0f0f0' : 'white' }"
  >
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
        class="mr-2"
      />
      {{ task.title }}
    </div>
    <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">Xóa</button>
  </li>
</template>


<script>
export default {
  props: ['task']
}
</script>

<style scoped>
:deep(.custom-border) {
  border-left: 4px solid #3b82f6;
}
</style>

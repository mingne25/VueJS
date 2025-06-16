<template>
  <li :class="{ completed: task.completed }" class="task">
    <label>
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
      />
      {{ task.title }}
    </label>
    <button @click="$emit('delete', task.id)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    task: Object
  },
  emits: ['toggle', 'delete']
}
</script>

<style>
.task {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
</style>

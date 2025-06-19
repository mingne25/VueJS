<template>
  <div>
    <h3>Task List</h3>
    <ul class="task-list">
      <li v-for="(task, index) in tasks || []" :key="index">{{ task }}</li>
      <li v-if="!tasks || tasks.length === 0" class="no-task">No tasks yet.</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})
</script>

<style>
.task-list {
  padding-left: 20px;
  list-style-type: disc;
}
.task-list li {
  margin: 6px 0;
}
.no-task {
  color: #999;
}
</style>

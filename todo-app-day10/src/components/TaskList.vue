<script setup>
import { inject } from 'vue';
import TaskItem from './TaskItem.vue';
defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
});
const userSettings = inject('userSettings');
</script>

<template>
  <div :class="['task-list', userSettings.theme]">
    <TaskItem
      v-for="task in tasks.filter(t => t && typeof t === 'object')"
      :key="task.id"
      :task="task"
      @edit="$emit('edit', task)"
      @delete="$emit('delete', task.id)"
      @toggle="$emit('toggle', task.id)"
    />
    <div v-if="!tasks.length" class="empty-task">Không có công việc nào.</div>
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 120px;
  background: #f8fafc;
  border-radius: 10px;
  padding: 18px 10px;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s;
}
.task-list.dark {
  background: #222;
  color: #fff;
}
.empty-task {
  text-align: center;
  color: #94a3b8;
  font-size: 1.08rem;
  padding: 32px 0 18px 0;
  letter-spacing: 0.5px;
}
</style>
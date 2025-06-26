<template>
  <div class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="$emit('edit', task)"
      @delete="$emit('delete', task.id)"
      @toggle="$emit('toggle', task.id)"
    />
    <div v-if="!tasks.length" class="empty-task">
      <span>Không có công việc nào.</span>
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue';
defineProps(['tasks']);
defineEmits(['edit', 'delete', 'toggle']);
</script>

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
}
.empty-task {
  text-align: center;
  color: #94a3b8;
  font-size: 1.08rem;
  padding: 32px 0 18px 0;
  letter-spacing: 0.5px;
}
</style>
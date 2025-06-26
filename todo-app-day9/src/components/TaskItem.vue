<template>
  <div class="task-item">
    <div class="task-info">
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle')" />
      <span :class="{ done: task.completed }">{{ task.title }}</span>
    </div>
    <div class="task-actions">
      <button @click="$emit('edit', task)" class="edit-btn">Sửa</button>
      <button @click="$emit('delete')" class="delete-btn">Xóa</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['task']);
defineEmits(['edit', 'delete', 'toggle']);
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px #0000000a;
}
.task-item:hover {
  box-shadow: 0 4px 16px #00000014;
}
.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.done {
  text-decoration: line-through;
  color: #94a3b8;
  font-style: italic;
}
.task-actions {
  display: flex;
  gap: 8px;
}
.edit-btn,
.delete-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 5px;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.edit-btn {
  background: #e0e7ff;
  color: #2563eb;
}
.edit-btn:hover {
  background: #c7d2fe;
}
.delete-btn {
  background: #fee2e2;
  color: #dc2626;
}
.delete-btn:hover {
  background: #fecaca;
}
@media (max-width: 640px) {
  .task-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px;
  }
  .task-actions {
    justify-content: flex-end;
  }
}
</style>
<script setup>
import { ref } from 'vue';
import vTooltip from '@/directives/v-tooltip';
import Modal from './Modal.vue';
import { useRouter } from 'vue-router';
// const { task } = defineProps(['task']);
const props = defineProps(['task']);
const showModal = ref(false);
const router = useRouter();

const goToDetail = () => {
  router.push(`/tasks/${props.task.id}`);
};
</script>

<template>
  <div class="task-item">
    <div class="task-info">
      <input type="checkbox" :checked="props.task.completed" @change="$emit('toggle', task.id)" />
      <span :class="{ done: props.task.completed }">{{ task.title }}</span>
    </div>
    <div class="task-actions">
      <button class="detail-btn" @click="goToDetail">Chi tiết</button>
      <button class="edit-btn" @click="$emit('edit', task)">Sửa</button>
      <button class="delete-btn" v-tooltip="'Delete this task'" @click="showModal = true">Xóa</button>
    </div>
    <Modal
      v-if="showModal"
      title="Xác nhận"
      message="Bạn có chắc muốn xóa?"
      @confirm="$emit('delete', props.task.id); showModal=false"
      @cancel="showModal=false"
    />
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
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
  gap: 12px;
}
.done {
  text-decoration: line-through;
  color: #94a3b8;
  font-style: italic;
}
.task-actions {
  display: flex;
  gap: 10px;
}
.detail-btn,
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
.detail-btn {
  background: #f1f5f9;
  color: #2563eb;
}
.detail-btn:hover {
  background: #dbeafe;
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
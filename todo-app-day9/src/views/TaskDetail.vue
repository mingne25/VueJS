<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTask } from '@/api/api';

const route = useRoute();
const task = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    task.value = await getTask(route.params.id);
    error.value = null;
  } catch (err) {
    error.value = 'Không thể tải chi tiết công việc';
  }
});
</script>

<template>
  <div class="task-detail-container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="task" class="task-detail-card">
      <h2 class="task-title">{{ task.title }}</h2>
      <p class="task-status">
        Trạng thái:
        <span :class="task.completed ? 'status-done' : 'status-todo'">
          {{ task.completed ? 'Hoàn thành' : 'Chưa hoàn thành' }}
        </span>
      </p>
      <router-link to="/tasks" class="back-link">← Quay lại danh sách</router-link>
    </div>
    <div v-else class="loading-message">Đang tải...</div>
  </div>
</template>

<style scoped>
.task-detail-container {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.task-detail-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px #0001;
  padding: 36px 32px 28px 32px;
  min-width: 320px;
  max-width: 420px;
  text-align: center;
}
.task-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}
.task-status {
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
}
.status-done {
  color: #22c55e;
  font-weight: 600;
}
.status-todo {
  color: #ef4444;
  font-weight: 600;
}
.back-link {
  display: inline-block;
  margin-top: 10px;
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s;
}
.back-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}
.error-message {
  color: #dc2626;
  font-size: 1.1rem;
  font-weight: 500;
  background: #fee2e2;
  border-radius: 8px;
  padding: 18px 24px;
  text-align: center;
}
.loading-message {
  color: #64748b;
  font-size: 1.08rem;
  font-style: italic;
  text-align: center;
}
</style>
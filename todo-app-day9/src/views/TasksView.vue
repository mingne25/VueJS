<template>
  <div class="tasks-view-container">
    <div class="tasks-header">
      <h1 class="tasks-title">Danh sách Công việc</h1>
    </div>
    <div class="tasks-content">
      <TaskForm :task="editingTask" @add="addTask" @edit="editTask" />
      <TaskList
        :tasks="tasks"
        @edit="onEditTask"
        @delete="deleteTaskFn"
        @toggle="toggleTask"
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'TasksView' });

import { ref, onMounted, nextTick } from 'vue';
import { getTasks, createTask, updateTask, deleteTask } from '@/api/api';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

const tasks = ref([]);
const editingTask = ref(null);

// Lưu vào localStorage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

// Khi mounted, ưu tiên lấy từ localStorage
onMounted(async () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks.value = JSON.parse(saved);
  } else {
    try {
      tasks.value = await getTasks();
      saveTasks();
    } catch (e) {
      console.error('Lỗi khi fetch tasks:', e);
    }
  }
});

const addTask = async (task) => {
  const newTask = await createTask(task);
  // Đảm bảo id duy nhất nếu API trả về id trùng
  if (tasks.value.some(t => t.id === newTask.id)) {
    newTask.id = Math.max(...tasks.value.map(t => t.id)) + 1;
  }
  tasks.value.push(newTask);
  saveTasks();
};

const editTask = async (task) => {
  if (task.id > 100) {
    const idx = tasks.value.findIndex(t => t.id === task.id);
    if (idx !== -1) tasks.value[idx] = { ...tasks.value[idx], ...task };
    saveTasks();
    await nextTick();
    editingTask.value = null;
    return;
  }
  try {
    await updateTask(task.id, {
      id: task.id,
      title: task.title,
      completed: task.completed,
      userId: task.userId || 1
    });
    const idx = tasks.value.findIndex(t => t.id === task.id);
    if (idx !== -1) tasks.value[idx] = { ...tasks.value[idx], ...task };
    saveTasks();
    await nextTick();
    editingTask.value = null;
  } catch (e) {
    alert('Không thể cập nhật công việc này trên server demo!');
    editingTask.value = null;
  }
};

const deleteTaskFn = async (id) => {
  await deleteTask(id);
  tasks.value = tasks.value.filter(t => t.id !== id);
  saveTasks();
};

const toggleTask = async (id) => {
  const task = tasks.value.find(t => t.id === id);
  if (task) await editTask({ ...task, completed: !task.completed });
};

const onEditTask = (task) => {
  editingTask.value = { ...task };
};
</script>

<style scoped>
.tasks-view-container {
  max-width: 700px;
  margin: 32px auto 0 auto;
  padding: 24px 12px 32px 12px;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 4px 24px #0001;
  min-height: 70vh;
}
.tasks-header {
  text-align: center;
  margin-bottom: 24px;
}
.tasks-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  letter-spacing: 1px;
  margin-bottom: 0;
}
.tasks-content {
  margin-top: 0;
}
@media (max-width: 800px) {
  .tasks-view-container {
    max-width: 98vw;
    padding: 12px 2vw 24px 2vw;
  }
  .tasks-title {
    font-size: 1.4rem;
  }
}
</style>
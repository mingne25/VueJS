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
import { ref} from 'vue';
import { useTasks } from '@/composables/useTasks';
import TaskForm from '@/components/TaskForm.vue';
import TaskList from '@/components/TaskList.vue';

const { tasks, addTask, updateTask, deleteTask } = useTasks();
const editingTask = ref(null);

const editTask = (task) => {
  if (!task || typeof task !== 'object') return;
  updateTask(task.id, { title: task.title, completed: task.completed });
  editingTask.value = null;
};

const deleteTaskFn = (id) => {
  deleteTask(id);
};

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id);
  if (task) updateTask(id, { completed: !task.completed });
};

const onEditTask = (task) => {
  if (!task || typeof task !== 'object') return;
  editingTask.value = { ...task };
};
</script>

<style scoped>
.tasks-view-container {
  max-width: 600px;
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
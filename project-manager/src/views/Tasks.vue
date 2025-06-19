<template>
  <div class="tasks-container">
    <TaskList :tasks="tasks" />
    <div class="new-task">
      <input v-model="newTask" placeholder="New task" />
      <button @click="addTask">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TaskList from '../components/TaskList.vue'

const tasks = ref([])
const route = useRoute()

onMounted(() => {
  const projects = JSON.parse(localStorage.getItem('projects')) || []
  const project = projects.find(p => p.id == route.params.id)
  tasks.value = project?.tasks || []
})

const newTask = ref('')

function addTask() {
  if (!newTask.value.trim()) return
  tasks.value.push(newTask.value.trim())
  newTask.value = ''
  // Lưu lại vào localStorage:
  const projects = JSON.parse(localStorage.getItem('projects')) || []
  const project = projects.find(p => p.id == route.params.id)
  if (project) {
    project.tasks = tasks.value
    localStorage.setItem('projects', JSON.stringify(projects))
  }
}
</script>

<style>
.tasks-container {
  margin-top: 20px;
  background: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.new-task {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
.new-task input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.new-task button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<template>
  <div class="max-w-md mx-auto p-4">
    <TaskForm @submit="addTask" />
        <div class="flex gap-2 mb-2">
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-white-600 text-black': filter === 'all',
          'hover:bg-gray-300': filter === 'all'
        }"
        @click="filter = 'all'"
      >Tất cả</button>
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-white-600 text-black': filter === 'all',
          'hover:bg-gray-300': filter !== 'done || all'
        }"
        @click="filter = 'done'"
      >Hoàn thành</button>
      <button
        class="px-4 py-1 rounded"
        :class="{
          'bg-white-600 text-black': filter === 'all',
          'hover:bg-gray-300': filter !== 'todo || all'
        }"
        @click="filter = 'todo'"
      >Chưa hoàn thành</button>
    </div>
    <TaskList
      :tasks="filteredTasks"
      @toggle="toggleTask"
      @delete="deleteTask"
    />

  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import './assets/tailwind.css'

export default {
  components: { TaskForm, TaskList },
  data() {
    return {
      tasks: [],
      filter: 'all'
    }
  },
    computed: {
    filteredTasks() {
      if (this.filter === 'done') return this.tasks.filter(t => t.completed);
      if (this.filter === 'todo') return this.tasks.filter(t => !t.completed);
      return this.tasks;
    }
  },
  mounted() {
    const saved = localStorage.getItem('tasks')
    if (saved) this.tasks = JSON.parse(saved)
  },
  watch: {
    tasks: {
      deep: true,
      handler(val) {
        localStorage.setItem('tasks', JSON.stringify(val))
      }
    }
  },

  methods: {
    addTask(title) {
      if (!title || typeof title !== 'string') return
      this.tasks.push({
        id: Date.now() + Math.random(), // id duy nhất
        title,
        completed: false
      })
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
}
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fafb;
}
</style>

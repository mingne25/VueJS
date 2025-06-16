<template>
  <div class="app">
    <h1>Danh sách Công việc</h1>
    <TaskForm v-model="newTask" @add="addTask" />
    
    <ul class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </ul>

    <p>Còn lại: {{ incompleteCount }} công việc</p>
  </div>
</template>
<script>
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

export default {
  components: { TaskForm, TaskItem },
  data() {
    return {
      tasks: [],
      newTask: ''
    }
  },
  computed: {
    incompleteCount() {
      return this.tasks.filter(t => !t.completed).length
    }
  },
  methods: {
    addTask(title) {
      if (!title.trim()) return
      this.tasks.push({
        id: Date.now(),
        title: title.trim(),
        completed: false
      })
      this.newTask = ''
    },
    toggleTask(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) task.completed = !task.completed
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
    },
    loadTasks() {
      const saved = localStorage.getItem('tasks')
      if (saved) this.tasks = JSON.parse(saved)
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      }
    }
  },
  mounted() {
    this.loadTasks()
  }
}
</script>
<style>
.app {
  max-width: 600px;
  margin: 40px auto;
  font-family: Arial;
}
.task-list {
  list-style: none;
  padding: 0;
}
</style>
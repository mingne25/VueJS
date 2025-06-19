<template>
  <div class="container">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { ref, watch, onMounted } from 'vue'

const projects = ref([])

onMounted(() => {
  const stored = localStorage.getItem('projects')
  if (stored) {
    projects.value = JSON.parse(stored)
  }
})

watch(projects, (newValue) => {
  localStorage.setItem('projects', JSON.stringify(newValue))
}, { deep: true })
</script>

<style>
.container {
  font-family: Arial, sans-serif;
  background-color: #f4f6f8;
  min-height: 100vh;
}
.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>

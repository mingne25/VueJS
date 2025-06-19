<template>
  <div>
    <h2>{{ project?.title }}</h2>
    <p>{{ project?.description }}</p>

    <router-link :to="`/projects/${route.params.id}/tasks`">
      View Tasks
    </router-link>
    <router-view /> <!-- nested Tasks.vue sẽ hiện tại đây -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const project = ref(null)

onMounted(() => {
  const projects = JSON.parse(localStorage.getItem('projects')) || []
  project.value = projects.find(p => p.id == route.params.id)
})
</script>

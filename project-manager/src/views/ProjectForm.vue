<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit Project' : 'New Project' }}</h2>
    <ProjectForm
      v-model:title="title"
      v-model:description="description"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectForm from '../components/ProjectForm.vue'

const title = ref('')
const description = ref('')
const route = useRoute()
const router = useRouter()
const isEdit = route.path.includes('edit')
const id = route.params.id

onMounted(() => {
  if (isEdit) {
    const projects = JSON.parse(localStorage.getItem('projects')) || []
    const project = projects.find(p => p.id == id)
    if (project) {
      title.value = project.title
      description.value = project.description
    }
  }
})

function handleSubmit() {
  let projects = JSON.parse(localStorage.getItem('projects')) || []

  if (isEdit) {
    projects = projects.map(p =>
      p.id == id ? { ...p, title: title.value, description: description.value } : p
    )
  } else {
    projects.push({
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      tasks: []
    })
  }

  localStorage.setItem('projects', JSON.stringify(projects))
  router.push('/projects')
}
</script>

<style>
.form-container {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.form-container h2 {
  margin-bottom: 16px;
}
</style>

<template>
  <div>
    <h2>Project List</h2>
    <ProjectItem
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @view="viewDetail"
      @edit="editProject"
      @delete="deleteProject"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProjectItem from '../components/ProjectItem.vue'

const router = useRouter()
const projects = ref([])

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('projects')) || []
  projects.value = data
})

function viewDetail(id) {
  router.push({ name: 'project-detail', params: { id } })
}

function editProject(id) {
  router.push(`/projects/${id}/edit`)
}

function deleteProject(id) {
  if (confirm('Bạn có chắc muốn xóa dự án này?')) {
    projects.value = projects.value.filter(p => p.id !== id)
    localStorage.setItem('projects', JSON.stringify(projects.value))
  }
}
</script>

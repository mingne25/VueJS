<template>
  <div class="project-card">
    <div class="info" @click="$emit('view', project.id)">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
    </div>
    <div class="actions">
      <button @click.stop="$emit('edit', project.id)">Edit</button>
      <button @click.stop="$emit('delete', project.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
defineEmits(['view', 'edit', 'delete'])

</script>

<style>
.project-card {
  background: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.project-card h3 {
  margin: 0;
  font-size: 18px;
}
.project-card p {
  color: #666;
  margin-top: 4px;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.actions button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.actions button:first-child {
  background-color: #ffc107;
  color: white;
}
.actions button:last-child {
  background-color: #f44336;
  color: white;
}
</style>

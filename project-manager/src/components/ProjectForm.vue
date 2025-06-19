<template>
  <div class="form">
    <input
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      placeholder="Tiêu đề dự án"
    />
    <textarea
      :value="description"
      @input="$emit('update:description', $event.target.value)"
      placeholder="Mô tả dự án"
    />
    <button @click="$emit('submit')">Submit</button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
defineEmits(['update:title', 'update:description', 'submit'])
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input, textarea {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 8px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
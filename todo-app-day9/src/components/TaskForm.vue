<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ task: Object });
const emit = defineEmits(['add', 'edit']);

const title = ref('');
const completed = ref(false);
const isEdit = ref(false);

watch(
  () => props.task,
  (val) => {
    if (val && val.id !== undefined) {
      title.value = val.title;
      completed.value = val.completed;
      isEdit.value = true;
    } else {
      title.value = '';
      completed.value = false;
      isEdit.value = false;
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  if (!title.value.trim()) return;
  if (isEdit.value && props.task && props.task.id !== undefined) {
    emit('edit', {
      id: props.task.id,
      title: title.value,
      completed: completed.value,
      userId: props.task.userId || 1
    });
  } else {
    emit('add', {
      title: title.value,
      completed: completed.value,
      userId: 1
    });
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <input
      v-model="title"
      placeholder="Tiêu đề công việc"
      required
      class="task-input"
    />
    <label class="checkbox-label">
      <input type="checkbox" v-model="completed" />
      Đã hoàn thành
    </label>
    <button type="submit" class="task-btn">
      {{ isEdit ? 'Cập nhật' : 'Thêm' }}
    </button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 1.5rem;
  background: #f8fafc;
  padding: 16px 18px;
  border-radius: 10px;
  box-shadow: 0 2px 8px #0001;
  flex-wrap: wrap;
}
.task-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.task-input:focus {
  border-color: #2563eb;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  color: #334155;
  user-select: none;
}
.task-btn {
  background: #2563eb;
  color: #fff;
  padding: 10px 22px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.task-btn:hover {
  background: #1d4ed8;
}
</style>
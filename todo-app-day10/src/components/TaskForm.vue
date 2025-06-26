<script setup>
import { ref, watch, inject } from 'vue';
import vFocus from '@/directives/v-focus';

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(['add', 'edit']);
const userSettings = inject('userSettings');

const title = ref('');
const completed = ref(false);

// Khi props.task thay đổi, cập nhật form
watch(
  () => props.task,
  (val) => {
    if (val) {
      title.value = val.title;
      completed.value = val.completed;
    } else {
      title.value = '';
      completed.value = false;
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  if (!title.value.trim()) return;
  if (props.task && props.task.id !== undefined) {
    emit('edit', { ...props.task, title: title.value, completed: completed.value });
  } else {
    emit('add', { title: title.value, completed: completed.value });
  }
  title.value = '';
  completed.value = false;
};
</script>

<template>
  <form @submit.prevent="onSubmit" :class="['task-form', userSettings.theme]">
    <input
      v-model="title"
      v-focus
      placeholder="Tiêu đề công việc"
      class="task-input"
    />
    <label class="checkbox-label">
      <input type="checkbox" v-model="completed" />
      Đã hoàn thành
    </label>
    <button type="submit" class="task-btn">
      {{ props.task ? 'Cập nhật' : 'Thêm' }}
    </button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  background: #f8fafc;
  padding: 20px 22px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s;
}
.task-form.dark {
  background: #222;
  color: #fff;
}
.task-input {
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
  gap: 8px;
  font-size: 1rem;
  color: #334155;
  user-select: none;
}
.task-form.dark .checkbox-label {
  color: #fff;
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
// import { ref } from 'vue';
import { useStorage, useDebounceFn } from '@vueuse/core';

export function useTasks() {
  const tasks = useStorage('tasks', []);
  
  const addTask = useDebounceFn((task) => {
    tasks.value.push({ ...task, id: Date.now()});
  }, 300);

  const updateTask = (id, data) => {
    const idx = tasks.value.findIndex(t => t.id === id);
    if (idx !== -1) Object.assign(tasks.value[idx], data);
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(t => t && t.id !== id);
  };

  return { tasks, addTask, updateTask, deleteTask };
}
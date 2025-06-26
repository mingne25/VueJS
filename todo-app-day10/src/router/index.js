import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Tasks from '@/views/Tasks.vue';
import TaskDetail from '@/views/TaskDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/tasks', component: Tasks },
  { path: '/tasks/:id', component: TaskDetail, props: true }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
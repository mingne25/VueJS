import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TasksView from '../views/TasksView.vue';
const TaskDetail = () => import('../views/TaskDetail.vue');

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tasks', component: TasksView },
    { path: '/tasks/:id', component: TaskDetail }
  ]
});
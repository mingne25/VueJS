import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import ProjectForm from '../views/ProjectForm.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Tasks from '../views/Tasks.vue'

const routes = [
  { path: '/', component: Home },
  {
    path: '/projects',
    component: Projects
  },
  {
    path: '/projects/new',
    component: ProjectForm
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetail,
    children: [
      {
        path: 'tasks',
        component: Tasks
      }
    ]
  },
  {
    path: '/projects/:id/edit',
    component: ProjectForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

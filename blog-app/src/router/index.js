import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import PostDetail from '../views/PostDetail.vue'
import PostForm from '../views/PostForm.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/posts', name: 'Posts', component: Posts },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetail, props: true },
  { path: '/post-form', name: 'CreatePost', component: PostForm },
  { path: '/post-form/:id', name: 'EditPost', component: PostForm, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
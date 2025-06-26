import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import NotesView from '../views/Notes.vue';
import NoteDetailView from '../views/NoteDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/notes', name: 'Notes', component: NotesView },
  { path: '/note/:id', name: 'NoteDetail', component: NoteDetailView, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
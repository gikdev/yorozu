import HomeView from '#/views/home/View.vue'
import AppTodosHomeView from '#/views/apps/todos/HomeView.vue'
import TodoView from '#/views/TodoView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView,
  },
  {
    path: '/apps/todos',
    name: 'apps-todos',
    component: AppTodosHomeView,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

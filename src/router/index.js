import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LegalNotice from '../views/LegalNotice.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/impressum',
    name: 'LegalNotice',
    component: LegalNotice
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

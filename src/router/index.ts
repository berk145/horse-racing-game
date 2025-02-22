import { createRouter, createWebHistory } from 'vue-router'
import HorseRace from '@/views/HorseRace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'horse-race',
      component: HorseRace,
    },
  ],
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '@/views/Index.vue'
import StudyCentre from '@/views/StudyCentre.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {
        path: '/studycentre',
        name: 'StudyCentre',
        component: StudyCentre
      }
    ]
  },
  {
    path: '/studycentrepage',
    name: 'StudyCentrePage',
    component: StudyCentre
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

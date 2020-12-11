import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/project/Project.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

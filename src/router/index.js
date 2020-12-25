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
    component: () => import(/* webpackChunkName: "project" */ '../views/project/Project.vue'),
    children: [
      {
        path: '',
        redirect: 'overview'
      },
      {
        path: 'overview',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/Overview.vue')
      },
      {
        path: 'flows',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/Flows.vue')
      },
      {
        path: 'Interactions',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/Interactions.vue')
      },
      {
        path: 'consumers',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/Consumers.vue')
      },
      {
        path: 'providers',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/Providers.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

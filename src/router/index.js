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
    path: '/matrix',
    name: 'Matrix',
    component: () => import(/* webpackChunkName: "matrix" */ '../views/matrix/MatrixPage.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects/ProjectsPage.vue')
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/project/ProjectPage.vue'),
    children: [
      {
        path: '',
        redirect: 'overview'
      },
      {
        path: 'overview',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectOverview.vue')
      },
      {
        path: 'flows',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectFlows.vue')
      },
      {
        path: 'interactions',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectInteractions.vue')
      },
      {
        path: 'consumers',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectConsumers.vue')
      },
      {
        path: 'providers',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectProviders.vue')
      }
    ]
  },
  {
    path: '/flows/:id',
    name: 'Flow',
    component: () => import(/* webpackChunkName: "flows" */ '../views/flow/FlowPage.vue'),
  },
  {
    path: '/interactions/:id',
    name: 'Interaction',
    component: () => import(/* webpackChunkName: "interactions" */ '../views/interaction/InteractionPage.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router

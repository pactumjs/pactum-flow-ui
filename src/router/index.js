import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/authentication/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/matrix',
    name: 'Matrix',
    component: () => import(/* webpackChunkName: "matrix" */ '../views/matrix/MatrixPage.vue'),
    children: [
      {
        path: '',
        redirect: 'compatibility'
      },
      {
        path: 'compatibility',
        name: 'Compatibility',
        component: () => import(/* webpackChunkName: "matrix" */ '../views/matrix/CompatibilityPage.vue')
      },
      {
        path: 'network',
        name: 'Network',
        component: () => import(/* webpackChunkName: "matrix" */ '../views/matrix/NetworkPage.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/projects/ProjectsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    component: () => import(/* webpackChunkName: "projects" */ '../views/project/LeanProjectPage.vue')
  },
  {
    path: '/projects/:id/:version',
    component: () => import(/* webpackChunkName: "project" */ '../views/project/ProjectPage.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Project',
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
      },
      {
        path: 'quality-gates',
        component: () => import(/* webpackChunkName: "project" */ '../views/project/children/ProjectQualityGates.vue')
      }
    ]
  },
  {
    path: '/flows/:id',
    name: 'Flow',
    component: () => import(/* webpackChunkName: "flows" */ '../views/flow/FlowPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/interactions/:id',
    name: 'Interaction',
    component: () => import(/* webpackChunkName: "interactions" */ '../views/interaction/InteractionPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "login" */ '../views/authentication/LogoutPage.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  // Do not navigate to login if user is already logged in 
  if (to.name === 'Login' && store.getters.isAuthenticated) {
    next(false)
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router

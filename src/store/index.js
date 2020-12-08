import Vue from 'vue'
import Vuex from 'vuex'

import Projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    projects: Projects
  }
})

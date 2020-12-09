import Vue from 'vue'
import Vuex from 'vuex'

import Projects from './projects'
import Analysis from './analysis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    async getProjectsAndMainAnalysis({ dispatch }) {
      await dispatch('getProjects');
    }
  },
  modules: {
    projects: Projects,
    analysis: Analysis
  }
})

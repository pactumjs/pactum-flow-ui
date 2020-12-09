import Vue from 'vue'
import Vuex from 'vuex'

import { Actions } from './types'

import Projects from './projects'
import Analysis from './analysis'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {
  async [Actions.LOAD_PROJECTS_HOME_PAGE]({ state, dispatch }) {
    if (state.projects.projects.length === 0) {
      await dispatch(Actions.FETCH_PROJECTS);
      const ids = [];
      for (let i = 0; i < state.projects.projects.length; i++) {
        const main = state.projects.projects[i].analysis.main;
        if (main.length > 0) {
          ids.push(main[main.length - 1]);
        }
      }
      await dispatch(Actions.FETCH_ANALYSIS_BY_IDS, ids);
    }
  }
}
const modules = {
  projects: Projects,
  analysis: Analysis
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})

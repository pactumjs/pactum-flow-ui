import Vue from 'vue'
import Vuex from 'vuex'

import { Actions, Mutations } from './types'

import Projects from './projects'
import Analysis from './analysis'
import Flows from './flows'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {
  async [Actions.LOAD_PROJECTS_DASHBOARD_PAGE]({ state, dispatch }) {
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
  },
  async [Actions.LOAD_PROJECT_DASHBOARD_PAGE]({ state, dispatch }, pid) {
    let project = state.projects.projects.find(_project => _project._id === pid);
    if (!project) {
      await dispatch(Actions.FETCH_PROJECT_BY_ID, pid);
      project = state.projects.projects.find(_project => _project._id === pid);
    }
    const main = project.analysis.main;
    if (main.length > 0) {
      const aid = main[main.length - 1];
      let analysis = state.analysis.analysis.find(_analysis => _analysis._id === aid);
      if (!analysis) {
        await dispatch(Actions.FETCH_ANALYSIS_BY_ID, aid);
        analysis = state.analysis.analysis.find(_analysis => _analysis._id === aid);
      }
      await dispatch(Actions.FETCH_FLOWS_BY_IDS, analysis.flows);
    }
  },
  async [Actions.LOAD_PROJECT_MENU_PAGE]({ commit }, menu) {
    commit(Mutations.SELECT_PROJECT_MENU, menu);
  }
}
const modules = {
  projects: Projects,
  analysis: Analysis,
  flows: Flows
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})

import { Actions, Mutations } from '../../types';

const state = () => {
  return {
    projectMetrics: [],
    loadingProjects: false,
    error: ''
  }
}

const mutations = {
  [Mutations.STORE_PROJECT_METRICS](state, metrics) {
    state.projectMetrics = metrics;
  }
}

const actions = {
  async [Actions.LOAD_PROJECTS_VIEW_PAGE]({ commit }) {
    const response = await fetch('/api/flow/v1/metrics/projects');
    const metrics = await response.json();
    commit(Mutations.STORE_PROJECT_METRICS, metrics);
  }
}

export default {
  state,
  mutations,
  actions
}
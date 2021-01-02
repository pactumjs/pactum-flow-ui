import { Actions, Mutations } from '../types';

const state = () => {
  return {
    analyses: [],
    analysesMetrics: []
  }
}

const getters = {
  getAnalysisById: (state) => (id) => {
    return state.analyses.find(analysis => analysis._id === id);
  },
  getAnalysisMetricsById: (state) => (id) => {
    return state.analysesMetrics.find(am => am._id === id);
  }
}

const mutations = {
  [Mutations.ADD_ANALYSES](state, analyses) {
    state.analyses = state.analyses.concat(analyses);
  },
  [Mutations.ADD_ANALYSIS](state, analysis) {
    state.analyses.push(analysis);
  },
  [Mutations.ADD_ANALYSIS_METRICS](state, metrics) {
    state.analysesMetrics.push(metrics);
  }
};

const actions = {
  async [Actions.FETCH_ANALYSES_BY_IDS]({ state, commit }, ids) {
    const requiredIds = [];
    for (let i = 0; i < ids.length; i++) {
      if (!state.analyses.find(analysis => analysis._id === ids[i])) {
        requiredIds.push(ids[i])
      }
    }
    if (requiredIds.length > 0) {
      const response = await fetch('/api/flow/v1/search/analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ids: requiredIds
        })
      });
      commit(Mutations.ADD_ANALYSES, await response.json());
    }
  },
  async [Actions.FETCH_ANALYSIS_BY_ID]({ getters, commit }, id) {
    if (!getters.getAnalysisById(id)) {
      const response = await fetch(`/api/flow/v1/analyses/${id}`);
      commit(Mutations.ADD_ANALYSIS, await response.json());
    }
  },
  async [Actions.FETCH_ANALYSIS_METRICS_BY_ID]({ getters, commit }, id) {
    if (!getters.getAnalysisMetricsById(id)) {
      const response = await fetch(`/api/flow/v1/metrics/analyses/${id}`);
      commit(Mutations.ADD_ANALYSIS_METRICS, await response.json());
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
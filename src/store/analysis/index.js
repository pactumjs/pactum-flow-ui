import { Actions, Mutations } from '../types';

const state = () => {
  return {
    analysis: [],
    analysesMetrics: []
  }
}

const getters = {
  getAnalysisById: (state) => (id) => {
    return state.analysis.find(_analysis => _analysis._id === id);
  },
  getAnalysisMetricsById: (state) => (id) => {
    return state.analysesMetrics.find(_analysis => _analysis._id === id);
  }
}

const mutations = {
  [Mutations.ADD_ANALYSIS](state, analysis) {
    state.analysis.push(analysis);
  },
  [Mutations.ADD_ANALYSIS_METRICS](state, metrics) {
    state.analysesMetrics.push(metrics);
  }
};

const actions = {
  async [Actions.FETCH_ANALYSIS_BY_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/analyses/${id}`);
    commit(Mutations.ADD_ANALYSIS, await response.json());
  },
  async [Actions.FETCH_ANALYSIS_METRICS_BY_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/metrics/analyses/${id}`);
    commit(Mutations.ADD_ANALYSIS_METRICS, await response.json());
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    analysis: []
  }
}

const getters = {
  getAnalysisById: (state) => (id) => {
    return state.analysis.find(_analysis => _analysis._id === id);
  }
}

const mutations = {
  [Mutations.STORE_ANALYSIS](state, analysis) {
    state.analysis = analysis;
  },
  [Mutations.ADD_ANALYSIS](state, analysis) {
    state.analysis.push(analysis);
  }
};

const actions = {
  async [Actions.FETCH_ANALYSIS_BY_IDS]({ commit }, ids) {
    const response = await fetch('/api/flow/v1/analysis/search', {
      method: 'POST',
      body: JSON.stringify({
        analysisIds: ids
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    commit(Mutations.STORE_ANALYSIS, await response.json());
  },
  async [Actions.FETCH_ANALYSIS_BY_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/analysis/${id}`);
    commit(Mutations.ADD_ANALYSIS, await response.json());
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
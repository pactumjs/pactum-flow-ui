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
  [Mutations.ADD_ANALYSIS](state, analysis) {
    state.analysis.push(analysis);
  }
};

const actions = {
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
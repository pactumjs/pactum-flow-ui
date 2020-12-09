const state = () => {
  return {
    analysis: []
  }
}

const mutations = {
  GET_ANALYSIS(state, analysis) {
    state.analysis = analysis;
  }
};

const actions = {
  async getAnalysis({ commit }) {
    const response = await fetch('/api/flow/v1/analysis');
    const analysis = await response.json();
    commit('GET_ANALYSIS', analysis);
  }
}

export default {
  state,
  mutations,
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    interactions: []
  }
}

const getters = {
  getInteractionById: (state) => (id) => {
    return state.interactions.find(_interaction => _interaction._id === id);
  },
  getInteractionsByIds: (state) => (ids) => {
    const set = new Set(ids);
    return state.interactions.filter(_interaction => set.has(_interaction._id));
  },
  getInteractionsByAnalysisId: (state) => (id) => {
    return state.interactions.filter(_interaction => _interaction.analysisId === id);
  },
}

const mutations = {
  [Mutations.ADD_INTERACTIONS](state, interactions) {
    state.interactions = interactions;
  }
};

const actions = {
  async [Actions.FETCH_INTERACTIONS_BY_ANALYSIS_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/interactions?analysisId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    commit(Mutations.ADD_INTERACTIONS, await response.json());
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
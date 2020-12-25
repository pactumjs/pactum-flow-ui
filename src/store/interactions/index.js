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
  }
}

const mutations = {
  [Mutations.ADD_INTERACTIONS](state, interactions) {
    state.interactions = interactions;
  }
};

const actions = {
  async [Actions.FETCH_INTERACTIONS_BY_IDS]({ commit }, ids) {
    const response = await fetch('/api/flow/v1/search/interactions', {
      method: 'POST',
      body: JSON.stringify({
        ids
      }),
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
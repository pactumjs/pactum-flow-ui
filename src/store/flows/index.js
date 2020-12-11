import { Actions, Mutations } from '../types';

const state = () => {
  return {
    flows: []
  }
}

const getters = {
  getFlowsById: (state) => (id) => {
    return state.flows.find(_flows => _flows._id === id);
  },
  getFlowsByIds: (state) => (ids) => {
    const set = new Set(ids);
    return state.flows.filter(_flows => set.has(_flows._id));
  }
}

const mutations = {
  [Mutations.ADD_FLOWS](state, flows) {
    state.flows = flows;
  }
};

const actions = {
  async [Actions.FETCH_FLOWS_BY_IDS]({ commit }, ids) {
    const response = await fetch('/api/flow/v1/flows/search', {
      method: 'POST',
      body: {
        flowsIds: ids
      }
    });
    commit(Mutations.ADD_FLOWS, await response.json());
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    flows: []
  }
}

const getters = {
  getFlowById: (state) => (id) => {
    return state.flows.find(_flow => _flow._id === id);
  },
  getFlowsByIds: (state) => (ids) => {
    const set = new Set(ids);
    return state.flows.filter(_flow => set.has(_flow._id));
  },
  getFlowsByAnalysisId: (state) => (id) => {
    return state.flows.filter(_flow => _flow.analysisId === id);
  },
}

const mutations = {
  [Mutations.ADD_FLOWS](state, flows) {
    state.flows = flows;
  },
  [Mutations.ADD_FLOW](state, flow) {
    state.flows.push(flow);
  }
};

const actions = {
  async [Actions.FETCH_FLOWS_BY_ANALYSIS_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/flows?analysisId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    commit(Mutations.ADD_FLOWS, await response.json());
  },
  async [Actions.FETCH_FLOW_BY_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/flows/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    commit(Mutations.ADD_FLOW, await response.json());
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
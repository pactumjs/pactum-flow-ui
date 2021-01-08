import { Actions, Mutations } from '../types';

const state = () => {
  return {
    flows: [],
    loadedAnalyses: []
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
    state.flows = state.flows.concat(flows);
  },
  [Mutations.ADD_FLOW](state, flow) {
    state.flows.push(flow);
  },
  [Mutations.ADD_ANALYSIS_TO_LOADED_FLOWS](state, id) {
    state.loadedAnalyses.push(id);
  },
};

const actions = {
  async [Actions.FETCH_FLOWS_BY_ANALYSIS_ID]({ commit, state }, id) {
    if (!state.loadedAnalyses.includes(id)) {
      const response = await fetch(`/api/flow/v1/flows?analysisId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      commit(Mutations.ADD_FLOWS, await response.json());
      commit(Mutations.ADD_ANALYSIS_TO_LOADED_FLOWS, id);
    }
  },
  async [Actions.FETCH_FLOW_BY_ID]({ getters, commit }, id) {
    if (!getters.getFlowById(id)) {
      const response = await fetch(`/api/flow/v1/flows/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      commit(Mutations.ADD_FLOW, await response.json());
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
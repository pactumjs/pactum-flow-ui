import { Actions, Mutations } from '../types';
import request from '../request';

const state = () => {
  return {
    requests: [],
    responses: []
  }
}

const getters = {
  getRequestById: (state) => (id) => {
    return state.requests.find(request => request._id === id);
  },
  getResponseById: (state) => (id) => {
    return state.responses.find(response => response._id === id);
  }
}

const mutations = {
  [Mutations.ADD_REQUEST](state, request) {
    state.requests.push(request);
  },
  [Mutations.ADD_RESPONSE](state, response) {
    state.responses.push(response);
  }
};


const actions = {
  async [Actions.FETCH_REQUEST_BY_ID]({ getters, commit, rootGetters }, id) {
    if (!getters.getRequestById(id)) {
      const response = await request(`/api/flow/v1/requests/${id}`, { commit, rootGetters });
      if (response.ok) {
        commit(Mutations.ADD_REQUEST, await response.json());
      }
    }
  },
  async [Actions.FETCH_RESPONSE_BY_ID]({ getters, commit, rootGetters }, id) {
    if (!getters.getResponseById(id)) {
      const response = await request(`/api/flow/v1/responses/${id}`, { commit, rootGetters });
      if (response.ok) {
        commit(Mutations.ADD_RESPONSE, await response.json());
      }
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
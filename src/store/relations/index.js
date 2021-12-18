import { Actions, Mutations } from '../types';
import request from '../request';

const state = () => {
  return {
    relations: []
  }
}

const getters = {
  getRelations: (state) => () => {
    return state.relations;
  }
}

const mutations = {
  [Mutations.ADD_RELATIONS](state, { relations }) {
    state.relations = relations;
  }
};

const actions = {
  async [Actions.FETCH_RELATIONS]({ commit, getters, rootGetters }) {
    if (getters.getRelations().length === 0) {
      const response = await request(`/api/flow/v1/relations`, { commit, rootGetters });
      if (response.ok) {
        commit(Mutations.ADD_RELATIONS, {
          relations: await response.json()
        });
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
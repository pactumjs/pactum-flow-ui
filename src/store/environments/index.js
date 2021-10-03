import { Actions, Mutations } from '../types';

const state = () => {
  return {
    selected: 'latest',
    environments: []
  }
}

const getters = {
  getSelectedEnvironment: (state) => () => {
    return state.selected;
  },
  getEnvironments: (state) => () => {
    return state.environments;
  },
  getEnvironmentById: (state) => (id) => {
    return state.environments.find(environment => environment._id === id);
  },
  getProjectAnalysisIdByEnvironment: (state) => (env, project) => {
    const reqEnv = state.environments.find(environment => environment._id === env);
    if (reqEnv) {
      return reqEnv.projects[`${project}`];
    }
    return null;
  }
}

const mutations = {
  [Mutations.ASSIGN_ENVIRONMENTS](state, environments) {
    state.environments = environments;
  },
  [Mutations.UPDATE_ENVIRONMENT](state, environment) {
    state.selected = environment;
  }
};

const actions = {
  async [Actions.FETCH_ENVIRONMENTS]({ commit, state, rootGetters }) {
    if (state.environments.length === 0) {
      const response = await fetch(`/api/flow/v1/environments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': rootGetters.getToken()
        }
      });
      if (response.ok) {
        commit(Mutations.ASSIGN_ENVIRONMENTS, await response.json());
      }
    }
  },
  async [Actions.CHANGE_ENVIRONMENT]({ commit, state }, env) {
    if (state.selected !== env) {
      commit(Mutations.UPDATE_ENVIRONMENT, env);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
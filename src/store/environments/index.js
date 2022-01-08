import { Actions, Mutations } from '../types';
import request from '../request';

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
    return state.environments.filter(_env => _env.name === id);
  },
  getProjectAnalysisIdByEnvironment: (state) => (env, project) => {
    const env_project = state.environments.find(_env => _env.name === env && _env.projectId === project);
    if (env_project) {
      return env_project.analysisId;
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
      const response = await request('/api/flow/v1/environments', { commit, rootGetters });
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
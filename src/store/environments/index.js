import { Actions, Mutations } from '../types';

const state = () => {
  return {
    environments: []
  }
}

const getters = {
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
  }
};

const actions = {
  async [Actions.FETCH_ENVIRONMENTS]({ commit, state }) {
    if (state.environments.length === 0) {
      const response = await fetch(`/api/flow/v1/environments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        commit(Mutations.ASSIGN_ENVIRONMENTS, await response.json());
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
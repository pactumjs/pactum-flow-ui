import { Actions, Mutations } from '../types';

const state = () => {
  return {
    projects: []
  }
}

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find(_project => _project._id === id);
  }
}

const mutations = {
  [Mutations.ADD_PROJECT](state, project) {
    state.projects.push(project);
  }
}

const actions = {
  async [Actions.FETCH_PROJECT_BY_ID]({ commit }, id) {
    const response = await fetch(`/api/flow/v1/projects/${id}`);
    const project = await response.json();
    commit(Mutations.ADD_PROJECT, project);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
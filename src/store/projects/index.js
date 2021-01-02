import { Actions, Mutations } from '../types';

const state = () => {
  return {
    projects: [],
    allProjectsFetched: false
  }
}

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find(_project => _project._id === id);
  }
}

const mutations = {
  [Mutations.ASSIGN_PROJECTS](state, projects) {
    state.projects = projects;
    state.allProjectsFetched = true;
  },
  [Mutations.ADD_PROJECT](state, project) {
    state.projects.push(project);
  }
}

const actions = {
  async [Actions.FETCH_PROJECTS]({ commit, state }) {
    if (!state.allProjectsFetched) {
      const response = await fetch(`/api/flow/v1/projects`);
      const projects = await response.json();
      commit(Mutations.ASSIGN_PROJECTS, projects);
    }
  },
  async [Actions.FETCH_PROJECT_BY_ID]({ commit, getters }, id) {
    if (!getters.getProjectById(id)) {
      const response = await fetch(`/api/flow/v1/projects/${id}`);
      const project = await response.json();
      commit(Mutations.ADD_PROJECT, project);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
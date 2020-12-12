import { Actions, Mutations } from '../types';

const state = () => {
  return {
    projects: [],
    selectedMenu: 'overview'
  }
}

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find(_project => _project._id === id);
  }
}

const mutations = {
  [Mutations.STORE_PROJECTS](state, projects) {
    state.projects = projects;
  },
  [Mutations.ADD_PROJECT](state, project) {
    state.projects.push(project);
  },
  [Mutations.SELECT_PROJECT_MENU](state, menu) {
    state.selectedMenu = menu;
  }
}

const actions = {
  async [Actions.FETCH_PROJECTS]({ commit }) {
    const response = await fetch('/api/flow/v1/projects');
    const projects = await response.json();
    commit(Mutations.STORE_PROJECTS, projects);
  },
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
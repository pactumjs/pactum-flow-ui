import { Actions, Mutations } from '../types';

const state = () => {
  return {
    projects: []
  }
}

const mutations = {
  [Mutations.STORE_PROJECTS](state, projects) {
    state.projects = projects;
  }
}

const actions = {
  async [Actions.FETCH_PROJECTS]({ commit }) {
    const response = await fetch('/api/flow/v1/project');
    const projects = await response.json();
    commit(Mutations.STORE_PROJECTS, projects);
  }
}

export default {
  state,
  mutations,
  actions
}
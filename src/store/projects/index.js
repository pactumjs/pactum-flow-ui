export default {
  state: () => {
    return {
      projects: []
    }
  },
  mutations: {
    GET_PROJECTS(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    async getProjects({ commit }) {
      const response = await fetch('/api/flow/v1/project');
      const projects = await response.json();
      commit('GET_PROJECTS', projects);
    }
  }
}
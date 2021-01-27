import { Actions, Mutations } from '../types';

const state = () => {
  return {
    compatibilities: [],
    projects: []
  }
}

const getters = {
  getCompatibilityByProject: (state) => (project) => {
    return state.compatibilities.filter(cty => {
      return cty.consumer === project || cty.provider === project;
    });
  }
}

const mutations = {
  [Mutations.ADD_COMPATIBILITIES](state, data) {
    state.projects = state.projects.concat(data.project);
    const filtered = data.compatibilities.filter(cc => {
      return !state.compatibilities.find(sc => sc._id === cc._id);
    });
    state.compatibilities = state.compatibilities.concat(filtered);
  }
};

const actions = {
  async [Actions.FETCH_COMPATIBILITIES_BY_PROJECT]({ state, commit }, project ) {
    if (!state.projects.includes(project)) {
      const response = await fetch(`/api/flow/v1/compatibility?projectId=${project}`);
      commit(Mutations.ADD_COMPATIBILITIES, { project, compatibilities: await response.json() });
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
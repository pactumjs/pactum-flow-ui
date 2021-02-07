import { Actions, Mutations } from '../types';

const state = () => {
  return {
    compatibilities: []
  }
}

const getters = {
  getCompatibilityByProjectVersion: (state) => (project, version) => {
    return state.compatibilities.filter(cty => {
      return (cty.consumer === project && cty.consumerVersion === version) || (cty.provider === project && cty.providerVersion === version);
    });
  }
}

const mutations = {
  [Mutations.ADD_COMPATIBILITIES](state, compatibilities) {
    const filtered = compatibilities.filter(cc => {
      return !state.compatibilities.find(sc => sc._id === cc._id);
    });
    state.compatibilities = state.compatibilities.concat(filtered);
  }
};

const actions = {
  async [Actions.FETCH_COMPATIBILITIES_BY_PROJECT_VERSION]({ commit }, { project, version }) {
    const response = await fetch(`/api/flow/v1/compatibility?projectId=${project}&version=${version}`);
    if (response.ok) {
      commit(Mutations.ADD_COMPATIBILITIES, await response.json());
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
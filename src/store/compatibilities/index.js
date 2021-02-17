import { Actions, Mutations } from '../types';

const state = () => {
  return {
    compatibilities: [],
    loadedProjectVersions: []
  }
}

const getters = {
  getCompatibilityByProjectVersion: (state) => (project, version) => {
    return state.compatibilities.filter(cty => {
      return (cty.consumer === project && cty.consumerVersion === version) || (cty.provider === project && cty.providerVersion === version);
    });
  },
  getCompatibilityByConsumerProviderVersions: (state) => (consumer, consumerVersion, provider, providerVersion) => {
    return state.compatibilities.find(cty => {
      return cty.consumer === consumer && cty.consumerVersion === consumerVersion && cty.provider === provider && cty.providerVersion === providerVersion;
    });
  }
}

const mutations = {
  [Mutations.ADD_COMPATIBILITIES](state, { compatibilities, project, version }) {
    state.loadedProjectVersions.push(`${project}::${version}`);
    const filtered = compatibilities.filter(cc => {
      return !state.compatibilities.find(sc => sc._id === cc._id);
    });
    state.compatibilities = state.compatibilities.concat(filtered);
  }
};

const actions = {
  async [Actions.FETCH_COMPATIBILITIES_BY_PROJECT_VERSION]({ commit, state }, { project, version }) {
    if (!state.loadedProjectVersions.includes(`${project}::${version}`)) {
      const response = await fetch(`/api/flow/v1/compatibility?projectId=${project}&version=${version}`);
      if (response.ok) {
        commit(Mutations.ADD_COMPATIBILITIES, {
          project,
          version,
          compatibilities: await response.json()
        });
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
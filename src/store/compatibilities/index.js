import { Actions, Mutations } from '../types';
import request from '../request';

function getKey({ consumer, consumerVersion, provider, providerVersion }) {
  let key = consumer;
  if (consumerVersion) key = key + `-${consumerVersion}`;
  key = key + `::${provider}`;
  if (providerVersion) key = key + `-${providerVersion}`;
  return key;
}

const state = () => {
  return {
    compatibilities: [],
    // list of loaded providers & consumers used to avoid duplicate requests
    keys: []
  }
}

const getters = {
  getCompatibilityResults: (state) => ({ consumer, consumerVersion, provider, providerVersion }) => {
    return state.compatibilities.filter(cty => {
      let result = true;
      if (consumer && (cty.consumer !== consumer)) result = false;
      if (consumerVersion && (cty.consumerVersion !== consumerVersion)) result = false;
      if (provider && (cty.provider !== provider)) result = false;
      if (providerVersion && (cty.providerVersion !== providerVersion)) result = false;
      return result;
    });
  }
}

const mutations = {
  [Mutations.ADD_COMPATIBILITIES](state, { consumer, consumerVersion, provider, providerVersion, compatibilities }) {
    const filtered = compatibilities.filter(cc => {
      return !state.compatibilities.find(sc => sc._id === cc._id);
    });
    state.keys.push(getKey({ consumer, consumerVersion, provider, providerVersion }));
    state.compatibilities = state.compatibilities.concat(filtered);
  }
};

const actions = {
  async [Actions.FETCH_COMPATIBILITIES]({ commit, state, getters, rootGetters }, { consumer, consumerVersion, provider, providerVersion }) {
    const key = getKey({ consumer, consumerVersion, provider, providerVersion });
    if (!state.keys.includes(key)) {
      if (consumerVersion && providerVersion) {
        const results = getters.getCompatibilityResults({ consumer, consumerVersion, provider, providerVersion });
        if (results.length !== 0) {
          return;
        }
      }
      let qs = '';
      if (consumerVersion) qs = qs + `&consumerVersion=${consumerVersion}`;
      if (providerVersion) qs = qs + `&providerVersion=${providerVersion}`;
      const response = await request(`/api/flow/v1/compatibility?consumer=${consumer}&provider=${provider}${qs}`, { commit, rootGetters });
      if (response.ok) {
        commit(Mutations.ADD_COMPATIBILITIES, {
          consumer, consumerVersion, provider, providerVersion,
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
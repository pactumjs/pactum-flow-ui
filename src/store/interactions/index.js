import { Actions, Mutations } from '../types';
import request from '../request';

const state = () => {
  return {
    interactions: [],
    loadedAnalyses: []
  }
}

const getters = {
  getInteractionById: (state) => (id) => {
    return state.interactions.find(_interaction => _interaction._id === id);
  },
  getInteractionsByIds: (state) => (ids) => {
    const set = new Set(ids);
    return state.interactions.filter(_interaction => set.has(_interaction._id));
  },
  getInteractionsByAnalysisId: (state) => (id) => {
    return state.interactions.filter(_interaction => _interaction.analysisId === id);
  },
}

const mutations = {
  [Mutations.ADD_INTERACTIONS](state, interactions) {
    const filtered = interactions.filter(interaction => {
      return !state.interactions.find(_interaction => {
        return _interaction._id === interaction._id;
      })
    });
    state.interactions = state.interactions.concat(filtered);
  },
  [Mutations.ADD_INTERACTION](state, interaction) {
    state.interactions.push(interaction);
  },
  [Mutations.ADD_ANALYSIS_TO_LOADED_INTERACTIONS](state, id) {
    state.loadedAnalyses.push(id);
  }
};

const actions = {
  async [Actions.FETCH_INTERACTIONS_BY_ANALYSIS_ID]({ commit, state, rootGetters }, id) {
    if (!state.loadedAnalyses.includes(id)) {
      const response = await request(`/api/flow/v1/interactions?analysisId=${id}`, { rootGetters, commit });
      if (response.ok) {
        commit(Mutations.ADD_INTERACTIONS, await response.json());
        commit(Mutations.ADD_ANALYSIS_TO_LOADED_INTERACTIONS, id);
      }
    }
  },
  async [Actions.FETCH_INTERACTION_BY_ID]({ getters, commit, rootGetters }, id) {
    if (!getters.getInteractionById(id)) {
      const response = await request(`/api/flow/v1/interactions/${id}`, { rootGetters, commit });
      if (response.ok) {
        commit(Mutations.ADD_INTERACTION, await response.json());
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
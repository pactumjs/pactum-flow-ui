import { Mutations, Actions } from '../../types';

const state = () => {
  return {
    loadingInteraction: false
  }
}

const mutations = {
  [Mutations.LOADING_INTERACTION](state, status) {
    state.loadingInteraction = status;
  }
}

const actions = {
  async [Actions.LOAD_INTERACTION_PAGE_VIEW]({ dispatch, commit, rootGetters }, id) {
    try {
      commit(Mutations.LOADING_INTERACTION, true);
      await Promise.all([
        dispatch(Actions.FETCH_INTERACTION_BY_ID, id),
        dispatch(Actions.FETCH_REQUEST_BY_ID, id),
        dispatch(Actions.FETCH_RESPONSE_BY_ID, id)
      ]);
      const interaction = rootGetters.getInteractionById(id);
      if (interaction) {
        await Promise.all([
          dispatch(Actions.FETCH_ANALYSIS_BY_ID, interaction.analysisId),
          dispatch(Actions.FETCH_ENVIRONMENTS),
          dispatch(Actions.FETCH_PROJECT_BY_ID, interaction.provider),
          dispatch(Actions.FETCH_ANALYSES_BY_PROJECT, interaction.provider)
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(Mutations.LOADING_INTERACTION, false);
    }
  }
}

export default {
  state,
  mutations,
  actions
}
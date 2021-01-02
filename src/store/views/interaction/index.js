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
  async [Actions.LOAD_INTERACTION_PAGE_VIEW]({ dispatch, commit }, id) {
    try {
      commit(Mutations.LOADING_INTERACTION, true);
      await Promise.all([
        dispatch(Actions.FETCH_INTERACTION_BY_ID, id),
        dispatch(Actions.FETCH_REQUEST_BY_ID, id),
        dispatch(Actions.FETCH_RESPONSE_BY_ID, id)
      ]);
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
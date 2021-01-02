import { Mutations, Actions } from '../../types';

const state = () => {
  return {
    loadingFlow: false
  }
}

const mutations = {
  [Mutations.LOADING_FLOW](state, status) {
    state.loadingFlow = status;
  }
}

const actions = {
  async [Actions.LOAD_FLOW_PAGE_VIEW]({ dispatch, commit }, fid) {
    try {
      commit(Mutations.LOADING_FLOW, true);
      await Promise.all([
        dispatch(Actions.FETCH_FLOW_BY_ID, fid),
        dispatch(Actions.FETCH_REQUEST_BY_ID, fid),
        dispatch(Actions.FETCH_RESPONSE_BY_ID, fid)
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      commit(Mutations.LOADING_FLOW, false);
    }
  }
}

export default {
  state,
  mutations,
  actions
}
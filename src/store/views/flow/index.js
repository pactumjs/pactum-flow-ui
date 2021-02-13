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
  async [Actions.LOAD_FLOW_PAGE_VIEW]({ dispatch, commit, rootGetters }, id) {
    try {
      commit(Mutations.LOADING_FLOW, true);
      await Promise.all([
        dispatch(Actions.FETCH_FLOW_BY_ID, id),
        dispatch(Actions.FETCH_REQUEST_BY_ID, id),
        dispatch(Actions.FETCH_RESPONSE_BY_ID, id)
      ]);
      const flow = rootGetters.getFlowById(id);
      if (flow) {
        await dispatch(Actions.FETCH_ANALYSIS_BY_ID, flow.analysisId);
      }
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
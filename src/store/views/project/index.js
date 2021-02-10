import { Mutations, Actions } from '../../types';

const state = () => {
  return {
    loadingProject: false
  }
}

const mutations = {
  [Mutations.LOADING_PROJECT](state, status) {
    state.loadingProject = status;
  }
}

const actions = {
  async [Actions.LOAD_PROJECT_PAGE_VIEW]({ rootGetters, dispatch, commit }, { pid, version }) {
    try {
      commit(Mutations.LOADING_PROJECT, true);
      await dispatch(Actions.FETCH_ENVIRONMENTS);
      await dispatch(Actions.FETCH_PROJECT_BY_ID, pid);
      await dispatch(Actions.FETCH_ANALYSES_BY_PROJECT, pid);
      const project = rootGetters.getProjectById(pid);
      if (project) {
        const analysis = rootGetters.getAnalysisByProjectVersion(pid, version);
        const aid = analysis._id;
        if (analysis) {
          await dispatch(Actions.FETCH_ANALYSIS_METRICS_BY_ID, aid);
          await dispatch(Actions.FETCH_FLOWS_BY_ANALYSIS_ID, aid);
          await dispatch(Actions.FETCH_INTERACTIONS_BY_ANALYSIS_ID, aid);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(Mutations.LOADING_PROJECT, false);
    }

  }
}

export default {
  state,
  mutations,
  actions
}
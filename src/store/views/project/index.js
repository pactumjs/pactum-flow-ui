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
      await Promise.all([
        dispatch(Actions.FETCH_ENVIRONMENTS),
        dispatch(Actions.FETCH_PROJECT_BY_ID, pid),
        dispatch(Actions.FETCH_ANALYSES_BY_PROJECT, pid)
      ]);
      const project = rootGetters.getProjectById(pid);
      if (project) {
        const analysis = rootGetters.getAnalysisByProjectVersion(pid, version);
        if (analysis) {
          const aid = analysis._id;
          await Promise.all([
            dispatch(Actions.FETCH_ANALYSIS_METRICS_BY_ID, aid),
            dispatch(Actions.FETCH_FLOWS_BY_ANALYSIS_ID, aid),
            dispatch(Actions.FETCH_INTERACTIONS_BY_ANALYSIS_ID, aid),
            dispatch(Actions.FETCH_QUALITY_GATE_STATUS_BY_PROJECT_VERSION, {
              project: pid,
              version: analysis.version
            })
          ]);
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
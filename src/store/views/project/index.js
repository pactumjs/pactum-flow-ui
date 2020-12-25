import { Actions } from '../../types';

const state = () => {
  return {}
}

const mutations = {}

const actions = {
  async [Actions.LOAD_PROJECT_VIEW_PAGE]({ rootState, dispatch }, pid) {
    let project = rootState.projects.projects.find(_project => _project._id === pid);
    if (!project) {
      await dispatch(Actions.FETCH_PROJECT_BY_ID, pid);
      project = rootState.projects.projects.find(_project => _project._id === pid);
    }
    if (!project) {
      // project not found error
      return;
    }
    const main = project.analysis.main;
    if (!(main.length > 0)) {
      // main analyses not found
      return;
    }
    const aid = main[main.length - 1];
    let analysesMetrics = rootState.analysis.analysesMetrics.find(_analysis => _analysis._id === aid);
    if (!analysesMetrics) {
      await dispatch(Actions.FETCH_ANALYSIS_METRICS_BY_ID, aid);
    }
    let analysis = rootState.analysis.analysis.find(_analysis => _analysis._id === aid);
    if (!analysis) {
      await dispatch(Actions.FETCH_ANALYSIS_BY_ID, aid);
      analysis = rootState.analysis.analysis.find(_analysis => _analysis._id === aid);
    }
    if (!analysis) {
      // analysis not found error.
      return;
    }
    // dynamically load flows
    await dispatch(Actions.FETCH_FLOWS_BY_IDS, analysis.flows);
    // dynamically load interactions
    await dispatch(Actions.FETCH_INTERACTIONS_BY_IDS, analysis.interactions);
  }
}

export default {
  state,
  mutations,
  actions
}
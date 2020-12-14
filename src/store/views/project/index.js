import { Actions, Mutations } from '../../types';

const state = () => {
  return {
    selectedMenuItem: 'overview'
  }
}

const mutations = {
  [Mutations.SELECT_SIDE_MENU_PROJECT_VIEW_PAGE](state, menuItem) {
    state.selectedMenuItem = menuItem;
  }
}

const actions = {
  async [Actions.LOAD_PROJECT_VIEW_PAGE]({ rootState, dispatch }, pid) {
    let project = rootState.projects.projects.find(_project => _project._id === pid);
    if (!project) {
      await dispatch(Actions.FETCH_PROJECT_BY_ID, pid);
      project = rootState.projects.projects.find(_project => _project._id === pid);
    }
    if (project) {
      const main = project.analysis.main;
      if (main.length > 0) {
        const aid = main[main.length - 1];
        let analysis = rootState.analysis.analysis.find(_analysis => _analysis._id === aid);
        if (!analysis) {
          await dispatch(Actions.FETCH_ANALYSIS_BY_ID, aid);
          analysis = rootState.analysis.analysis.find(_analysis => _analysis._id === aid);
        }
        if (analysis && analysis.flows.length > 0) {
          await dispatch(Actions.FETCH_FLOWS_BY_IDS, analysis.flows);
        } else {
          // analysis not found error.
        }
      }
    } else {
      // project not found error.
    }
  },
  async [Actions.SELECT_SIDE_MENU_PROJECT_VIEW_PAGE]({ commit }, menuItem) {
    commit(Mutations.SELECT_SIDE_MENU_PROJECT_VIEW_PAGE, menuItem);
  }
}

export default {
  state,
  mutations,
  actions
}
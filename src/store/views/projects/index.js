import { Actions, Mutations } from '../../types';

const state = () => {
  return {
    loadingProjects: false,
    error: ''
  }
}

const mutations = {
  [Mutations.LOADING_PROJECTS](state, status) {
    state.loadingProjects = status;
  }
}

const actions = {
  async [Actions.LOAD_PROJECTS_PAGE_VIEW]({ commit, dispatch, rootGetters }) {
    try {
      commit(Mutations.LOADING_PROJECTS, true);
      await dispatch(Actions.FETCH_ENVIRONMENTS);
      await dispatch(Actions.FETCH_PROJECTS);
      const env = rootGetters.getEnvironmentById(rootGetters.getSelectedEnvironment());
      if (env) {
        const analysesIds = Object.values(env.projects);
        await dispatch(Actions.FETCH_ANALYSES_BY_IDS, analysesIds);
      }
    } catch (error) {
      console.log(error);
    } finally {
      commit(Mutations.LOADING_PROJECTS, false);
    }
  }
}

export default {
  state,
  mutations,
  actions
}
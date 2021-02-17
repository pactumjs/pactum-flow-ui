import { Actions } from '../../types';

const actions = {
  async [Actions.LOAD_MATRIX_PAGE_VIEW]({ dispatch, rootGetters }) {
    await Promise.all([
      dispatch(Actions.FETCH_PROJECTS),
      dispatch(Actions.FETCH_ENVIRONMENTS)
    ]);
    const envs = rootGetters.getEnvironments();
    for (let i = 0; i < envs.length; i++) {
      const env = envs[i];
      const analysesIds = Object.values(env.projects);
      await dispatch(Actions.FETCH_ANALYSES_BY_IDS, analysesIds);
    }
  }
}

export default {
  actions
}
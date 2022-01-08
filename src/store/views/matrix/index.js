import { Actions } from '../../types';

const actions = {
  async [Actions.LOAD_MATRIX_PAGE_VIEW]({ dispatch, rootGetters }) {
    await Promise.all([
      dispatch(Actions.FETCH_PROJECTS),
      dispatch(Actions.FETCH_ENVIRONMENTS)
    ]);
    const envs = rootGetters.getEnvironments();
    const analysisIds = envs.map(_env => _env.analysisId);
    await dispatch(Actions.FETCH_ANALYSES_BY_IDS, analysisIds);
  }
}

export default {
  actions
}
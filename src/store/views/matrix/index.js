import { Actions } from '../../types';

const actions = {
  async [Actions.LOAD_MATRIX_PAGE_VIEW]({ dispatch }) {
    await dispatch(Actions.FETCH_PROJECTS);
  }
}

export default {
  actions
}
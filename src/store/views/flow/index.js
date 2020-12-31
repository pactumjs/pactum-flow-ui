import { Actions } from '../../types';

const actions = {
  async [Actions.LOAD_FLOW_PAGE_VIEW]({ rootState, dispatch }, fid) {
    const flow = rootState.flows.flows.find(_flow => _flow._id === fid);
    if (!flow) {
      dispatch(Actions.FETCH_FLOW_BY_ID, fid);
    }
    const request = rootState.exchange.requests.find(request => request._id === fid);
    if (!request) {
      dispatch(Actions.FETCH_REQUEST_BY_ID, fid);
    }
    const response = rootState.exchange.responses.find(response => response._id === fid);
    if (!response) {
      dispatch(Actions.FETCH_RESPONSE_BY_ID, fid);
    }
  }
}

export default {
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    user: null,
    token: null
  }
}

const getters = {
  isAuthenticated: state => state.user && state.token,
  getUser: state => state.user,
  getToken: state => () => state.token
}

const mutations = {
  [Mutations.SAVE_SESSION](state, userSession) {
    state.user = userSession['username'];
    state.token = userSession['token'];
  },
  [Mutations.INVALIDATE_SESSION](state) {
    state.user = null;
    state.token = null;
  }
};

const actions = {
  async [Actions.LOGIN]({ commit }, userCreds) {
    const buff = Buffer.from(`${userCreds.username}:${userCreds.password}`);
    const base64data = buff.toString('base64');
    const response = await fetch('/api/flow/captain/v1/session', {
      method: 'POST',
      headers: {
        'authorization': 'Basic ' + base64data
      },
    });
    const userSession = await response.json();
    if (!response.ok) {
      return Promise.reject(new Error(response.status));
    }
    commit(Mutations.SAVE_SESSION, userSession);
    return Promise.resolve(response.status);
  },

  async [Actions.LOGOUT]({ commit }) {
    commit(Mutations.INVALIDATE_SESSION);
    localStorage.clear();
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
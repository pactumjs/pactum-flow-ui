import { Actions, Mutations } from '../types';

const state = () => {
  return {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
  }
}

const getters = {
  isAuthenticated: state => state.user && state.token,
  getUser: state => state.user,
  getToken: state => () => state.token
}

const mutations = {
  [Mutations.SAVE_SESSION](state, session) {
    state.user = session['username'];
    state.token = session['token'];
    localStorage.setItem('user', state.user);
    localStorage.setItem('token', state.token);
  },
  [Mutations.INVALIDATE_SESSION](state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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
    const session = await response.json();
    if (!response.ok) {
      return Promise.reject(new Error(response.status));
    }
    commit(Mutations.SAVE_SESSION, session);
    return Promise.resolve(response.status);
  },

  async [Actions.LOGOUT]({ commit }) {
    commit(Mutations.INVALIDATE_SESSION);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
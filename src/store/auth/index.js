import { Actions, Mutations } from '../types';

const state = () => {
  return {
    user: null,
    accessToken: null
  }
}

const getters = {
  isAuthenticated: state => !!state.user,
  loggedInUser: state => state.user,
}

const mutations = {
  [Mutations.SAVE_SESSION](state, userSession) {
    state.user = userSession['username'];
    state.accessToken = userSession['sessionToken'];
  },
  [Mutations.INVALIDATE_SESSION](state) {
    state.user = null;
    state.accessToken = null;
  }
};

const actions = {
  async [Actions.LOGIN]({ commit }, userCreds) {
    const buff = new Buffer(`${userCreds.username}:${userCreds.password}`);
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

  async [Actions.LOGOUT]({ state, commit }) {
    const response = await fetch('/api/flow/captain/v1/session?username=' + state.user, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': state.accessToken
      }
    });
    if (!response.ok) {
      return Promise.reject(new Error(response.status));
    }
    commit(Mutations.INVALIDATE_SESSION);
    return Promise.resolve(response.status);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    user: null,
    accessToken: null
  }
}

const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
}

const mutations = {
  [Mutations.SAVE_SESSION](state, userSession) {
    console.log("Mutation called")
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
      // if (userSession.SessionToken) {
      //   // store user details and jwt token in local storage to keep user logged in between page refreshes
      //   localStorage.setItem('userSession', JSON.stringify(userSession.SessionToken));
      // }

      if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            await [Actions.LOGOUT]();
            location.reload(true);
        }
      }
      commit(Mutations.SAVE_SESSION, userSession);
  },

  async [Actions.LOGOUT]({ commit }) {
    // remove user from local storage to log user out
    // localStorage.removeItem('userSession');
    commit(Mutations.INVALIDATE_SESSION);
    this.$router.push("/login");
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
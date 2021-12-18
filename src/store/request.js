import { Mutations } from './types';

async function request(url, store, options) {
  options = options || {};
  const headers = options.headers ? options.headers : {}
  headers['X-Session-Token'] = store.rootGetters.getToken();
  headers['Content-Type'] = headers['Content-Type'] ? headers['Content-Type'] : 'application/json';
  options.headers = headers;
  const response = await fetch(url, options);
  if (response.status === 401 || response.status === 403) {
    store.commit(Mutations.INVALIDATE_SESSION);
    window.location.href = '/?#/login';
  }
  return response;
}

export default request;
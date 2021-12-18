import { Actions, Mutations } from '../types';
import request from '../request';

const state = () => {
  return {
    qgs: [],
    loadedProjectVersions: []
  }
}

const getters = {
  getQualityGateByProjectVersion: (state) => (project, version) => {
    return state.qgs.find(qg => {
      return qg.project === project && qg.version === version;
    });
  }
}

const mutations = {
  [Mutations.ADD_QUALITY_GATE_STATUS](state, { gates, project, version }) {
    state.loadedProjectVersions.push(`${project}::${version}`);
    state.qgs.push({ project, version, gates });
  }
};

const actions = {
  async [Actions.FETCH_QUALITY_GATE_STATUS_BY_PROJECT_VERSION]({ commit, state, rootGetters }, { project, version }) {
    if (!state.loadedProjectVersions.includes(`${project}::${version}`)) {
      const response = await request(`/api/flow/v1/quality-gate/status?projectId=${project}&version=${version}`, { commit, rootGetters });
      if (response.ok) {
        commit(Mutations.ADD_QUALITY_GATE_STATUS, {
          project,
          version,
          gates: await response.json()
        });
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
import { Actions, Mutations } from '../types';

const state = () => {
  return {
    analyses: [],
    analysesMetrics: [],
    loadedAnalysesProjects: []
  }
}

const getters = {
  getAnalysisById: (state) => (id) => {
    return state.analyses.find(analysis => analysis._id === id);
  },
  getAnalysisMetricsById: (state) => (id) => {
    return state.analysesMetrics.find(am => am._id === id);
  },
  getAnalysisByProject: (state) => (project) => {
    return state.analyses.filter(analysis => analysis.projectId === project);
  },
  getAnalysisByProjectVersion: (state) => (project, version) => {
    const analyses = state.analyses.filter(analysis => analysis.projectId === project);
    return analyses.find(analysis => analysis.version === version);
  }
}

const mutations = {
  [Mutations.ADD_ANALYSES](state, analyses) {
    state.analyses = state.analyses.concat(analyses);
  },
  [Mutations.ADD_ANALYSIS](state, analysis) {
    state.analyses.push(analysis);
  },
  [Mutations.ADD_ANALYSIS_METRICS](state, metrics) {
    state.analysesMetrics.push(metrics);
  },
  [Mutations.ADD_ANALYSES_BY_PROJECT](state, data) {
    state.loadedAnalysesProjects.push(data.project);
    const filtered = data.analyses.filter(analysis => {
      return !state.analyses.find(_analysis => _analysis._id === analysis._id);
    });
    state.analyses = state.analyses.concat(filtered);
  }
};

const actions = {
  async [Actions.FETCH_ANALYSES_BY_IDS]({ state, commit, rootGetters }, ids) {
    const requiredIds = [];
    for (let i = 0; i < ids.length; i++) {
      if (!state.analyses.find(analysis => analysis._id === ids[i])) {
        requiredIds.push(ids[i])
      }
    }
    if (requiredIds.length > 0) {
      const response = await fetch('/api/flow/v1/search/analyses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': rootGetters.getToken()
        },
        body: JSON.stringify({
          ids: requiredIds
        })
      });
      if (response.ok) {
        commit(Mutations.ADD_ANALYSES, await response.json());
      }
    }
  },
  async [Actions.FETCH_ANALYSIS_BY_ID]({ getters, commit, rootGetters }, id) {
    if (!getters.getAnalysisById(id)) {
      const response = await fetch(`/api/flow/v1/analyses/${id}`, {
        headers: {
          'X-Session-Token': rootGetters.getToken()
        }
      });
      if (response.ok) {
        commit(Mutations.ADD_ANALYSIS, await response.json());
      }
    }
  },
  async [Actions.FETCH_ANALYSIS_METRICS_BY_ID]({ getters, commit, rootGetters }, id) {
    if (!getters.getAnalysisMetricsById(id)) {
      const response = await fetch(`/api/flow/v1/metrics/analyses/${id}`, {
        headers: {
          'X-Session-Token': rootGetters.getToken()
        }
      });
      if (response.ok) {
        commit(Mutations.ADD_ANALYSIS_METRICS, await response.json());
      }
    }
  },
  async [Actions.FETCH_ANALYSES_BY_PROJECT]({ state, commit, rootGetters }, project) {
    if (!state.loadedAnalysesProjects.includes(project)) {
      const response = await fetch(`/api/flow/v1/analyses?projectId=${project}`, {
        headers: {
          'X-Session-Token': rootGetters.getToken()
        }
      });
      if (response.ok) {
        commit(Mutations.ADD_ANALYSES_BY_PROJECT, {project, analyses: await response.json()});
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
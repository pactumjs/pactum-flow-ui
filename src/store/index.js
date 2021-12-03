import Vue from 'vue'
import Vuex from 'vuex'

import ProjectsPageView from './views/projects'
import ProjectPageView from './views/project'
import FlowPageView from './views/flow'
import InteractionPageView from './views/interaction'
import MatrixPageView from './views/matrix'

import Environments from './environments'
import Projects from './projects'
import Analyses from './analyses'
import Interactions from './interactions'
import Flows from './flows'
import Exchange from './exchange'
import Auth from './auth'
import Compatibilities from './compatibilities'
import QualityGate from './qg'
import Relations from './relations'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const modules = {
  Auth,
  ProjectsPageView,
  ProjectPageView,
  FlowPageView,
  InteractionPageView,
  MatrixPageView,
  Environments,
  Projects,
  Analyses,
  Interactions,
  Flows,
  Exchange,
  Compatibilities,
  QualityGate,
  Relations
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
})

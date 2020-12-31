import Vue from 'vue'
import Vuex from 'vuex'

import ProjectsView from './views/projects'
import ProjectView from './views/project'
import FlowPageView from './views/flow'

import Projects from './projects'
import Analysis from './analysis'
import Interactions from './interactions'
import Flows from './flows'
import Exchange from './exchange'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const modules = {
  ProjectsView,
  ProjectView,
  FlowPageView,
  projects: Projects,
  analysis: Analysis,
  interactions: Interactions,
  flows: Flows,
  exchange: Exchange
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})

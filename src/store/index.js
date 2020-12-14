import Vue from 'vue'
import Vuex from 'vuex'

import ProjectsView from './views/projects'
import ProjectView from './views/project'

import Projects from './projects'
import Analysis from './analysis'
import Flows from './flows'

Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const modules = {
  ProjectsView,
  ProjectView,
  projects: Projects,
  analysis: Analysis,
  flows: Flows
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules
})

import { getDictionary, getOrganTree } from '@/api/systemApi.js'
import { interArrayTree } from '@/utils'

const state = {
  dictionary: {},
  organTree: {}
}

const mutations = {
  SET_DICTIONARY: (state, dictionary) => {
    state.data = dictionary
  },
  SET_ORGANTREE: (state, tree) => {
    state.organTree = tree
    localStorage.setItem('organ', JSON.stringify(tree))
  }
}

const actions = { 
  getDictionary({ commit }) {

  },
  async ['getOrganTree']({ commit }) {
    try {
      let treeData = await getOrganTree()
      commit('SET_ORGANTREE', interArrayTree(treeData.data))
      return treeData
    } catch(err) {
      return new Error()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
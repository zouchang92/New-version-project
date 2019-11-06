import { getDictionary, getOrganTree } from '@/api/systemApi.js'

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
  }
}

const actions = { 
  getDictionary({ commit }) {

  },
  async ['getOrganTree']({ commit }) {
    try {
      let treeData = await getOrganTree()
    } catch(err) {

    }
    return new Promise((resolve, reject) => {
      getOrganTree.then(res => {
        commit('SET_ORGANTREE', res)
        resolve()
      }).catch(err => {
        reject()
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
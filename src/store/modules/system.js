import { getDictionary, getOrganTree } from '@/api/systemApi'
import { listMenuTree } from '@/api/menuManageApi'
import { interArrayTree } from '@/utils'
import _ from 'lodash'

const state = {
  dictionary: {},
  organTree: {},
  menuTree: [],
}

const mutations = {
  SET_DICTIONARY: (state, dictionary) => {
    state.data = dictionary
    localStorage.setItem('dictionary', JSON.stringify(dictionary))
  },
  SET_ORGANTREE: (state, tree) => {
    state.organTree = tree
    localStorage.setItem('organ', JSON.stringify(tree))
  },
  SET_MENUTREE: (state, tree) => {
    state.menuTree = tree
    localStorage.setItem('menu', JSON.stringify(tree))
  }
}

const actions = { 
  async ['getDictionary']({ commit }) {
    try {
      let dictonary = await getDictionary()
      let groupDictionary = _.chain(dictonary.data).map(n => ({...n, label: n.name, value: n.code})).groupBy(n => (n.dictId)).value()
      commit('SET_DICTIONARY', groupDictionary)
      return dictonary
    } catch(err) {
      throw new Error()
    }
  },
  async ['getOrganTree']({ commit }) {
    try {
      let treeData = await getOrganTree()
      commit('SET_ORGANTREE', interArrayTree(treeData.data))
      return treeData
    } catch(err) {
      throw new Error()
    }
  },
  async ['getMenuTree']({ commit }) {
    try {
      let treeData = await listMenuTree()
      commit('SET_MENUTREE', interArrayTree(treeData.data))
      return interArrayTree(treeData.data)
    } catch(err) {
      throw new Error()
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
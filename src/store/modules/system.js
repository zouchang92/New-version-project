import { getDictionary, getOrganTree } from '@/api/systemApi'
import { listMenuTree } from '@/api/menuManageApi'
import { getUserMenu } from '@/api/userApi'
import { interArrayTree } from '@/utils'
import _ from 'lodash'

const state = {
  dictionary: {},
  organTree: {},
  menuTree: [],
}

function toTree(data) {
  _.forEach(data, n => {
    delete n.children
  })
  let map = {}
  _.forEach(data, n => {
    map[n.menuId] = n
  })
  let val = []
  _.forEach(data, n => {
    let parent = map[n.parentId]
    if (parent) {
      (parent.children || ( parent.children = [] )).push(n)
    } else {
      val.push(n)
    }
  })
  return val
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
      let groupDictionary = _.chain(dictonary.data).map(n => ({...n, label: n.name, value: n.code})).groupBy(n => (n.uniqueName)).value()
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
      let data = await getUserMenu()
      let res = JSON.parse(data.data).find(n => n.menuId === 'root')
      let menu = res ? res.children : []
      commit('SET_MENUTREE', menu)
      return menu
    } catch(err) {
      alert('error')
      throw new Error(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
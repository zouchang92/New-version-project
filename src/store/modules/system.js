import { getDictionary, getOrganTree } from '@/api/systemApi'
import { getUserMenu } from '@/api/userApi'
import { interArrayTree, generateDateAxis } from '@/utils'
import _ from 'lodash'
import moment from 'moment'


const state = {
  dictionary: {},
  organTree: {},
  menuTree: [],
}

function getRecentYears() {
  return generateDateAxis({
    type: '年',
    start: moment(),
    length: 4,
    target: 'YYYY',
  }).map((n, i) => ({
    value: n,
    label: n + '年'
  }))
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
      let dictionary = await getDictionary()
      if (dictionary.data.length) {
        
        let groupDictionary = _.chain(dictionary.data).map(n => ({...n, label: n.name, value: n.code})).groupBy(n => (n.uniqueName)).value()
        groupDictionary.year = getRecentYears()
        commit('SET_DICTIONARY', groupDictionary)
        return dictionary
      }
    } catch(err) {
      console.log(err)
      throw new Error(err)
    }
  },
  async ['getOrganTree']({ commit }) {
    try {
      let treeData = await getOrganTree()
      commit('SET_ORGANTREE', interArrayTree(treeData.data))
      return treeData
    } catch(err) {
      throw new Error(err)
    }
  },
  async ['getMenuTree']({ commit }) {
    try {
      let data = await getUserMenu()
      let res = JSON.parse(data.data)
      let menu = res ? res.filter(n => n.belongSystem === '0') : []
      commit('SET_MENUTREE', menu)
      return menu
    } catch(err) {
      console.log(err)
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
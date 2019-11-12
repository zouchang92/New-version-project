import { login, logout, getInfo } from '@/api/userApi'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  credNum: '', 
  gender: '',
  id: '', 
  loginName: '', 
  phone: '', 
  photo: '', 
  token: getToken(), 
  userName: '',
  roles: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  LOGOUT: (state) => {
    state.credNum = ''
    state.gender = ''
    state.id = ''
    state.loginName = ''
    state.phone = ''
    state.photo = ''
    state.token = ''
    state.userName = '',
    state.roles = ''
  },
  SET_USERINFO: (state, userInfo) => {
    const { credNum, gender, id, loginName, phone, photo, token, userName } = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    state.userName = userName
    state.token = token
    state.photo = photo
    state.loginName = loginName
    state.phone = phone
    state.credNum = credNum
    state.gender = gender
    state.id = id
  }
}

const actions = {
  // user login
  async login({ commit, dispatch }, userInfo) {
    const { loginName, password } = userInfo
    try {
      let loginInfo = await login({ loginName: loginName.trim(), password: password })
      const { data } = loginInfo
      let routes = await dispatch('loginAction', data)
      return routes
    } catch(err) {
      console.log(err)
    }
  },
  async loginAction({ commit, dispatch }, userInfo) {
    try {
      let organTree = await dispatch('system/getOrganTree', {}, {root: true})
      let menuTree = await dispatch('system/getMenuTree', {}, {root: true})
      let dictionary = await dispatch('system/getDictionary', {}, {root: true})
      commit('SET_USERINFO', userInfo)
      let routes = await dispatch('permission/generateRoutes', { roles: [], routerMap: menuTree }, {root: true})
      setToken(userInfo.token)
      return routes
    } catch(err) {
      console.log(err)
    }

  },
  // get user info
  async getInfo({ dispatch, commit, state }) {
    let userInfo = localStorage.getItem('userInfo')
    try {
      let routes = await dispatch('loginAction', JSON.parse(userInfo))
      return routes
    } catch(err) {
      console.log(err)
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('LOGOUT')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


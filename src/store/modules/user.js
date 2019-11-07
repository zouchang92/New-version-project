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
      dispatch('system/getOrganTree', {}, {root: true})
      commit('SET_USERINFO', data)
      setToken(data.token)
      return data
    } catch(err) {

    }
  },

  // get user info
  async getInfo({ dispatch, commit, state }) {
    let userInfo = localStorage.getItem('userInfo')
    try {
      if (userInfo) {
        commit('SET_USERINFO', JSON.parse(userInfo))
      }
      await dispatch('system/getOrganTree', {}, { root: true })
      resolve()
    } catch(err) {

    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
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


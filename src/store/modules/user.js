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
      console.log(data)
      dispatch('system/getOrganTree')
      commit('SET_USERINFO', data)
      setToken(data.token)
      return data
    } catch(err) {

    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', 'Super Admin')
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
      resolve({
        code: '20000',
        data: {
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          introduction: "I am a super administrator",
          name: "Super Admin",
          roles: ['admin']
        }
      })
      /**getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })*/
    })
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


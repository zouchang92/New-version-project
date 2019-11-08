import { asyncRoutes, constantRoutes } from '@/router'
import routerMap from '@/router/router-map'
import _ from 'lodash'
import router from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  _.forEach(routes, route => {
    let tmp = { ...route }
      let targetComponent = routerMap[route.menuUrl]
      tmp = targetComponent
      if (route.children && route.children.length) {
        tmp.meta.name = route.name
        tmp.children = route.children
      }
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    let allRoutes = routes.concat(constantRoutes)
    state.routes = allRoutes
    router.addRoutes(allRoutes)
  }
}

const actions = {
  generateRoutes({ commit }, {roles, routerMap}) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(routerMap, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
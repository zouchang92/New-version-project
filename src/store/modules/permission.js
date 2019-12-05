import { asyncRoutes, constantRoutes } from '@/router'
import routerMap from '@/router/router-map'
import _ from 'lodash'
import { rejects } from 'assert'

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
function filterAsyncRoutes(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    let targetComponent = routerMap[route.menuUrl]
    if (targetComponent) {
      route.meta = { title: route.menuName || '', icon: route.menuIcon || '', button: route.buttonDTOS || [] }
      route.name = targetComponent.name
      route.path = targetComponent.path
      route.component = targetComponent.component
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children)
      }
    } else {
      console.log(route)
      route.path = `/${route.name}`
    }
    return true
  })
  return accessedRouters
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
  }
}

const actions = {
  generateRoutes({ commit }, {roles, routerMap}) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      try {
        accessedRoutes = filterAsyncRoutes(routerMap, roles)
        console.log(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      } catch(err) {
        alert(err)
        reject(err)
      }

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
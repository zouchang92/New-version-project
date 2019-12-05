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
function filterAsyncRoutes(asyncRouterMap, threeMap = {}) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    let targetComponent = routerMap[route.menuUrl]
    if (targetComponent) {
      route.meta = { title: route.menuName || '', icon: route.menuIcon || '', button: route.buttonDTOS || [] }
      route.name = targetComponent.name
      route.path = targetComponent.path
      route.component = targetComponent.component
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, threeMap).accessedRouters
      }
      if (route.threeMenu) {
        threeMap[route.name] = route
        return false
      } else {
        return true
      }
    } else {
      route.path = `/${route.menuName}`
      return true
    }
    
  })
  return {accessedRouters, threeMap}
}

const state = {
  routes: [],
  addRoutes: [],
  thirdMenu: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    const { threeMap, accessedRouters } = routes
    state.addRoutes = accessedRouters
    state.thirdMenu = threeMap
    let allRoutes = accessedRouters.concat(constantRoutes)
    state.routes = allRoutes
  }
}

const actions = {
  generateRoutes({ commit }, {roles, routerMap}) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      try {
        console.log(routerMap)
        accessedRoutes = filterAsyncRoutes(routerMap)
        commit('SET_ROUTES', accessedRoutes)
        console.log(accessedRoutes.accessedRouters)
        resolve(accessedRoutes.accessedRouters)
      } catch(err) {
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
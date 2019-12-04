import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/Classroom',
  //   component: Layout,
  //   redirect: '/Classroom-assessment/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/Classroom-assessment/index'),
  //       name: '/Growth',
  //       meta: { title: '课堂评分', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/ClassEvaluation/Comment/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
     path: '/classPlanDetail',
     component: Layout,
     hidden: true,
     children: [
      {
        path: 'index',
        component: () => import('@/views/class-arrangement-manage/arrange-detail-page'),
        name: 'arrangeDetailPage',
        meta: { title: '排课导航', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/h',
    component: () => import('../components/Calendar/calendar.vue')

  }, {
    path: '/n',
    component: () => import('../components/Calendar/UCalendar.vue')

  }
]

export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

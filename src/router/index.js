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
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    },
    {
      path: '/h',
      component: () => import('@/views/dashboard/Teacher/index')
    }]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/calendar',
  //   component: () => import('../components/Calendar/Calendar.vue')

  // },
  {
    path: '/systemManage',
    component: Layout,
    name: 'systemManage',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [{
      path: 'studentManage',
      name: 'studentManage',
      meta: {
        title: '学生管理',
      },
      component: () => import('@/views/system-manage/student-manage')
    }, {
      path: 'parentManage',
      name: 'parentManage',
      meta: {
        title: '家长管理',
      },
      component: () => import('@/views/system-manage/parent-manage')
    }, {
      path: 'teacherManage',
      name: 'teacherManage',
      meta: {
        title: '老师管理',
      },
      component: () => import('@/views/system-manage/teacher-manage')
    }]
  },
  {
    path: '/testManage',
    component: Layout,
    name: 'testManage',
    alwaysShow: true,
    meta: {
      title: '三级测试',
      icon: 'nested'
    },
    children: [{
      path: '/testManage/testManageSub',
      name: 'testManageSub',
      alwaysShow: true,
      isNavPage: true,
      meta: {
        title: 'xx管理',
        icon: 'nested'
      },
      component: () => import('@/layout/components/ThirdNav'),
      children: [{
        path: '/testManage/testManageSub/testManageSub1',
        name: 'testManageSub1',
        meta: {
          title: 'xxxxx管理',
          navChild: true,
        },
        component: () => import('@/views/system-manage/student-manage'),
      }, {
        path: '/testManage/testManageSub/testManageSub2',
        name: 'testManageSub2',
        
        meta: {
          title: 'xxxxxxx管理',
          navChild: true,
        },
        component: () => import('@/views/system-manage/student-manage'),
      }]
    }]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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

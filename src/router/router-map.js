import Layout from '@/layout'

export default {
  //
  dashboard: {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '我的工作台', icon: 'dashboard', affix: true },
  },
  leaderDashboard: {
    path: 'dashboard',
    name: '我的工作台',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '校长', icon: 'dashboard' }
  },
  teacherDashboard: {
    path: '/Teacher',
    component: () => import('@/views/dashboard/Teacher/index'),
    meta: { title: '教师', icon: 'dashboard' }
  },
  headMasterDashboard: {
    path: '/Headmaster',
    component: () => import('@/views/dashboard/Headmaster/index'),
    meta: { title: '班主任', icon: 'dashboard' }
  },
  studentDashboard: {
    path: '/Student',
    component: () => import('@/views/dashboard/Student/index'),
    meta: { title: '学生', icon: 'dashboard' }
  },
  //
  systemManage: {
    path: '/systemManage',
    component: Layout,
    name: 'systemManage',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
  },
  studentManage: {
    path: 'studentManage',
    name: 'studentManage',
    meta: {
      title: '学生管理',
    },
    component: () => import('@/views/system-manage/student-manage')
  },
  parentManage: {
    path: 'parentManage',
    name: 'parentManage',
    meta: {
      title: '家长管理',
    },
    component: () => import('@/views/system-manage/parent-manage')
  }, 
  teacherManage: {
    path: 'teacherManage',
    name: 'teacherManage',
    meta: {
      title: '老师管理',
    },
    component: () => import('@/views/system-manage/teacher-manage')
  },
  userManage: {
    path: 'userManage',
    name: 'userManage',
    meta: {
      title: '用户管理',
    },
    component: () => import('@/views/system-manage/user-manage')
  },
  organManage: {
    path: 'organManage',
    name: 'organManage',
    meta: {
      title: '组织管理',
    },
    component: () => import('@/views/system-manage/organ-manage')
  },
  roleManage: {
    path: 'roleManage',
    name: 'roleManage',
    meta: {
      title: '角色管理',
    },
    component: () => import('@/views/system-manage/role-manage')
  },
  dictManage: {
    path: 'dictManage',
    name: 'dictManage',
    meta: {
      title: '字典管理',
    },
    component: () => import('@/views/system-manage/dict-manage')
  },
  menuManage: {
    path: 'menuManage',
    name: 'menuManage',
    meta: {
      title: '菜单管理',
    },
    component: () => import('@/views/system-manage/menu-manage')
  },
  //
  moralManage: {
    path: '/moralEducation',
    component: Layout,
    name: 'moralEducation',
    alwaysShow: true,
    meta: {
      title: '德育管理',
      icon: 'nested'
    }
  },
  moralManageHome: {
    path: '/moralEducation/homePage',
    name: 'homePage',
    component: () => import('@/views/moral-education/home-page'),
    meta: {
      title: '德育首页'
    }
  },
  moralEvaluateManage: {
    path: '/moralEducation/moralEvaluate',
    name: 'moralEvaluate',
    component: () => import('@/views/moral-education/moral-evaluate'),
    meta: {
      title: '德育考评'
    }
  },
  //
  teachManage: {
    path: '/teachManage',
    component: Layout,
    name: 'teachManage',
    alwaysShow: true,
    meta: {
      title: '教务管理',
      icon: 'nested'
    },
  },
  courseTimeManage: {
    path: '/teachManage/courseTimeManage',
    name: 'courseTimeManage',
    meta: {
      title: '课表时间',
    },
    component: () => import('@/views/teach-manage/course-time-manage'),
  },
  courseManage: {
    path: '/teachManage/courseManage',
    name: 'courseManage',
    meta: {
      title: '科目管理',
    },
    component: () => import('@/views/teach-manage/course-manage'),
  },
  classManage: {
    path: '/teachManage/classManage',
    name: 'classManage',
    meta: {
      title: '班级管理',
    }
  },
  teacherCourseTable: {
    path: '/teachManage/teacherCourseTable',
    name: 'teacherCourseTable',
    meta: {
      title: '老师课表',
    },
    component: () => import('@/views/teach-manage/teacher-course-table'),
  },
  semesterManage: {
    path: '/teachManage/semesterManage',
    name: 'semesterManage',
    meta: {
      title: '学期管理',
    },
    component: () => import('@/views/teach-manage/semester-manage'),
  },
  classCourseTable: {
    path: '/teachManage/classCourseTable',
    name: 'classCourseTable',
    meta: {
      title: '班级课表',
    },
    component: () => import('@/views/teach-manage/class-course-table'),
  }
}
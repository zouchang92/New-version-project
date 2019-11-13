import Layout from '@/layout'

export default {
  //
  dashboard: {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '我的工作台', icon: 'dashboard', affix: true }
  },
  leaderDashboard: {
    path: 'dashboard',
    name: '我的工作台',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '校长', icon: 'dashboard' }
  },
  teacherDashboard: {
    path: 'Teacher',
    name: 'teacherDashboard',
    component: () => import('@/views/dashboard/Teacher/index'),
    meta: { title: '教师', icon: 'dashboard' }
  },
  headMasterDashboard: {
    path: 'Headmaster',
    name: 'headMasterDashboard',
    component: () => import('@/views/dashboard/Headmaster/index'),
    meta: { title: '班主任', icon: 'dashboard' }
  },
  studentDashboard: {
    name: 'studentDashboard',
    path: 'Student',
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
    }
  },
  studentManage: {
    path: 'studentManage',
    name: 'studentManage',
    meta: {
      title: '学生管理'
    },
    component: () => import('@/views/system-manage/student-manage')
  },
  parentManage: {
    path: 'parentManage',
    name: 'parentManage',
    meta: {
      title: '家长管理'
    },
    component: () => import('@/views/system-manage/parent-manage')
  },
  teacherManage: {
    path: 'teacherManage',
    name: 'teacherManage',
    meta: {
      title: '老师管理'
    },
    component: () => import('@/views/system-manage/teacher-manage')
  },
  userManage: {
    path: 'userManage',
    name: 'userManage',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/system-manage/user-manage')
  },
  organManage: {
    path: 'organManage',
    name: 'organManage',
    meta: {
      title: '组织管理'
    },
    component: () => import('@/views/system-manage/organ-manage')
  },
  roleManage: {
    path: 'roleManage',
    name: 'roleManage',
    meta: {
      title: '角色管理'
    },
    component: () => import('@/views/system-manage/role-manage')
  },
  dictManage: {
    path: 'dictManage',
    name: 'dictManage',
    meta: {
      title: '字典管理'
    },
    component: () => import('@/views/system-manage/dict-manage')
  },
  menuManage: {
    path: 'menuManage',
    name: 'menuManage',
    meta: {
      title: '菜单管理'
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
    path: 'moralHomePage',
    name: 'homePage',
    component: () => import('@/views/moral-education/home-page'),
    meta: {
      title: '德育首页'
    }
  },
  moralEvaluateManage: {
    path: 'moralEvaluate',
    name: 'moralEvaluate',
    component: () => import('@/views/moral-education/moral-evaluate'),
    meta: {
      title: '德育考评'
    }
  },
  moralReport: {
    path: 'moralReport',
    name: 'moralReport',
    component: () => import('@/views/moral-education/moral-report'),
    meta: {
      title: '德育报表'
    }
  },
  moralPoint: {
    path: 'moralPoint',
    name: 'moralPoint',
    component: () => import('@/views/moral-education/moral-point'),
    meta: {
      title: '德育指标'
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
    }
  },
  courseTimeManage: {
    path: 'courseTimeManage',
    name: 'courseTimeManage',
    meta: {
      title: '课表时间'
    },
    component: () => import('@/views/teach-manage/course-time-manage')
  },
  courseManage: {
    path: 'courseManage',
    name: 'courseManage',
    meta: {
      title: '科目管理'
    },
    component: () => import('@/views/teach-manage/course-manage')
  },
  classManage: {
    path: 'classManage',
    name: 'classManage',
    meta: {
      title: '班级管理',
    },
    component: () => import('@/views/teach-manage/class-manage')
  },
  teacherCourseTable: {
    path: 'teacherCourseTable',
    name: 'teacherCourseTable',
    meta: {
      title: '老师课表'
    },
    component: () => import('@/views/teach-manage/teacher-course-table')
  },
  semesterManage: {
    path: 'semesterManage',
    name: 'semesterManage',
    meta: {
      title: '学期管理'
    },
    component: () => import('@/views/teach-manage/semester-manage')
  },
  classCourseTable: {
    path: 'classCourseTable',
    name: 'classCourseTable',
    meta: {
      title: '班级课表'
    },
    component: () => import('@/views/teach-manage/class-course-table'),
  },
  vacationManage: {
    path: 'vacationManage',
    name: 'vacationManage',
    meta: {
      title: '节假日管理'
    },
    component: () => import('@/views/teach-manage/vacation-manage')
  },
  attendanceManage: {
    path: '/attendanceManage',
    name: 'attendanceManage',
    alwaysShow: true,
    meta: {
      title: '考勤管理'
    },
    component: Layout
  },
  attendanceSetting: {
    path: 'attendanceSetting',
    name: 'attendanceSetting',
    meta: {
      title: '考勤设置'
    },
    component: () => import('@/views/attendance-manage/attendance-setting')
  },
  attendanceReoprt: {
    path: 'attendanceReoprt',
    name: 'attendanceReoprt',
    meta: {
      title: '考勤报表'
    },
    component: () => import('@/views/attendance-manage/attendance-setting')
  }
}

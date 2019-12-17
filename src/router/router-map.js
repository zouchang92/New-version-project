/* eslint-disable no-dupe-keys */
import Layout from '@/layout'

export default {
  //
  dashboard: {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '我的工作台', icon: 'dashboard', affix: true, noCache: true }
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
      title: '班级管理'
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
    component: () => import('@/views/teach-manage/class-course-table')
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
    component: () => import('@/views/attendance-manage/attendance-record')
  },
  //
  growth: {
    path: '/Growth',
    component: Layout,
    redirect: '/Growth/index',
    alwaysShow: true,
    meta: {
      title: '成长档案',
      icon: 'nested'
    }
  },
  growthArchives: {
    path: 'growthArchives',
    component: () => import('@/views/growth-archives'),
    name: 'growthArchives',
    meta: { title: '成长档案', icon: 'guide' }
  },
  //
  Community: {
    path: '/Community',
    component: Layout,
    redirect: '/Community/index',
    name: 'Community',
    alwaysShow: true,
    meta: {
      title: '社团管理',
      icon: 'nested'
    }
  },
  CommunityManagement: {
    path: 'CommunityManagement',
    component: () => import('@/views/Community'),
    name: 'CommunityManagement',
    meta: { title: '社团管理', icon: 'guide' }
  },
  //
  Comprehensive: {
    path: '/Comprehensive',
    component: Layout,
    redirect: '/Comprehensive/index',
    name: 'Comprehensive',
    alwaysShow: true,
    meta: {
      title: '学生综合素质',
      icon: 'nested'
    }
  },
  ComprehensiveQuality: {
    path: 'ComprehensiveQuality',
    component: () => import('@/views/Comprehensive-quality'),
    name: 'ComprehensiveQuality',
    meta: { title: '学生综合素质', icon: 'guide' }
  },
  //
  Research: {
    path: '/Research',
    component: Layout,
    name: 'Research',
    alwaysShow: true,
    meta: {
      title: '研训管理',
      icon: 'nested'
    }
  },
  ResearchTraining: {
    path: 'ResearchTraining',
    component: () => import('@/views/ResearchTraining'),
    name: 'ResearchTraining',
    meta: { title: '研训管理', icon: 'guide' }
  },
  //
  Class: {
    path: '/Class',
    component: Layout,
    name: 'Class',
    alwaysShow: true,
    meta: {
      title: '评课管理',
      icon: 'nested'
    }
  },
  ClassEvaluation: {
    path: 'ClassEvaluation',
    component: () => import('@/views/ClassEvaluation'),
    name: 'ClassEvaluation',
    meta: { title: '评课管理', icon: 'guide' }
  },
  //
  sourceManage: {
    path: '/sourceManage',
    component: Layout,
    alwaysShow: true,
    name: 'sourceManage',
    meta: { title: '资源管理', icon: 'guide' }
  },
  sourceHomePage: {
    path: 'sourceHomePage',
    component: () => import('@/views/resource-manage'),
    name: 'sourceHomePage',
    meta: { title: '资源管理', icon: 'guide' }
  },
  buttonManage: {
    path: 'buttonManage',
    component: () => import('@/views/system-manage/button-manage'),
    name: 'buttonManage',
    meta: { title: '按钮管理', icon: 'button' }
  },
  arrangementPlanHome: {
    path: 'arrangementPlanHome',
    component: Layout,
    alwaysShow: true,
    name: 'arrangementPlanHome',
    meta: { title: '', icon: '' }
  },
  classPlanHome: {
    path: '/classPlanHome',
    name: 'classPlanHome',
    component: () => import('@/views/class-arrangement-manage/arrange-plan-manage'),
    meta: { title: '', icon: '' }
  },
  studentPlacement: {
    path: 'studentPlacement',
    component: Layout,
    alwaysShow: true,
    name: 'studentPlacement',
    meta: { title: '', icon: '' }
  },
  placementHome: {
    path: '/placementHome',
    component: () => import('@/views/student-placement/placement'),
    alwaysShow: true,
    name: 'placementHome',
    meta: { title: '', icon: '' }
  },
  placementResult: {
    path: '/placementResult',
    component: () => import('@/views/student-placement/placement-result'),
    alwaysShow: true,
    name: 'placementResult',
    meta: { title: '', icon: '' }
  }
}

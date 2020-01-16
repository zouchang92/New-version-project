import request from '@/utils/request'

export function queryClassPlan({ orgId }) {
  return request({
    url: '/zhxyx/pkTask/getAll',
    method: 'post',
    data: {
      orgId
    }
  })
}

export function addClassPlan({ orgId, semester }) {
  return request({
    url: '/zhxyx/pkTask/add',
    method: 'post',
    data: {
      orgId,
      semester
    }
  })
}

export function queryOrgClass({orgId = ''}) {
  return request({
    url: '/zhxyx/StudentClassManage/getOrgClass',
    method: 'post',
    data: {
      orgId
    }
  })
}

export function queryCourseNum({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkCoursewnum/getAll',
    method: 'post',
    data: {
      taskId
    }
  })
}

export function addCourseNum(datas) {
  return request({
    url: '/zhxyx/pkCoursewnum/restAdd',
    method: 'post',
    data:datas
  })
}


export function queryTaskCourse({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkTaskCourse/list',
    method: 'post',
    data: {
      taskId
    }
  })
}

export function addPKCourse({ taskId = '',courseIds=[] }) {
  return request({
    url: '/zhxyx/pkTaskCourse/add',
    method: 'post',
    data: {
      taskId,
      courseIds
    }
  })
}

export function queryCourseTeachers({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkTaskCourse/getCourseTeachers',
    method: 'post',
    data: {
      taskId
    }
  })
}

export function queryClassroom({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkInfo/getClassroomList',
    method: 'post',
    data: {
      taskId
    }
  })
}

export function addPKClassroom({ taskId = '',classroomIds=[] }) {
  return request({
    url: '/zhxyx/pkInfo/addPkClarssroom',
    method: 'post',
    data: {
      taskId,
      classroomIds
    }
  })
}

export function queryCourseGroup({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkInfo/getCourseGroup',
    method: 'post',
    data: {
      taskId
    }
  })
}

export function queryTeacherGroup({ taskId = '' }) {
  return request({
    url: '/zhxyx/pkInfo/getTeacherGroup',
    method: 'post',
    data: {
      taskId
    }
  })
}



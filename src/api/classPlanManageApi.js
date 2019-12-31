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
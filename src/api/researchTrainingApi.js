import request from '@/utils/request'

export function queryResearch({ page = 1, rows = 10000 }) {
  return request({
    url: '/zhxyx/yxTask/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}

export function addResearch({ name, presenter, classProperty, classMethod, classTime, classType, place, lession, attachment }) {
  return request({
    url: '/zhxyx/yxTask/insert',
    method: 'post',
    data: {
      name, presenter, classProperty, classMethod, classTime, classType, place, lession, attachment
    }
  })
}

export function updateResearch({ id, name, presenter, classProperty, classMethod, classTime, classType, place, lession, attachment, memberList, undoneList }) {
  return request({
    url: '/zhxyx/yxTask/update',
    method: 'post',
    data: {
      id, name, presenter, classProperty, classMethod, classTime, classType, place, lession, attachment, memberList, undoneList
    }
  })
}
export function delResearch({ id }) {
  return request({
    url: '/zhxyx/yxTask/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function queryList({ page, rows }) {
  return request({
    url: '/zhxyx/yxTaskLog/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function addMyResearch() {
  return request({
    url: '/zhxyx/yxTaskLog/insert',
    method: 'post',
    data: {}
  })
}

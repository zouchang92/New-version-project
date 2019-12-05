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

export function addResearch() {
  return request({
    url: '/zhxyx/yxTask/insert',
    method: 'post',
    data: { }
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

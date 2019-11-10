import request from '@/utils/request'

export function queryClassList({ page, rows, id='' }) {
  return request({
    url: '/zhxyx/classes/queryAll',
    method: 'post',
    data: {
      page,
      rows,
      id
    }
  })
}

export function addClass() {
  return request({
    url: '/zhxyx/classes/addClasses',
    method: 'post'
  })
}

export function updateClass() {
  return request({
    url: '/zhxyx/classes/updateClasses',
    method: 'post'
  })
}
import request from '@/utils/request'

export function queryClub({ page, rows }) {
  return request({
    url: '/zhxyx/stClub/list ',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function addClub() {
  return request({
    url: '/zhxyx/stClub/add  ',
    method: 'post',
    data: {}
  })
}
export function delClub({ ids }) {
  return request({
    url: '/zhxyx/stClub/delete',
    method: 'post',
    data: {
      ids
    }
  })
}
export function getIdClub({ id }) {
  return request({
    url: '/zhxyx/stClub/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function queryActivity() {
  return request({
    url: '/zhxyx/stActivities/list',
    method: 'post',
    data: {}
  })
}
export function addActivity() {
  return request({
    url: '/zhxyx/stActivities/add',
    method: 'post',
    data: {}
  })
}
export function delActivity({ id }) {
  return request({
    url: '/zhxyx/stActivities/delete',
    method: 'post',
    data: {
      id
    }
  })
}


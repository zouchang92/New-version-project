import request from '@/utils/request'

export function queryRoles({ name = '' }) {
  return request({
    url: '/zhxyx/role/queryAll',
    method: 'post',
    data: {
      name
    }
  })
}

export function addRole({ name, description }) {
  return request({
    url: '/zhxyx/role/insertRole',
    method: 'post',
    data: {
      name, description
    }
  })
}
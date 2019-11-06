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
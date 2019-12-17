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

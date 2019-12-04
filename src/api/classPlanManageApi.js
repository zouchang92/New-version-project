import request from '@/utils/request'

export function queryClassPlan({orgId}) {
  return request({
    url: '/pkTask/getAll',
    method: 'post',
    data: {
      orgId
    }
  })
}
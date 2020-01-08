import request from '@/utils/request'

export function queryComprehensiveHonor({
  page, rows
}) {
  return request({
    url: '/zhxyx/quality/listRule',
    method: 'post',
    data: {
      page, rows
    }
  })
}
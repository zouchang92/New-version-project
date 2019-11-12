import request from '@/utils/request'

export function queryStudentMoralList({ page, rows }) {
  return request({
    url: '/zhxyx/project/projectReport',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}
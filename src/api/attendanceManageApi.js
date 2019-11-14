import request from '@/utils/request'

export function getAttendanceRules({ page, rows }) {
  return request({
    url: '/zhxyx/kqRule/list',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}
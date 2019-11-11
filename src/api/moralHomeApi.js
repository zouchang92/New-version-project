import request from '@/utils/request'

export function queryStudentStatus() {
  return request({
    url: '/zhxyx/project/studentReport',
    method: 'post',
  })
}
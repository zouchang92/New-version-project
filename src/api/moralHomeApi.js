import request from '@/utils/request'

export function queryStudentStatus() {
  return request({
    url: '/zhxyx/project/studentReport',
    method: 'post',
  })
}

export function queryStudentScore() {
  return request({
    url: '/zhxyx/project/scoreReport',
    method: 'post',
    data: {}
  })
}
import request from '@/utils/request'

export const queryTeacher = ({ page, rows }) => {
  return request({
    url: '/zhxyx/teacher/list',
    data: {
      page,
      rows,
      method: 'post'
    }
  })
}
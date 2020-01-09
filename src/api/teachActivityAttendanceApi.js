import request from '@/utils/request'

export function queryTeachAttendance({ absenteeismDate, theme, orgName, stuName, page = 1, rows = 15 }) {
  return request({
    url: '/zhxyx/morality/listAllAttendance',
    method: 'post',
    data: {
      absenteeismDate, 
      theme, 
      orgName, 
      stuName, 
      page, 
      rows
    }
  })
}
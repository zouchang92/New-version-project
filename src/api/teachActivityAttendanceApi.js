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

export function addAttendance({
  absenteeismDate,
  theme,
  stuDTOs
}) {
  return request({
    url: '/zhxyx/morality/insertAttendance',
    method: 'post',
    data: {
      absenteeismDate,
      theme,
      stuDTOs
    }
  })
}

export function deleteAttendance(id) {
  return request({
    url: '/zhxyx/morality/deleteAttendance',
    method: 'post',
    data: {
      ids: [id]
    }
  })
}

export function deleteAttendances(ids) {
  return request({
    url: '/zhxyx/morality/deleteAttendance',
    method: 'post',
    data: {
      ids
    }
  })
}

export function importAttendance(formData) {
  return request({
    url: '/zhxyx/morality/importExcel',
    method: 'post',
    data: formData
  })
}
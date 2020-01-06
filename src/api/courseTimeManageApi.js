import request from '@/utils/request'

export function queryTimeTable({page, rows, orgId = ''}) {
  return request({
    url: '/zhxyx/schTimetable/getTimetableByOrgId',
    method: 'post',
    data: {
      orgId
    }
  })
}

export function addTimeTable({orgId, items}) {
  return request({
    url: '/zhxyx/schTimetable/add',
    method: 'post',
    data: {
      orgId, 
      items
    }
  })
}

export function deleteTimeTable(id) {
  return request({
    url: '/zhxyx/schTimetable/deleteByOrgId',
    method: 'post',
    data: {
      orgId: id
    }
  })
}
export function querySemester(id) {
  return request({
    url: '/zhxyx/semester/queryAll',
    method: 'post',
    data: {
      orgId: id
    }
  })
}

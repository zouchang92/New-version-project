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

export function addTimeTable({ id, orgId, weekN, lessonN, starttime, endtime }) {
  return request({
    url: '/zhxyx/schTimetable/add',
    method: 'post',
    data: {
      id, orgId, weekN, lessonN, starttime, endtime
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
import request from '@/utils/request'

export function querySemester({ name = '', year = '', starttime = '', endtime = '' }) {
  return request({
    url: '/zhxyx/semester/queryAll',
    method: 'post',
    data: {
      name,
      year,
      starttime,
      endtime
    }
  })
}

export function delSemester(id) {
  return request({
    url: '/zhxyx/semester/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function delSemesters(ids) {
  return request({
    url: '/zhxyx/semester/deletes',
    method: 'post',
    data: {
      ids
    }
  })
}

export function addSemesters({ name, year, starttime, endtime }) {
  return request({
    url: '/zhxyx/semester/addSemester',
    method: 'post',
    data: {
      name, year, starttime, endtime
    }
  })
}

export function updateSemester({ name, year, starttime, endtime, id }) {
  return request({
    url: '/zhxyx/semester/updateSemester',
    method: 'post',
    data: {
      id, name, year, starttime, endtime
    }
  })
}
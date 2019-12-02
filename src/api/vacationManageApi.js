import request from '@/utils/request'

export function queryVacation({ page, rows }) {
  return request({
    url: '/zhxyx/kqHoliday/list',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}

export function addVacation({
  id,
  name,
  startTime,
  endTime
}) {
  return request({
    url: '/zhxyx/kqHoliday/insert',
    method: 'post',
    data: {
      id,
      name,
      startTime,
      endTime
    }
  })
}

export function updateVacation({
  id,
  name,
  startTime,
  endTime
}) {
  return request({
    url: '/zhxyx/kqHoliday/update',
    method: 'post',
    data: {
      id,
      name,
      startTime,
      endTime
    }
  })
}

export function deleteVacation(id) {
  return request({
    url: '/zhxyx/kqHoliday/delete',
    method: 'post',
    data: {
      id
    }
  })
}
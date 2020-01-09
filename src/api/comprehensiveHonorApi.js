import request from '@/utils/request'

export function queryComprehensiveHonor({
  page, rows
}) {
  return request({
    url: '/zhxyx/ryAward/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}

export function deleteComprehensiveHonor(id) {
  return request({
    url: '/zhxyx/ryAward/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function addComprehensiveHonor({studentNum, title, grade, ranking, type, unit, certPic}) {
  return request({
    url: '/zhxyx/ryAward/insert',
    method: 'post',
    data: {
      studentNum, title, grade, ranking, type, unit, certPic
    }
  })
}

export function updateComprehensiveHonor({id, studentNum, title, grade, ranking, type, unit, certPic}) {
  return request({
    url: '/zhxyx/ryAward/update',
    method: 'post',
    data: {
      id, studentNum, title, grade, ranking, type, unit, certPic
    }
  })
}

export function importHonor(formData) {
  return request({
    url: '/zhxyx/ryAward/import',
    method: 'post',
    data: formData
  })
}
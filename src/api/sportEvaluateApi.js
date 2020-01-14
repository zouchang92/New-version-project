import request from '@/utils/request'

export function querySportEvaluate({ page, rows, studentName, assessName }) {
  return request({
    url: '/zhxyx/stuSportAssess/list',
    method: 'post',
    data: {
      page, 
      rows, 
      studentName, 
      assessName
    }
  })
}

export function addSportEvaluate({ assessName, assessScore, assessTime, studentNo, studentName }) {
  return request({
    url: '/zhxyx/stuSportAssess/insert',
    method: 'post',
    data: {
      assessName, 
      assessScore, 
      assessTime, 
      studentNo, 
      studentName
    }
  })
}

export function updateSportEvaluate({
  id,
  assessName,
  assessScore,
  assessTime
}) {
  return request({
    url: '/zhxyx/stuSportAssess/update',
    method: 'post',
    data: {
      id,
      assessName,
      assessScore,
      assessTime
    }
  })
}

export function deleteSportEvaluate(id) {
  return request({
    url: '/zhxyx/stuSportAssess/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function importSportEvaluate(formData) {
  return request({
    url: '/zhxyx/stuSportAssess/importSportAssess',
    method: 'post',
    data: formData
  })
}
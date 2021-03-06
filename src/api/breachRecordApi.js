import request from '@/utils/request'

export function queryBreachRecord({ page, rows, absenteeismDate, type, orgCode, stuName }) {
  return request({
    url: '/zhxyx/discipline/listAllDiscipline',
    method: 'post',
    data: {
      page,
      rows,
      absenteeismDate, 
      type, 
      orgCode, 
      stuName
    }
  })
}

export function addBreachRecord({
  semesterName,
  orgName,
  stuNum,
  stuName,
  discipline,
  disciplineTime,
  disciplinePic,
  type,
  status
}) {
  return request({
    url: '/zhxyx/discipline/insertDiscipline',
    method: 'post',
    data: {
      semesterName,
      orgName,
      stuNum,
      stuName,
      discipline,
      disciplineTime,
      disciplinePic,
      type,
      status
    }
  })
}

export function updateBreachRecord({
  id,
  semesterName,
  orgName,
  stuNum,
  stuName,
  discipline,
  disciplineTime,
  disciplinePic,
  type,
  status
}) {
  return request({
    url: '/zhxyx/discipline/updateDiscipline',
    method: 'post',
    data: {
      id,
      semesterName,
      orgName,
      stuNum,
      stuName,
      discipline,
      disciplineTime,
      disciplinePic,
      type,
      status
    }
  })
}

export function undoBreach(id) {
  return request({
    url: '/zhxyx/discipline/undoDiscipline',
    method: 'post',
    data: {
      ids: [id]
    }
  })
}

export function undoBreachs(ids) {
  return request({
    url: '/zhxyx/discipline/undoDiscipline',
    method: 'post',
    data: {
      ids
    }
  })
}

export function importBreach(formData) {
  return request({
    url: '/zhxyx/discipline/importExcel',
    method: 'post',
    data: formData
  })
}
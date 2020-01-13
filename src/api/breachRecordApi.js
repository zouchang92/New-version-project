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
  orgCode,
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
      orgCode,
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
  orgCode,
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
      orgCode,
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
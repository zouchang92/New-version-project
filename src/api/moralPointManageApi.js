import request from '@/utils/request'

export function queryMoralTree({ page=1, rows=10000 }) {
  return request({
    url: '/zhxyx/project/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}

export function addMoralNode({title, type, isClassroom, isStudent, isTeacher, isMaster}) {
  return request({
    url: '/zhxyx/project/insert',
    method: 'post',
    data: {
      title,
      type,
      isClassroom,
      isStudent,
      isTeacher,
      isMaster
    }
  })
}

export function updateMoralNode({id, title, type, isClassroom, isStudent, isTeacher, isMaster}) {
  return request({
    url: '/zhxyx/project/update',
    method: 'post',
    data: {
      id, 
      title, 
      type, 
      isClassroom, 
      isStudent, 
      isTeacher, 
      isMaster
    }
  })
}

export function deleteMoralNode(id) {
  return request({
    url: '/zhxyx/project/delete',
    method: 'post',
    data: {
      id
    }
  })
}
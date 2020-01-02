import request from '@/utils/request'

export function queryClassList({ page, rows, id='' }) {
  return request({
    url: '/zhxyx/classes/queryAll',
    method: 'post',
    data: {
      page,
      rows,
      id
    }
  })
}

export function addClass({
  parentId,
  orgName,
  description,
  logo,
  classRoomId,
  motto,
  leaderDtos,
  schOrgTeacherDTOList,
}) {
  return request({
    url: '/zhxyx/classes/addClasses',
    method: 'post',
    data: {
      parentId,
      orgName,
      description,
      logo,
      classRoomId,
      motto,
      leaderDtos,
      schOrgTeacherDTOList,
    }
  })
}

export function updateClass({
  id,
  parentId = '',
  orgName = '',
  description = '',
  logo = '',
  classRoomId = '',
  motto = '',
  leaderDtos = [],
  schOrgTeacherDTOList = []
}) {
  return request({
    url: '/zhxyx/classes/updateClasses',
    method: 'post',
    data: {
      id,
      parentId,
      orgName,
      description,
      logo,
      classRoomId,
      motto,
      leaderDtos,
      schOrgTeacherDTOList
    }
  })
}

export function updatePerson({
  id,
  leaderDtos = [],
  schOrgTeacherDTOList = []
}) {
  return request({
    url: '/zhxyx/classes/updateClasses',
    method: 'post',
    data: {
      id,
      leaderDtos,
      schOrgTeacherDTOList
    }
  })
}

export function deleteClass(id) {
  return request({
    url: '/zhxyx/classes/delete',
    method: 'post',
    data: {
      id
    }
  })
}
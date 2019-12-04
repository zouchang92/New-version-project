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
  orgCode,
  orgType,
  description,
  logo,
  motto,
  teacherId,
  courseId,
  dutyId
}) {
  return request({
    url: '/zhxyx/classes/addClasses',
    method: 'post',
    data: {
      parentId,
      orgName,
      orgCode,
      orgType,
      description,
      logo,
      motto,
      teacherId,
      courseId,
      dutyId
    }
  })
}

export function updateClass() {
  return request({
    url: '/zhxyx/classes/updateClasses',
    method: 'post'
  })
}
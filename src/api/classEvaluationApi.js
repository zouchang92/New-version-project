import request from '@/utils/request'

export function ClassQuery({ orgName, courseId, page, rows }) {
  return request({
    url: '/zhxyx/evaluation/listEvaReview',
    method: 'post',
    data: {
      orgName, courseId, page, rows
    }
  })
}
export function getDetail({ reviewId, type }) {
  return request({
    url: '/zhxyx/evaluation/getDetailEvaReview',
    method: 'post',
    data: {
      reviewId, type
    }
  })
}
export function pinkItem({ itemType }) {
  return request({
    url: '/zhxyx/pinkItem/listAllItem',
    method: 'get',
    params: {
      itemType
    }
  })
}
export function evaluation({ reviewId, itemDto, operatorContent }) {
  return request({
    url: '/zhxyx/evaluation/courseComment',
    method: 'post',
    data: {
      reviewId, itemDto, operatorContent
    }
  })
}
export function addClass({ orgName, courseId, resources, resourcesName, teacherId, evaName, description, type }) {
  return request({
    url: '/zhxyx/evaluation/insertEvaSource',
    method: 'post',
    data: {
      orgName, courseId, resources, resourcesName, teacherId, evaName, description, type
    }
  })
}

export function delClass(reviewId) {
  return request({
    url: '/zhxyx/evaluation/deleteEvaReview',
    method: 'post',
    data: {
      reviewId
    }
  })
}

export function getSelectOrgName() {
  return request({
    url: '/zhxyx/evaluation/selectOrgName',
    method: 'get',
    params: {}
  })
}

export function getSelectCourseByOrg({ orgId }) {
  return request({
    url: '/zhxyx/evaluation/selectCourseByOrg',
    method: 'get',
    params: {
      orgId
    }
  })
}

// export function getTeacher({ orgId, courseId }) {
//   return request({
//     url: '/zhxyx/evaluation/selectCourseTeacher',
//     method: 'get',
//     params: {
//       orgId, courseId
//     }
//   })
// }

export function getTeacher({ courseId }) {
  return request({
    url: '/zhxyx/course/getTeacherByCourse',
    method: 'post',
    data: {
      courseId
    }
  })
}

export function getOrgan(parentId) {
  return request({
    url: '/zhxyx/organ/listOrganByPid',
    method: 'post',
    data: {
      parentId
    }
  })
}

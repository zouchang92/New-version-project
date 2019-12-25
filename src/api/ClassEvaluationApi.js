import request from '@/utils/request'

export function ClassQuery({ page, rows }) {
  return request({
    url: '/zhxyx/evaluation/listEvaReview',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function getDetail({ reviewId }) {
  return request({
    url: '/zhxyx/evaluation/getDetailEvaReview',
    method: 'post',
    data: {
      reviewId
    }
  })
}
export function evaluation({ reviewId, teachingWay, teachingProgram, classStructure, importantPoints, teachingContent, operatorContent }) {
  return request({
    url: '/zhxyx/evaluation/courseComment',
    method: 'post',
    data: {
      reviewId, teachingWay, teachingProgram, classStructure, importantPoints, teachingContent, operatorContent
    }
  })
}
export function addClass({ orgName, courseId, resources, resourcesName, teacherId, evaName, description }) {
  return request({
    url: '/zhxyx/evaluation/insertEvaSource',
    method: 'post',
    data: {
      orgName, courseId, resources, resourcesName, teacherId, evaName, description
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

export function getOrgan(parentId) {
  return request({
    url: '/zhxyx/organ/listOrganByPid',
    method: 'post',
    data: {
      parentId
    }
  })
}

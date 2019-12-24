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

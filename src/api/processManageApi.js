import request from '@/utils/request'

export function queryProcessType({
  page, rows
}) {
  return request({
    url: '/zhxyx/category/listFlowCategory',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}

export function addProcessType({ categoryName }) {
  return request({
    url: '/zhxyx/category/insertFlowCategory',
    method: 'post',
    data: {
      categoryName
    }
  })
}

export function updateProcessType({id, categoryName, status}) {
  return request({
    url: '/zhxyx/category/updateFlowCategory',
    method: 'post',
    data: {
      id,
      categoryName,
      status
    }
  })
}

export function deleteProcessType(id) {
  return request({
    url: '/zhxyx/category/deleteFlowCategory',
    method: 'post',
    data: {
      id
    }
  })
}
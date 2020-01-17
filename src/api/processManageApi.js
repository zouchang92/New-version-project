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

export function queryFlowDefined({ page, rows, flowName, categoryName }) {
  return request({
    url: '/zhxyx/flowDefined/listFlowDefined',
    method: 'post',
    data: {
      page, rows, flowName, categoryName
    }
  })
}

export function addFlowDefined({ flowName, categoryId, description }) {
  return request({
    url: '/zhxyx/flowDefined/insertFlowDefined',
    method: 'post',
    data: {
      flowName, 
      categoryId, 
      description
    }
  })
}

export function updateFlowDefined({ id, flowName, categoryId, description }) {
  return request({
    url: '/zhxyx/flowDefined/updateFlowDefined',
    method: 'post',
    data: {
      id, 
      flowName, 
      categoryId, 
      description
    }
  })
}

export function deleteFlowDefined(flowId) {
  return request({
    url: '/zhxyx/flowDefined/deleteFlowDefined',
    method: 'post',
    data: {
      flowId
    }
  })
}

export function queryFlowNode(flowId) {
  return request({
    url: '/zhxyx/flowDefined/listFlowTaskByFlowId',
    method: 'get',
    params: {
      flowId
    }
  })
}

export function addFlowNode(info) {
  return request({
    url: '/zhxyx/flowDefined/insertFlowTask',
    method: 'post',
    data: info
  })
}
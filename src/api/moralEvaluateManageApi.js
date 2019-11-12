import request from '@/utils/request'

export function queryMoralEvaluateList({ page, rows }) {
  return request({
    url: '/zhxyx/projectRecord/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}

export function addMoralEvaluateRecord({ projId, objId, score, content }) {
  return request({
    url: '/zhxyx/projectRecord/insert',
    method: 'post',
    data: {
      projId, objId, score, content
    }
  })
}

export function updateMoralEvaluateRecord({ id, score, content }) {
  return request({
    url: '/zhxyx/projectRecord/update',
    method: 'post',
    data: {
      id, score, content
    }
  })
}

export function deleteMoralEvaluateRecord(id) {
  return request({
    url: '/zhxyx/projectRecord/delete',
    method: 'post',
    data: {
      id
    }
  })
}
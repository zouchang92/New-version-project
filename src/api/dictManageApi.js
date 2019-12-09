import request from '@/utils/request'

export function queryDictLists() {
  return request({
    url: '/zhxyx/dict/listAllDictItem',
    method: 'post'
  })
}

export function queryDictList() {
  return request({
    url: '/zhxyx/dict/listDict',
    method: 'post'
  })
}

export function searchDictById({ id, page, rows }) {
  return request({
    url: '/zhxyx/dict/listDictItemByPid',
    method: 'post',
    data: {
      dictId: id,
      page, 
      rows
    }
  })
}

export function addDict({ name, sort, dictId, parentId = '', code = '', description = '', uniqueName }) {
  return request({
    url: '/zhxyx/dict/insertDict',
    method: 'post',
    data: {
      name, 
      sort, 
      dictId,
      parentId,
      code, 
      description,
      uniqueName
    }
  })
}

export function updateDict({ id, name, sort, dictId, parentId = '', code = '', description = '', uniqueName }) {
  return request({
    url: '/zhxyx/dict/updateDict',
    method: 'post',
    data: {
      id, 
      name, 
      sort, 
      dictId,
      parentId,
      code, 
      description,
      uniqueName
    }
  })
}

export function deleteDict(id) {
  return request({
    url: '/zhxyx/dict/deleteDict',
    method: 'post',
    data: {
      id
    }
  })
}

export function deleteChildDict({id, dictId}) {
  return request({
    url: '/zhxyx/dict/deleteDict',
    method: 'post',
    data: {
      id,
      dictId
    }
  })
}
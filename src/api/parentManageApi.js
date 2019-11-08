import request from '@/utils/request'

export function queryParent({ page, rows }) {
  return request({
    url: '/zhxyx/parent/list',
    method: 'post',
    data: {
      page, 
      rows
    }
  })
}

export function updateParent({ id, userName, gender, tel, facePicFile, credNum }) {
  return request({
    url: '/zhxyx/parent/update',
    method: 'post',
    data: {
      id, 
      userName, 
      gender, 
      tel, 
      facePicFile, 
      credNum
    }
  })
}

export function addParent({ id = '', userName, gender, tel, facePicFile, credNum }) {
  return request({
    url: '/zhxyx/parent/insert',
    method: 'post',
    data: {
      id, 
      userName, 
      gender, 
      tel, 
      facePicFile, 
      credNum
    }
  })
}

export function delParent(id) {
  return request({
    url: '/zhxyx/parent/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function delParents(id) {
  return request({
    url: '/zhxyx/parent/deletes',
    method: 'post',
    data: {
      id
    }
  })
}
import request from '@/utils/request'

export function queryParent({ page, rows }) {
  return request({
    url: '/zhxyx/Parent/list',
    method: 'post',
    data: {
      page, 
      rows
    }
  })
}

export function updateParent({ id, userName, gender, tel, facePicFile, credNum }) {
  return request({
    url: '/zhxyx/Parent/update',
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

export function addParent({ userName, gender, tel, facePicFile, credNum }) {
  return request({
    url: '/zhxyx/Parent/insert',
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
    url: '/zhxyx/Parent/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function delParents(id) {
  return request({
    url: '/zhxyx/Parent/deletes',
    method: 'post',
    data: {
      id
    }
  })
}
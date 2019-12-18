import request from '@/utils/request'

export function queryParent({ page, rows, userName, loginName }) {
  return request({
    url: '/zhxyx/parent/list',
    method: 'post',
    data: {
      page, 
      rows,
      userName,
      loginName
    }
  })
}

export function updateParent({ id, userName, gender, tel, facePicFile, credNum, loginName }) {
  return request({
    url: '/zhxyx/parent/update',
    method: 'post',
    data: {
      id, 
      userName, 
      gender, 
      tel, 
      facePicFile, 
      credNum,
      loginName
    }
  })
}

export function addParent({ id = '', userName, gender, tel, facePicFile, credNum, loginName }) {
  return request({
    url: '/zhxyx/parent/insert',
    method: 'post',
    data: {
      id, 
      userName, 
      gender, 
      tel, 
      facePicFile, 
      credNum,
      loginName
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

export function importParent(formData) {
  return request({
    url: '/zhxyx/parent/import',
    method: 'post',
    data: formData
  })
}
import request from '@/utils/request'

export function queryFolderTree() {
  return request({
    url: '/zhxyx/zyFile/list',
    method: 'post',
    data: {}
  })
}

export function queryRecyclerList() {
  return request({
    url: '/zhxyx/zyFile/recyclerList',
    method: 'post',
    data: {}
  })
}

export function uploadFile({ parentId, filePath, name, createUserId }) {
  return request({
    url: '/zhxyx/zyFile/uploadZyFile',
    method: 'post',
    data: {
      parentId, 
      filePath, 
      name, 
      createUserId
    }
  })
}

export function querySubList({ parentId }) {
  return request({
    url: '/zhxyx/zyFile/subList',
    method: 'post',
    data: {
      parentId
    }
  })
}

export function addFolder({parentId}) {
  return request({
    url: '/zhxyx/zyFile/createDirectory',
    method: 'post',
    data: {
      parentId
    }
  })
}

export function downloadFile(id) {
  return request({
    url: '/zhxyx/zyFile/downloadZyFile',
    method: 'post',
    data: {
      id
    }
  })
}

export function deleteFile(id) {
  return request({
    url: '/zhxyx/zyFile/deleteFile',
    method: 'post',
    data: {
      id
    }
  })
}

export function truncateRecycler() {
  return request({
    url: '/zhxyx/zyFile/truncateRecycler',
    method: 'post',
    data: {}
  })
}

export function deleteFolder(id) {
  return request({
    url: '/zhxyx/zyFile/deleteDirectory',
    method: 'post',
    data: {
      id
    }
  })
}

export function truncateFile(id) {
  return request({
    url: '/zhxyx/zyFile/truncateFile',
    method: 'post',
    data: {
      id
    }
  })
}

export function truncateDirectory(id) {
  return request({
    url: '/zhxyx/zyFile/truncateDirectory',
    method: 'post',
    data: {
      id
    }
  })
}

export function restoreFile(id) {
  return request({
    url: '/zhxyx/zyFile/restoreFile',
    method: 'post',
    data: {
      id
    }
  })
}

export function restoreFolder(id) {
  return request({
    url: '/zhxyx/zyFile/restoreDirectory',
    method: 'post',
    data: {
      id
    }
  })
}
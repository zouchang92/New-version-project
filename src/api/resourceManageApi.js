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

export function uploadFile({ parentId, fileList }) {
  return request({
    url: '/zhxyx/zyFile/uploadZyFile',
    method: 'post',
    data: {
      parentId, 
      fileList, 
    }
  })
}

export function querySubList({ parentId, name }) {
  return request({
    url: '/zhxyx/zyFile/subList',
    method: 'post',
    data: {
      parentId,
      name
    }
  })
}

export function queryMyFileList() {
  return request({
    url: '/zhxyx/zyFileShare/shareFileToMe',
    method: 'post'
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

export function reNameFile({name, id}) {
  return request({
    url: '/zhxyx/zyFile/renameFile',
    method: 'post',
    data: {
      name,
      id
    }
  })
}

export function reNameFolder({ name, id }) {
  return request({
    url: '/zhxyx/zyFile/renameDirectory',
    method: 'post',
    data: {
      name,
      id
    }
  })
}

export function shareToPrivate({fileId, recUserId}) {
  return request({
    url: '/zhxyx/zyFileShare/shareFileToPrivate',
    method: 'post',
    data: {
      fileId, 
      recUserId
    }
  })
}
import request from '@/utils/request'

export function queryFolderTree() {
  return request({
    url: '/zhxyx/zyFile/list',
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
  window.open(`${process.env.VUE_APP_BASE_API}zhxyx/zyFile/downloadZyFile?id=${id}`)

}
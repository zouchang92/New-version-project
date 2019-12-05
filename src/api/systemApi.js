import request from '@/utils/request'

export function getOrganTree() {
  return request({
    url: '/zhxyx/organ/listOrganTree',
    method: 'post'
  })
}

export function getDictionary() {
  return request({
    url: '/zhxyx/dict/listAllDictItem',
    method: 'post'
  })
}

export function uploadFiles(formData) {
  return request({
    url: '/zhxyx/upload/file',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
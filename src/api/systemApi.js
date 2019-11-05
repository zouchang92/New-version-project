import request from '@/utils/request'

export function getOrganTree() {
  return request({
    url: '/zhxyx/organ/listOrganTree',
    method: 'post'
  })
}

export function getDictionary() {
  return request({
    url: '/zhxyx/dict/listDict'
  })
}
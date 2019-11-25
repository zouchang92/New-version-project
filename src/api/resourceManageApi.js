import request from '@/utils/request'

export function queryFolderTree() {
  return request({
    url: '/zhxyx/zyFile/list',
    method: 'post'
  })
}
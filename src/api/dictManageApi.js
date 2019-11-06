import request from '@/utils/request'

export function queryDictList() {
  return request({
    url: '/zhxyx/dict/listDict',
    method: 'post'
  })
}

export function searchDictById({ id }) {
  return request({
    url: '/zhxyx/dict/listDictItemByPid',
    method: 'post',
    data: {
      dictId: id
    }
  })
}
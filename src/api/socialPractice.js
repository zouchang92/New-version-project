import request from '@/utils/request'

export function queryPractice({ page, rows,  }) {
  return request({
    url: '/zhxyx/sjPractice/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function addPractice({ studentNum, memo  }) {
    return request({
      url: '/zhxyx/sjPractice/insert',
      method: 'post',
      data: {
        studentNum, memo
      }
    })
}
export function updatePractice({ id, memo  }) {
    return request({
      url: '/zhxyx/sjPractice/update',
      method: 'post',
      data: {
        id, memo
      }
    })
}
export function delPractice( id ) {
    return request({
      url: '/zhxyx/sjPractice/delete',
      method: 'post',
      data: {
        id
      }
    })
}
export function delsPractice( ids ) {
    return request({
      url: '/zhxyx/sjPractice/deletes',
      method: 'post',
      data: {
        ids
      }
    })
}
export function impPractice({ file  }) {
    return request({
      url: '/zhxyx/sjPractice/import',
      method: 'post',
      data: {
        file
      }
    })
}
export function expPractice() {
    return request({
      url: '/zhxyx/sjPractice/export',
      method: 'get'
    })
}

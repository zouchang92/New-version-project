import request from '@/utils'

export function queryVacation({ page, rows }) {
  return request({
    url: '/',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}

export function addVacation() {

}

export function updateVacation() {
  
}
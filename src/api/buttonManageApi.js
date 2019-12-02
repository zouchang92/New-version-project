import request from '@/utils/request'

export function addBtn() {
  return request({
    url: 'zhxyx/menu/insertButton',
    method: 'post',
    data: {
      
    }
  })
}
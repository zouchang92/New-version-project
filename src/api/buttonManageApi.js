import request from '@/utils/request'


export function queryBtns({name, page, rows}) {
  return request({
    url: '/zhxyx/menu/listButtons',
    method: 'post',
    data: {
      name, 
      page, 
      rows
    }
  })
}

export function addBtn({name, icon, description, buttonCode}) {
  return request({
    url: 'zhxyx/menu/insertButton',
    method: 'post',
    data: {
      name, 
      icon, 
      description,
      buttonCode
    }
  })
}

export function updateBtn({ id, status, description, icon, name, buttonCode  }) {
  return request({
    url: '/zhxyx/menu/updateButton',
    method: 'post',
    data: {
      buttonId: id,
      status, 
      description, 
      icon, 
      name, 
      buttonCode
    }
  })
}

export function deleteBtn(id) {
  return request({
    url: '/zhxyx/menu/deleteButton',
    method: 'post',
    data: {
      buttonId: id
    }
  })
}
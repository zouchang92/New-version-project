import request from "@/utils/request";

export function listMenuTree() {
  return request({
    url: '/zhxyx/menu/listMenuTree',
    method: 'post'
  })
}

export function addMenu({ name, parentId, menuUrl, menuIcon, description, sort }) {
  return request({
    url: '/zhxyx/menu/insertMenu',
    method: 'post',
    data: {
      name, parentId, menuUrl, menuIcon, description, sort
    }
  })
}

export function updateMenu({ name, parentId, menuUrl, menuIcon, description, sort, id }) {
  return request({
    url: '/zhxyx/menu/updateMenu',
    method: 'post',
    data: {
      name, parentId, menuUrl, menuIcon, description, sort, id
    }
  })
}

export function deleteMenu(id) {
  return request({
    url: '/zhxyx/menu/deleteMenu',
    method: 'post',
    data: {
      id
    }
  })
}
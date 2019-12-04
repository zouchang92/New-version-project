import request from "@/utils/request";

export function listMenuTree() {
  return request({
    url: '/zhxyx/menu/listMenuTree',
    method: 'post'
  })
}

export function addMenu({ name, parentId, menuUrl, menuIcon, description, sort, threeMenu }) {
  return request({
    url: '/zhxyx/menu/insertMenu',
    method: 'post',
    data: {
      name, parentId, menuUrl, menuIcon, description, sort, threeMenu
    }
  })
}

export function updateMenu({ name, parentId, menuUrl, menuIcon, description, sort, id, threeMenu }) {
  return request({
    url: '/zhxyx/menu/updateMenu',
    method: 'post',
    data: {
      name, parentId, menuUrl, menuIcon, description, sort, id, threeMenu
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

export function queryBtnByMenuId(id) {
  return request({
    url: '/zhxyx/menu/listButtonByMenu',
    method: 'post',
    data: {
      id
    }
  })
}

export function menuBindButtons({ id, buttons }) {
  return request({
    url: '/zhxyx/menu/menuBindButton',
    method: 'post',
    data: {
      id,
      buttons
    }
  })
}
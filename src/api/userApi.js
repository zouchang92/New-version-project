import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/zhxyx/account/login',
    method: 'post',
    data
  })
}

export function getSchoolCodeList() {
  return request({
    url: '/zhxyx/account/schoolCodeList',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserMenu() {
  return request({
    url: '/zhxyx/account/listMenuButtonByUserId',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/zhxyx/account/logout',
    method: 'post'
  })
}

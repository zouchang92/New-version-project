import request from '@/utils/request'

export function queryUsers({ page, rows, account = '', name = '', organId = '', status = '' }) {
  return request({
    url: '/zhxyx/account/queryAll',
    data: {
      page,
      rows,
      account,
      name,
      organId,
      status
    },
    method: 'post'
  })
}

export function addUser({ loginName, userName, gender, organId, phone, credNum, birthday, entryDay, description, password, photo, orgType }) {
  return request({
    url: '/zhxyx/account/registerUser',
    method: 'post',
    data: {
      loginName, userName, gender, organId, phone, credNum, birthday, entryDay, description, password, photo, orgType
    }
  })
}

export function updateUser({ id, loginName, userName, gender, organId, phone, credNum, birthday, entryDay, description, password, photo, orgType }) {
  return request({
    url: '/zhxyx/account/updateUser',
    method: 'post',
    data: {
      id, loginName, userName, gender, organId, phone, credNum, birthday, entryDay, description, password, photo, orgType
    }
  })
}

export function delUser(id) {
  return request({
    url: '/zhxyx/account/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function batchDel(ids) {
  return request({
    url: '/zhxyx/account/deletes',
    method: 'post',
    data: {
      ids
    }
  })
}
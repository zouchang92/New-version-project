import request from '@/utils/request'

export function queryRoles({ roleName = '' }) {
  return request({
    url: '/zhxyx/role/queryAll',
    method: 'post',
    data: {
      name: roleName
    }
  })
}

export function addRole({ name, description }) {
  return request({
    url: '/zhxyx/role/insertRole',
    method: 'post',
    data: {
      name, description
    }
  })
}

export function updateRole({id, name, description}) {
  return request({
    url: '/zhxyx/role/updateRole',
    method: 'post',
    data: {
      id, name, description
    }
  })
}

export function deleteRole(id) {
  return request({
    url: '/zhxyx/role/deleteRole',
    method: 'post',
    data: {
      id
    }
  })
}

export function getRoleAuthorize (id) {
  return request({
    url: '/zhxyx/role/listRoleMenu',
    method: 'post',
    data: {
      roleId: id
    }
  })
}

export function roleBindMenus({roleId, menuIds}) {
  return request({
    url: 'zhxyx/role/roleBindMenus',
    method: 'post',
    data: {
      roleId,
      menuIds
    }
  })
}
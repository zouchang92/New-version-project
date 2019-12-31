import request from '@/utils/request'

export function getOrganTree() {
  return request({
    url: '/zhxyx/organ/listOrganTree',
    method: 'post'
  })
}

export function insertOrgan({ orgName, parentId, orgCode, orgType, description }) {
  return request({
    url: '/zhxyx/organ/insertOrgElement',
    method: 'post',
    data: {
      orgName, parentId, orgCode, orgType, description 
    }
  })
}

export function updateOrgan({ id, orgName, parentId, orgCode, orgType, description }) {
  return request({
    url: '/zhxyx/organ/updateOrgElement',
    method: 'post',
    data: {
      id, orgName, parentId, orgCode, orgType, description 
    }
  })
}

export function deleteOrgan(id) {
  return request({
    url: '/zhxyx/organ/deleteOrgan ',
    method: 'post',
    data: {
      id
    }
  })
}

export function getLeaderById(orgId) {
  return request({
    url: '/zhxyx/organ/listOrgLeader',
    method: 'get',
    params: {
      orgId
    }
  })
}

export function setLeaderById({ organId, ids }) {
  return request({
    url: '/zhxyx/account/updateOrganLeader',
    method: 'post',
    data: {
      organId, 
      ids
    }
  })
}
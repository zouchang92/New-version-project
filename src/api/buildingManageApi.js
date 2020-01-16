import request from '@/utils/request'

export function queryBuilding({ page, rows, buildingNo, buildingName, buildingType = '' }) {
  return request({
    url: '/zhxyx/schBuilding/list',
    method: 'post',
    data: {
      page,
      rows,
      buildingNo,
      buildingName,
      buildingType
    }
  })
}

export function addBuilding({ buildingNo, buildingName, buildingType = '' }) {
  return request({
    url: '/zhxyx/schBuilding/insert',
    method: 'post',
    data: {
      buildingNo, 
      buildingName, 
      buildingType
    }
  })
}

export function updateBuilding({ id, buildingNo, buildingName, buildingType = ''  }) {
  return request({
    url: '/zhxyx/schBuilding/update',
    method: 'post',
    data: {
      id,
      buildingNo, 
      buildingName,
      buildingType
    }
  })
}

export function deleteBuilding(id) {
  return request({
    url: '/zhxyx/schBuilding/delete',
    method: 'post',
    data: {
      id
    }
  })
}
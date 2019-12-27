import request from '@/utils/request'

export function querySthClassroom({page, rows, roomNo, roomType, status}) {
  return request({
    url: '/zhxyx/schClassroom/list',
    method: 'post',
    data: {
      page,
      rows,
      roomNo,
      roomType,
      status
    }
  })
}

export function insertSthClassroom({ roomNo, address, roomType, buildingNo, floorNo, studentQty, status }) {
  return request({
    url: '/zhxyx/schClassroom/insert',
    method: 'post',
    data: {
      roomNo,
      address,
      roomType,
      buildingNo,
      floorNo,
      studentQty,
      status
    }
  })
}

export function updateSthClassroom({ id, roomNo, address, roomType, buildingNo, floorNo, studentQty, status }) {
  return request({
    url: '/zhxyx/schClassroom/update',
    method: 'post',
    data: {
      id, 
      roomNo, 
      address, 
      roomType, 
      buildingNo, 
      floorNo, 
      studentQty, 
      status
    }
  })
}

export function deleteSthClassroom(id) {
  return request({
    url: '/zhxyx/schClassroom/delete',
    method: 'post',
    data: {
      id
    }
  })
}
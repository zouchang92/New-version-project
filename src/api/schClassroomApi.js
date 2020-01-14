import request from '@/utils/request'

export function querySthClassroom({page, rows, roomName, roomType, status}) {
  return request({
    url: '/zhxyx/schClassroom/list',
    method: 'post',
    data: {
      page,
      rows,
      roomName,
      roomType,
      status
    }
  })
}

export function insertSthClassroom({ roomName, address, roomType, buildingId, roomNo, floorNo, studentQty, status }) {
  return request({
    url: '/zhxyx/schClassroom/insert',
    method: 'post',
    data: {
      roomName,
      address,
      roomType,
      buildingId,
      roomNo,
      floorNo,
      studentQty,
      status
    }
  })
}

export function updateSthClassroom({ id, roomName, buildingId, roomNo, address, roomType, floorNo, studentQty, status }) {
  return request({
    url: '/zhxyx/schClassroom/update',
    method: 'post',
    data: {
      id, 
      roomName,
      buildingId,
      roomNo,
      address, 
      roomType, 
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
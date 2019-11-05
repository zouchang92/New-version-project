import request from '@/utils/request'

export const queryStudent = ({ page, rows }) => {
  return request({
    url: '/zhxyx/student/list',
    data: {
      page,
      rows,
      
    },
    method: 'post'
  })
}

export const addStudent = ({ id = '', curStatus, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/student/add',
    data: {
      id, curStatus, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
    },
    method: 'post'
  })
}
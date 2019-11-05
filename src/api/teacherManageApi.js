import request from '@/utils/request'

export const queryTeacher = ({ page, rows }) => {
  return request({
    url: '/zhxyx/teacher/list',
    data: {
      page,
      rows,
      
    },
    method: 'post'
  })
}

export const addTeacher = ({ id = '', curStatus, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/teacher/add',
    data: {
      id, curStatus, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
    },
    method: 'post'
  })
}
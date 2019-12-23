import request from '@/utils/request'

export const queryTeacher = ({ page, rows, organId, userName, loginName }) => {
  return request({
    url: '/zhxyx/teacher/list',
    data: {
      page,
      rows,
      organId,
      userName,
      loginName
    },
    method: 'post'
  })
}

export const addTeacher = ({ id = '', curStatus, gender, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles, userName, organId, loginName }) => {
  return request({
    url: '/zhxyx/teacher/insert',
    data: {
      id, curStatus, facePicFile, credType, gender, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles, userName, organId, loginName
    },
    method: 'post'
  })
}

export const updateTeacher = ({ id = '', curStatus, gender, facePicFile, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles, userName, organId, loginName }) => {
  return request({
    url: '/zhxyx/teacher/update',
    data: { id, curStatus, facePicFile, gender, credType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles, userName, organId, loginName },
    method: 'post'
  })
}

export const deleteTeacher = (id) => {
  return request({
    url: '/zhxyx/teacher/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export const deleteTeachers = (ids) => {
  return request({
    url: '/zhxyx/teacher/deletes',
    method: 'post',
    data: {
      ids
    }
  })
}

export const importTeacher = (formData) => {
  return request({
    url: '/zhxyx/teacher/import',
    method: 'post',
    data: formData
  })
}
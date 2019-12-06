import request from '@/utils/request'

export const queryStudent = ({ page, rows, organId }) => {
  return request({
    url: '/zhxyx/student/list',
    data: {
      page,
      rows,
      organId
    },
    method: 'post'
  })
}

export const updateStudent = ({ id = '', userName, organId, gender, loginName, curStatus, facePicFile, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/student/update',
    method: 'post',
    data: {
      id, curStatus, organId, facePicFile, userName, gender, loginName, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
    }
  })
}

export const addStudent = ({ id = '', organId, userName, loginName, gender, curStatus, facePicFile, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/student/insert',
    data: {
      id, organId, curStatus, facePicFile, userName, loginName, gender, credType, credNum, credPhotoObve, inClassType, comefromType, birthday, inMemo, schoolType, stuType, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
    },
    method: 'post'
  })
}

export const delStudent = (id) => {
  return request({
    url: '/zhxyx/student/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export const delStudents = (ids) => {
  return request({
    url: '/zhxyx/Student/deletes',
    method: 'post',
    data: {
      ids
    }
  })
}
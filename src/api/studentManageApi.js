import request from '@/utils/request'

export const queryStudent = ({ page, rows, organId, curStatus }) => {
  return request({
    url: '/zhxyx/student/list',
    data: {
      page,
      rows,
      organId,
      curStatus
    },
    method: 'post'
  })
}

export const updateStudent = ({ id = '', userName, initNum, initDtm, nationNum, guarderTel, guarder, organId, gender, loginName, curStatus, facePicFile, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/student/update',
    method: 'post',
    data: {
      id, curStatus, organId, facePicFile, userName,initNum, initDtm, nationNum, guarderTel, guarder, gender, loginName, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
    }
  })
}

export const addStudent = ({ id = '', organId, userName,initNum, initDtm, nationNum, guarderTel, guarder, loginName, gender, curStatus, facePicFile, inClassType, comefromType, inMemo, birthday, credType, schoolType, stuType, credNum, credPhotoObve, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles }) => {
  return request({
    url: '/zhxyx/student/insert',
    data: {
      id, organId, curStatus, facePicFile, userName, initNum, initDtm, nationNum, guarderTel, guarder, loginName, gender, credType, credNum, credPhotoObve, inClassType, comefromType, birthday, inMemo, schoolType, stuType, credPhotoRever, nativeLand, volk, politstatus, homeAddr, health, inworkDate, entryTime, academy, education, duties, titles
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
    url: '/zhxyx/student/deletes',
    method: 'post',
    data: ids
  })
}

export const importStudent = (formData) => {
  return request({
    url: '/zhxyx/teacher/import',
    method: 'post',
    data: formData
  })
}

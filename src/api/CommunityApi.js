import request from '@/utils/request'

export function queryClub({ page, rows }) {
  return request({
    url: '/zhxyx/stClub/list ',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function updateClub({ id, person, name, orgIds }) {
  return request({
    url: '/zhxyx/stClub/upd',
    method: 'post',
    data: {
      id, person, name, orgIds
    }
  })
}
export function addClub({ person, name, initTime, studentOrgName, orgIds, description }) {
  return request({
    url: '/zhxyx/stClub/add',
    method: 'post',
    data: {
      person, name, initTime, studentOrgName, orgIds, description
    }
  })
}
export function delClub({ ids }) {
  return request({
    url: '/zhxyx/stClub/delete',
    method: 'get',
    params: { ids }
  })
}
export function getIdClub({ id }) {
  return request({
    url: '/zhxyx/stClub/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function queryActivity() {
  return request({
    url: '/zhxyx/stActivities/list',
    method: 'post',
    data: {}
  })
}
export function addActivity({ id, name, clubId, time, activityType, classroomName, persons, semesterId, clubOrgId, description, honors }) {
  return request({
    url: '/zhxyx/stActivities/add',
    method: 'post',
    data: {
      id, name, clubId, time, activityType, classroomName, persons, semesterId, clubOrgId, description, honors
    }
  })
}
export function delActivity({ id }) {
  return request({
    url: '/zhxyx/stActivities/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function updateActivity({ id, name, clubId, time, activityType, classroomName, persons, semesterId, clubOrgId, description, honors }) {
  return request({
    url: '/zhxyx/stActivities/upd',
    method: 'post',
    data: {
      id, name, clubId, time, activityType, classroomName, persons, semesterId, clubOrgId, description, honors
    }
  })
}
export function queryPerson() {
  return request({
    url: '/zhxyx/stClubStudent/list',
    method: 'post',
    data: {}
  })
}
export function addPerson({ id, clubId, studentId, inTime, payStatus, studentGender, studentOrgId, studentName, clubName }) {
  return request({
    url: '/zhxyx/stClubStudent/add',
    method: 'post',
    data: {
      id, clubId, studentId, inTime, payStatus, studentGender, studentOrgId, studentName, clubName
    }
  })
}
export function delPerson({ id }) {
  return request({
    url: '/zhxyx/stClubStudent/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function editPerson({ id, clubId, studentId, inTime, payStatus, studentGender, studentOrgId, studentName, clubName }) {
  return request({
    url: '/zhxyx/stClubStudent/upd',
    method: 'post',
    data: {
      id, clubId, studentId, inTime, payStatus, studentGender, studentOrgId, studentName, clubName
    }
  })
}
export function queryAttendance() {
  return request({
    url: '/zhxyx/stActivitiesAttendance/list',
    method: 'post',
    data: {}
  })
}
export function getById({ id }) {
  return request({
    url: '/zhxyx/stActivities/getById',
    method: 'post',
    data: {
      id
    }
  })
}
export function stTimetable({ clubId }) {
  return request({
    url: '/zhxyx/stTimetable/list',
    method: 'post',
    data: {
      clubId
    }
  })
}

export function getHighlights() {
  return request({
    url: '/zhxyx/stHome/getHighlights',
    method: 'post',
    data: {
      
    }
  })
}
export function getStPayReport() {
  return request({
    url: '/zhxyx/stHome/getStPayReport',
    method: 'post',
    data: {
      
    }
  })
}
export function getClubs() {
  return request({
    url: '/zhxyx/stHome/getClubs',
    method: 'post',
    data: {
      
    }
  })
}
export function getActivities() {
  return request({
    url: '/zhxyx/stHome/getActivities',
    method: 'post',
    data: {
      
    }
  })
}
export function getStudentScore({ page, rows }) {
  return request({
    url: '/zhxyx/stStudentScore/list',
    method: 'post',
    data: {
      page, rows
    }
  })
}
export function addStudentScore({ clubId, actId, studentNum, score, photos, memo }) {
  return request({
    url: '/zhxyx/stStudentScore/insert',
    method: 'post',
    data: {
      clubId, actId, studentNum, score, photos, memo
    }
  })
}
export function delStudentScore({ id }) {
  return request({
    url: '/zhxyx/stStudentScore/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function updateStudentScore({ id, clubId, actId, studentNum, score, photos, memo }) {
  return request({
    url: '/zhxyx/stStudentScore/update',
    method: 'post',
    data: {
      id, clubId, actId, studentNum, score, photos, memo
    }
  })
}
export function importStudentScore({ file}) {
  return request({
    url: '/zhxyx/stStudentScore/import',
    method: 'post',
    data: {
       file
    }
  })
}
export function signIn({ clubId, studentId, days, skTime }) {
  return request({
    url: '/zhxyx/stActivitiesAttendance/signIn',
    method: 'post',
    data: {
      clubId, studentId, days, skTime
    }
  })
}
export function notSignIn({ clubId, studentId, days, skTime }) {
  return request({
    url: '/zhxyx/stActivitiesAttendance/notSignIn',
    method: 'post',
    data: {
      clubId, studentId, days, skTime
    }
  })
}

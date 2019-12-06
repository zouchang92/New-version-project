import request from '@/utils/request'

export function listStu({ orgName, studentName, studentNum }) {
  return request({
    url: '/zhxyx/stuScore/listStuScoreByName',
    method: 'post',
    data: {
      orgName, studentName, studentNum
    }
  })
}
export function duty() {
  return request({
    url: '/zhxyx/duty/listStuDaDuty',
    method: 'post',
    data: { }
  })
}
export function delduty({ id }) {
  return request({
    url: 'zhxyx/duty/deleteStuDaDuty',
    method: 'post',
    data: { 
      id
    }
  })
}
export function dutyStuDuty({ id, result }) {
  return request({
    url: '/zhxyx/duty/checkStuDuty',
    method: 'post',
    data: {
      // eslint-disable-next-line no-sequences
      id, result
    }
  })
}
export function addutyStuDuty({ semesterName, orgName, studentNum, studentName, duty, dutyComment, dutyContext, startTime, endTime }) {
  return request({
    url: '/zhxyx/duty/checkStuDuty',
    method: 'post',
    data: {
      // eslint-disable-next-line no-sequences
      semesterName, orgName, studentNum, studentName, duty, dutyComment, dutyContext, startTime, endTime
    }
  })
}
export function daleteDuty() {
  return request({
    url: '/zhxyx/duty/deleteStuDaDuty',
    method: 'post',
    data: { }
  })
}
export function editDuty({ duty, dutyComment, dutyContext, startTime, endTime }) {
  return request({
    url: '/zhxyx/duty/updateStuDaDuty',
    method: 'post',
    data: {
      // eslint-disable-next-line no-sequences
      duty, dutyComment, dutyContext, startTime, endTime
    }
  })
}
export function daRap({ orgName, studentNum }) {
  return request({
    url: '/zhxyx/daRap/listStuDaRap',
    method: 'post',
    data: {
      orgName, studentNum
    }
  })
}
export function examineDaRap() {
  return request({
    url: '/zhxyx/daRap/checkStuRap',
    method: 'post',
    data: { }
  })
}
export function editDaRap({ id, semesterName, orgName, studentNum, studentName, itemName, level, status }) {
  return request({
    url: '/zhxyx/daRap/updateStuRap',
    method: 'post',
    data: {
      id, semesterName, orgName, studentNum, studentName, itemName, level, status
    }
  })
}
export function deleteDaRap({ id }) {
  return request({
    url: '/zhxyx/daRap/deleteStuRap',
    method: 'post',
    data: {
      id
    }
  })
}
export function addDaRap({ semesterName, orgName, studentNum, studentName, itemName, level, status }) {
  return request({
    url: '/zhxyx/daRap/insertDaRap',
    method: 'post',
    data: {
      semesterName, orgName, studentNum, studentName, itemName, level, status
    }
  })
}
export function stuLesson({ studentName }) {
  return request({
    url: '/zhxyx/stuLesson/listStuLesson',
    method: 'post',
    data: {
      studentName
    }
  })
}
export function clubQueryAll({ id }) {
  return request({
    url: '/zhxyx/stuClubActivity/queryAll',
    method: 'post',
    data: {
      id
    }
  })
}
export function delclub({ id }) {
  return request({
    url: 'zhxyx/stuClubActivity/delete',
    method: 'post',
    data: {
      id
    }
  })
}
export function queryHealth({ id }) {
  return request({
    url: '/zhxyx/stuHealth/queryAll',
    method: 'post',
    data: {
      id
    }
  })
}
export function delHealth({ id }) {
  return request({
    url: '/zhxyx/stuHealth/deletel',
    method: 'post',
    data: {
      id
    }
  })
}

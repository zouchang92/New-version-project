import request from '@/utils/request'

export function listStu({ orgName, studentName, studentNum, semesterName }) {
  return request({
    url: '/zhxyx/stuScore/listStuScoreByName',
    method: 'post',
    data: {
      orgName, studentName, studentNum, semesterName
    }
  })
}

export function listStucompre({ semesterName, orgName, studentName }) {
  return request({
    url: '/zhxyx/stuLesson/comprehensiveScore',
    method: 'post',
    data: {
      semesterName, orgName, studentName
    }
  })
}

export function stuexport() {
  return request({
    url: '/zhxyx/stuScore/exportExcel',
    method: 'get',
    params: {}
  })
}

export function insertStu({ semesterName, orgName, excelPath }) {
  return request({
    url: '/zhxyx/stuScore/insertStuScore',
    method: 'post',
    data: {
      semesterName, orgName, excelPath
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

export function adduty({ semesterName, orgName, studentNum, studentName, duty, dutyComment, dutyContext, startTime, endTime, description }) {
  return request({
    url: '/zhxyx/duty/insertDaDuty',
    method: 'post',
    data: {
      semesterName, orgName, studentNum, studentName, duty, dutyComment, dutyContext, startTime, endTime, description
    }
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
export function editDuty({ id, duty, dutyComment, dutyContext, startTime, endTime }) {
  return request({
    url: '/zhxyx/duty/updateStuDaDuty',
    method: 'post',
    data: {
      id, duty, dutyComment, dutyContext, startTime, endTime
    }
  })
}
export function daRap() {
  return request({
    url: '/zhxyx/daRap/listStuDaRap',
    method: 'post',
    data: {}
  })
}
export function examineDaRap({ id }) {
  return request({
    url: '/zhxyx/daRap/checkStuRap',
    method: 'post',
    data: {
      id
    }
  })
}
export function editDaRap({ id, semesterName, orgName, studentNum, studentName, itemName, rapTime, reason, score, rapPic, level, status }) {
  return request({
    url: '/zhxyx/daRap/updateStuRap',
    method: 'post',
    data: {
      id, semesterName, orgName, studentNum, studentName, itemName, rapTime, reason, score, rapPic, level, status
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

export function stuLessonexport() {
  return request({
    url: '/zhxyx/stuLesson/exportStuLesson',
    method: 'get',
    params: {}
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
export function addclub({ id, semesterName, orgName, studentNum, studentName, clubName, activityTime, activityName, description }) {
  return request({
    url: '/zhxyx/stuClubActivity/addActivity',
    method: 'post',
    data: {
      id, semesterName, orgName, studentNum, studentName, clubName, activityTime, activityName, description
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
export function upadateHealth({ id }) {
  return request({
    url: '/zhxyx/stuHealth/updateHealth',
    method: 'post',
    data: {
      id
    }
  })
}
export function updateClub({ id, semesterName, orgName, studentNum, studentName, clubName, activityTime, activityName, description, createTime, createUserId }) {
  return request({
    url: '/zhxyx/stuClubActivity/updateActivity',
    method: 'post',
    data: {
      id, semesterName, orgName, studentNum, studentName, clubName, activityTime, activityName, description, createTime, createUserId
    }
  })
}
export function addStuComment({ id }) {
  return request({
    url: '/zhxyx/stuComment/addStuComment',
    method: 'post',
    data: {
      id
    }
  })
}


import request from '@/utils/request'

export function queryAchievement ({ page, rows, semesterName, orgName = [], examType = '', course, teacherName, examTime }) {
  return request({
    url: '/zhxyx/stuScore/listExam',
    method: 'post',
    data: {
      page,
      rows,
      semesterName, 
      orgName: orgName[orgName.length - 1], 
      examType: [examType], 
      course, 
      teacherName, 
      examTime
    }
  })
}

export function importAchievement({
  orgId,
  orgName,
  semesterName,
  examType,
  teacherName,
  course,
  excelPath
}) {
  return request({
    url: '/zhxyx/stuScore/insertStuScore',
    method: 'post',
    data: {
      orgId,
      orgName,
      semesterName,
      examType,
      teacherName,
      course,
      excelPath
    }
  })
}

export function queryClassScore({
  semesterName, 
  orgId = [], 
  course, 
  examType = ''
}) {
  return request({
    url: '/zhxyx/stuScore/classStuScore',
    method: 'post',
    data: {
      semesterName, 
      orgId: orgId[orgId.length - 1], 
      course, 
      examType: examType ? [examType] : []
    }
  })
}
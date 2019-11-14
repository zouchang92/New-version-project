import request from '@/utils/request'

export function getAttendanceRules({ page, rows }) {
  return request({
    url: '/zhxyx/kqRule/list',
    method: 'post',
    data: {
      page,
      rows
    }
  })
}

export function addAttendanceRule({title, roleType, type, ruleDate, specDate, skipDate, isSingle, isEnabled}) {
  return request({
    url: '/zhxyx/kqRule/insert',
    method: 'post',
    data: {
      title, 
      roleType, 
      type, 
      ruleDate, 
      specDate, 
      skipDate, 
      isSingle, 
      isEnabled
    }
  })
}

export function updateAttendanceRule({id, title, roleType, type, ruleDate, specDate, skipDate, isSingle, isEnabled='1'}) {
  return request({
    url: '/zhxyx/kqRule/update',
    method: 'post',
    data: {
      id,
      title, 
      roleType, 
      type, 
      ruleDate, 
      specDate, 
      skipDate, 
      isSingle, 
      isEnabled
    }
  })
}

export function deleteAttendanceRule(id) {
  return request({
    url: '/zhxyx/kqRule/delete',
    method: 'post',
    data: {
      id
    }
  })
}
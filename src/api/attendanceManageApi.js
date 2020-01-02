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

export function addAttendanceRule({title, orgIds, type, ruleDate, specDate, skipDate, isSingle, isEnabled}) {
  return request({
    url: '/zhxyx/kqRule/insert',
    method: 'post',
    data: {
      title, 
      orgIds, 
      type, 
      ruleDate, 
      specDate, 
      skipDate, 
      isSingle, 
      isEnabled
    }
  })
}

export function updateAttendanceRule({id, title, orgIds, type, ruleDate, specDate, skipDate, isSingle, isEnabled='1'}) {
  return request({
    url: '/zhxyx/kqRule/update',
    method: 'post',
    data: {
      id,
      title, 
      orgIds, 
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

export function queryAttendanceRecord({ page, rows, beginDate, endDate, orgCode, userName, loginName }) {
  return request({
    url: '/zhxyx/kqLog/list',
    method: 'post',
    data: {
      page, 
      rows,
      beginDate, 
      endDate, 
      orgCode, 
      userName, 
      loginName

    }
  })
}

export function enableAttendace({ id, isEnabled }) {
  return request({
    url: '/zhxyx/kqRule/enabled',
    method: 'post',
    data: {
      id, 
      isEnabled
    }
  })
}
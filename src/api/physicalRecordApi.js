import request from '@/utils/request'

export function queryPhysicalRecord({ page, rows,  }) {
  return request({
    url: '/zhxyx/health/listAllStuHealth',
    method: 'post',
    data: {
      page,
      rows,

    }
  })
}

export function addPhysicalRecord({ 
  orgId,
  stuNum,
  stuName,
  checkDate,
  checkResult,
  items,
}) {
  return request({
    url: '/zhxyx/health/insertStuHealth',
    method: 'post',
    data: {
      orgId,
      stuNum,
      stuName,
      checkDate,
      checkResult,
      items,
    }
  })
}

export function updatePhysicalRecord({ 
  id,
  orgId,
  stuNum,
  stuName,
  checkDate,
  checkResult,
  items,
}) {
  return request({
    url: '/zhxyx/health/updateHealths',
    method: 'post',
    data: {
      id,
      orgId,
      stuNum,
      stuName,
      checkDate,
      checkResult,
      items,
    }
  })
}

export function deletePhysicalRecord(id) {
  return request({
    url: '/zhxyx/health/deleteHealth',
    method: 'post',
    data: {
     id
    }
  })
}

export function importPhysicalRecord(formData) {
  return request({
    url: '/zhxyx/health/importHealth',
    method: 'post',
    data: formData
  })
}
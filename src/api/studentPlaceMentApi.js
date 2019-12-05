import request from '@/utils/request'

export function uploadStudentInfo(file) {
  return request({
    url: '/zhxyx/StudentClassManage/uploadStudent',
    method: 'post',
    data: file
  })
}

export function autoSetClass({
  orgId,
  classQty,
  avgScore,
  avgSex,
  avgLiveInDorm,
  isSetClass,
  excelPath
}) {
  return request({
    url: '/zhxyx/StudentClassManage/autoSetClass',
    method: 'post',
    data: {
      orgId,
      classQty,
      avgScore,
      avgSex,
      avgLiveInDorm,
      isSetClass,
      excelPath
    }
  })
}

export function queryOrgClass({orgId = ''}) {
  return request({
    url: '/zhxyx/StudentClassManage/getOrgClass',
    method: 'post',
    data: {
      orgId
    }
  })
}
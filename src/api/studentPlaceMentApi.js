import request from '@/utils/request'

export function uploadStudentInfo(filePath) {
  return request({
    url: '/StudentClassManage/uploadStudent',
    method: 'post',
    data: {
      excelPath: filePath
    }
  })
}
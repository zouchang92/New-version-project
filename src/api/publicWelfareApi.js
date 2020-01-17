import request from '@/utils/request'

export function queryPracticeActivity() {
  return request({
    url: '/zhxyx/activity/listPracticeActivity',
    method: 'post',
    data: {
        
    }
  })
}
export function addPracticeActivity({ semesterName, orgName, stuNum, stuName, type, nums, activityDate, activityContent, flowId }) {
    return request({
      url: '/zhxyx/activity/insertPracticeActivity',
      method: 'post',
      data: {
        semesterName, orgName, stuNum, stuName, type, nums, activityDate, activityContent, flowId
      }
    })
}
export function delPracticeActivity( ids ) {
    return request({
      url: '/zhxyx/activity/deletePracticeActivity',
      method: 'post',
      data: {
        ids
      }
    })
}
export function updatePracticeActivity({ id, status, semesterName, orgName, stuNum, stuName, type, nums,  activityDate, activityContent }) {
    return request({
      url: '/zhxyx/activity/updatePracticeActivity',
      method: 'post',
      data: {
        id, status, semesterName, orgName, stuNum, stuName, type, nums,  activityDate, activityContent
      }
    })
}
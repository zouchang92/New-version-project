import request from '@/utils/request'

export function getClassCourseTableById({id, startDay, endDay}) {
  return request({
    url: '/zhxyx/schClassTimetable/getByClassId',
    method: 'post',
    data: {
      classId: id
    }
  })
}
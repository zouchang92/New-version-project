import request from '@/utils/request'

export function getTeacherCourseById({ teacherId, startDay, endDay }) {
  return request({
    url: '/zhxyx/schClassTimetable/getByTeacherId',
    method: 'post',
    data: {
      teacherId,
      startDay,
      endDay
    }
  })
}
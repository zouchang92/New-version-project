import request from '@/utils/request'

export function queryCourses({ page, rows, id, name, code }) {
  return request({
    url: '/zhxyx/course/queryAll',
    method: 'post',
    data: {
      page, rows, id, name, code
    }
  })
}

export function addCourse({id, name, code}) {
  return request({
    url: '/zhxyx/course/addCourse',
    method: 'post',
    data: {
      id, name, code
    }
  })
}

export function updateCourse({ id, name, code }) {
  return request({
    url: '/zhxyx/course/updateCourse',
    method: 'post',
    data: {
      id, name, code
    }
  })
}

export function deleteCourse(id) {
  return request({
    url: '/zhxyx/course/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function deleteCourses(ids) {
  return request({
    url: '/zhxyx/course/deletes',
    method: 'post',
    data: {
      ids
    }
  })
}

export function queryTeacherByCourseId({ 
  page,
  rows,
  courseId,
  teacherId = '' }) {
  return request({
    url: '/zhxyx/teacherCourse/list',
    method: 'post',
    data: {
      page,
      rows,
      courseId,
      teacherId
    }
  })
}

export function insertCourseTeacher({
  teacherIds,
  courseId
}) {
  return request({
    url: '/zhxyx/teacherCourse/insert',
    method: 'post',
    data: {
      teacherIds,
      courseId
    }
  })
}
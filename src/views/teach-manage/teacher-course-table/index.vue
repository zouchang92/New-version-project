<template>
  <div>
    <div style="padding-top: 10px;" class="basic-container">
      <el-card class="box-card">
        <el-form size="small" :inline="true">
          <el-form-item label="班级">
            <el-cascader @change="changeOrg" ref="treeSelect" :props="treeProps" :options="treeData" v-model="classId"/>
          </el-form-item>
          <el-form-item label="老师">
            <el-select
              v-model="teacherId"
>             <el-option :label="item.userName" :value="item.id" v-for="(item, i) in teacherData" :key="item.id" />

               
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="search" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div style="padding-top: 10px;" class="basic-container">
      <el-card v-loading="loading" class="table-card">
        <course-table v-if="courseData.length" :merge="true" :courseTime="courseTime" :courseData="courseData">
          <template v-slot:courseInfo="{lesson, week, courseTime}">
            <div>
               <p class="courseName">
                 {{lesson.courseName || '未知'}}<span style="font-size: 12px;">({{lesson.classroomName || '未知'}})</span>
               </p>
               <p class="teacherName" style="font-size: 12px;color: #1E1F1F">
                 {{lesson.teacherName || '未知'}}
               </p>
            </div>
          </template>
        </course-table>
        <abnor type="DATA" v-if="!loading && !courseTime.length && !courseData.length" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrgan } from '@/utils'
import { getTeacherCourseById } from '@/api/teacherCourseManageApi'
import { queryTimeTable } from '@/api/courseTimeManageApi'
import CourseTable from '@/components/CourseTable'
import Abnor from '@/components/Abnor'
import moment from 'moment'
import { queryUsers } from '@/api/userManageApi'
export default {
  name: 'teacherCourseTable',
  data() {
    return {
      classId: [],
      teacherId: '',
      loading: false,
      treeProps: {
        value: 'id',
        label: 'orgName'
      },
      treeData: getOrgan(),
      courseTime: [
      ],
      courseData: [
      ],
      teacherData: []
    }
  },
  methods: {
    async changeOrg(e) {
      try {
        let res = await queryUsers({page: 1, rows: 10000, organId: e[e.length - 1], orgType: 'teacherDuty'})
        this.teacherData = res.data.list
      } catch(err) {
      
      }
    },
    async getTimeTable({ teacherId, startDay, endDay }) {
      this.loading = true
      const { classId } = this
      try {
        let courseTime = await queryTimeTable({orgId: classId[classId.length - 1]})
        let courseData = await getTeacherCourseById({ teacherId: teacherId, startDay, endDay })
        this.courseTime = courseTime.data
        this.courseData = courseData.data.map(n => ({
          ...n,
          weekN: Number(moment(n.days).format('E'))
        }))
        this.loading = false
      } catch(err) {
        console.log(err)
        this.loading = false
      }
    },
    search() {
      const startDay = ''
      const endDay = ''
      this.getTimeTable({ teacherId: this.teacherId, startDay, endDay})
    }
  },
  components: {
    CourseTable,
    Abnor
  },
}
</script>

<style>

</style>
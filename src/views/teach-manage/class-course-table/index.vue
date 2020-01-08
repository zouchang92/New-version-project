<template>
  <div>
    <div style="padding-top: 10px;" class="basic-container">
      <el-card class="box-card">
        <el-form size="small" :inline="true">
          <el-form-item label="班级">
            <el-cascader ref="treeSelect" :props="treeProps" :options="treeData" v-model="classId"/>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="dateRange"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周">
            </el-date-picker>
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
        <abnor type="DATA" v-if="!loading && (!courseTime.length || !courseData.length)" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrgan } from '@/utils'
import { getClassCourseTableById } from '@/api/classCourseTableApi'

import { queryTimeTable } from '@/api/courseTimeManageApi'
import CourseTable from '@/components/CourseTable'
import Abnor from '@/components/Abnor'
import moment from 'moment'
export default {
  name: 'classCourseTable',
  data() {
    return {
      classId: '',
      dateRange: '',
      loading: false,
      treeProps: {
        value: 'id',
        label: 'orgName',
        checkStrictly: true
      },
      treeData: getOrgan(),
      courseTime: [
      ],
      courseData: [
      ]
    }
  },
  methods: {
    async getTimeTable({ classId, startDay, endDay }) {
      this.loading = true
      try {
        let courseTime = await queryTimeTable({orgId: classId})
        let courseData = await getClassCourseTableById({ id: classId, startDay, endDay })
        this.courseTime = courseTime.data.length ? courseTime.data[0].items : []
        this.courseData = courseData.data.length ? courseData.data.map(n => ({
          ...n,
          weekN: Number(moment(n.days).format('E'))
        })) : []
        this.loading = false
      } catch(err) {
        this.loading = false
      }
    },
    search() {
      const orgId = this.classId[this.classId.length - 1]
      const startDay = moment(this.dateRange).weekday(1).format('YYYY-MM-DD')
      const endDay = moment(this.dateRange).weekday(7).format('YYYY-MM-DD')
      this.getTimeTable({ classId: orgId, startDay, endDay})
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
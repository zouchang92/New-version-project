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
      <el-card class="table-card">
        <course-table :merge="true" :courseTime="courseTime" :courseData="courseData" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getOrgan } from '@/utils'
import { getClassCourseTableById } from '@/api/classCourseTableApi'
import { queryTimeTable } from '@/api/courseTimeManageApi'
import CourseTable from '@/components/CourseTable'
import moment from 'moment'
export default {
  name: 'classCourseTable',
  data() {
    return {
      classId: '',
      dateRange: '',
      treeProps: {
        value: 'id',
        label: 'orgName'
      },
      treeData: getOrgan(),
      courseTime: [
        {"lessonN":2,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"}, 
        {"lessonN":1,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"}, 
        {"lessonN":3,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"},
        {"lessonN":4,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"},
        {"lessonN":5,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"},
        {"lessonN":6,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"},
        {"lessonN":7,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"},
        {"lessonN":8,"weekN":1498,"endtime":3173253239395,"id":"fD5","starttime":2976655741205,"orgId":"ncNEdUd"}
      ],
      courseData: [
        {"lessonN":2,"weekN": 1,"classId":"5SFmmlBTh","courseName":"大学英语(Ⅳ)@10203","teacherId":"sBb","teacherName":"老师名称","classroomName":"教室1","days":901482848872,"classroomId":"P16ws","className":"班级1","courseId":"RrG1"}, 
        {"lessonN":3,"weekN": 1,"classId":"5SFmmlBTh","courseName":"大学英语(Ⅳ)@10203","teacherId":"sBb","teacherName":"老师名称1","classroomName":"教室2","days":901482848872,"classroomId":"P16ws","className":"班级1","courseId":"RrG1"},
        {"lessonN":2,"weekN": 5,"classId":"5SFmmlBTh","courseName":"模拟电子技术基础@16204","teacherId":"sBb","teacherName":"老师名称2","classroomName":"教室3","days":901482848872,"classroomId":"P16ws","className":"班级2","courseId":"RrG"},
        {"lessonN":3,"weekN": 5,"classId":"5SFmmlBTh","courseName":"电路、信号与系统实验","teacherId":"sBb","teacherName":"老师名称3","classroomName":"教室4","days":901482848872,"classroomId":"P16ws","className":"班级2","courseId":"RrG"}
      ]
    }
  },
  methods: {
    async getTimeTable({ classId, startDay, endDay }) {
      try {
        let courseTime = await queryTimeTable({orgId: classId})
        let courseData = await getClassCourseTableById({ id: classId, startDay, endDay })
      } catch(err) {

      }
    },
    search() {
      const orgId = this.classId[this.classId.length - 1]
      const startDay = moment(this.dateRange).weekday(1).format('YYYY-MM-DD')
      const endDay = moment(this.dateRange).weekday(7).format('YYYY-MM-DD')
      this.getTimeTable({ classId: orgId, startDay, endDay})
      console.log(moment(this.dateRange).format('YYYY-MM-DD'))
    }
  },
  components: {
    CourseTable
  },
}
</script>

<style>

</style>
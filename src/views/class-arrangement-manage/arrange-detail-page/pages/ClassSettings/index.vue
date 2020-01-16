<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32" style="height:300px;position:relative">

      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l" style=" position:relative; ">
        <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>班级信息(确认班级是否完整)</span>
            <div style=" position:absolute;  top: 19px;  right: 35px;">设置
            </div>
          </div>
          <div  v-for="(item,index) in classList" :key="index" class="assocition-content">
             <div>{{ item.orgName }}<br />
             <span v-if="item.classroomId==null">未设置教室</span>
             <span v-else>{{item.classroomName}}</span> </div>
          </div>
        </div>  
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l" style=" position:relative; ">
        <Classroom name="Classroom" />
      </el-col>
    </el-row>
    <el-row :gutter="32" style="height:300px;position:relative">

      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l" style=" position:relative; ">
        <CourseTeacher name="CourseTeacher"  ref="CourseTeacher" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l" style=" position:relative; ">
        <Course @restCourses='restCourses' name="Course" />
      </el-col>
    </el-row>
    <el-row :gutter="32" style="height:300px;position:relative">

      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l" style=" position:relative; ">
        <CourseTime name="CourseTime" ref="CourseTime" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" :xl="12" class="f-association-l">
        <div class="f-association">
          <div >
            <el-tabs >
              <el-tab-pane name="first" label="课程组设置" >
                <CourseGroup name="CourseGroup"/>
              </el-tab-pane>
              <el-tab-pane label="教师组设置">
                 <TeacherGroup name="TeacherGroup"/>
              </el-tab-pane>
            </el-tabs>

          </div>
          
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import {  queryOrgClass,queryTaskCourse,queryCourseTeachers,queryClassroom } from '@/api/classPlanManageApi'
import { queryCourses } from '@/api/courseManageApi'
import CourseGroup from './components/CourseGroup'
import TeacherGroup from './components/TeacherGroup'
import CourseTime from './components/CourseTime'
import Course from './components/Course'
import CourseTeacher from './components/CourseTeacher'
import Classroom from './components/Classroom'

export default {
  components: {
    CourseGroup,
    TeacherGroup,
    CourseTime,
    Course,
    CourseTeacher,
    Classroom
  }, 
  data() {
     return {
      classList: []//班级
    }
  },
  
  mounted() {
     this.queryOrgClass()
  },
  methods: {
    // 获取任务年级
    async queryOrgClass() {
      try {
        const List = await queryOrgClass({orgId:this.$route.query.orgId})
        this.classList = List.data
      } catch (err) {
        console.log(err)
      }
    },
    restCourses()
    {
      this.$refs.CourseTeacher.queryCourseTeachers()
      this.$refs.CourseTime.resetList()
    }
  }
}
</script>

<style lang="less">

.dashboard-editor-container {
  padding: 15px 14px 0px 14px;
  background-color: rgb(240, 242, 245);
  position: relative;

  span {
    padding-left: 15px;
    line-height: 18px;
    font-size: 16px;
    color: #666;
  }

  .f-association-l {
    padding-left: 20px;
    padding-right: 20px;
    top: 17px;

    .f-association {
      background: #fff;
      height: 280px;
      padding: 16px 16px 0;
      .association-title {
        height: 35px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 0px 1px;
        span {
          margin-bottom: 11px;
          display: block;
        }
      }
      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 32px;
        top: 3px;
      }

      .assocition-content {
        display: flex;
        height: 30px;
        justify-content: space-between;
        background: #f5f6fa;
        margin-top: 10px;
        span {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000;
        }
      }
    }
  }
}
</style>

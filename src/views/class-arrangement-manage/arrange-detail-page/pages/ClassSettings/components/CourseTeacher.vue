<template>
     <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>任课老师(有{{ unSetCourseTeaCount }}门课程未设置老师)</span>
            <div style=" position:absolute;  top: 19px;  right: 35px;">设置
            </div>
          </div>
          <div  class="assocition-content">
            <el-tabs   tab-position="left" style="height: 200px;">
            <el-tab-pane v-for="(item,index) in courseTeaList" :key="index" :label="item.courseName">
             <span  v-for="(tea,index) in item.teachers" :key="index">{{ tea.userName}}</span>
            </el-tab-pane>
        
          </el-tabs>
          </div>
        </div>
</template>
<script>
import {  queryCourseTeachers } from '@/api/classPlanManageApi'
export default {
  data() {
     return {
      unSetCourseTeaCount:0,//未设置教师科目数量
      courseTeaList: [], // 课目教师
    }
  },
  
  mounted() {
     this.queryCourseTeachers()
  },
  methods: {
      test()
      {

      },
    //获取科目教师
    async queryCourseTeachers()
    {
        try
        {
          const List = await queryCourseTeachers({taskId:this.$route.query.taskId})
          this.courseTeaList=List.data;
          let newAry= this.courseTeaList.filter(function (item, index) { 
              return item .teachers.length<=0;
          });
          unSetCourseTeaCount=newAry.length;
        } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
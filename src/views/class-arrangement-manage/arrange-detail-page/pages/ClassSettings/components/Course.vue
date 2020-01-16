<template>
     <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>课程信息  1走班  1行正班</span>
            <div  style=" position:absolute;  top: 19px;  right: 35px;" @click="save">保存
            </div>
          </div>
           <div  v-for="(item,index) in courseList" :key="index" class="assocition-content">
             <el-checkbox v-model="item.checked">{{ item.name }} -- {{item.checked}}</el-checkbox>
          </div>
        </div>
</template>
<script>
import {  queryTaskCourse,addPKCourse} from '@/api/classPlanManageApi'
import { queryCourses } from '@/api/courseManageApi'
export default {
  data() {
     return {
      courseList: [],//科目
    }
  },
  
  mounted() {
     this.queryCourse()
  },
  methods: {
    // 获取科目
    async queryCourse() {
      try {
          const page = 1
        const rows = 1000
        const List = await queryCourses({ page, rows })
        this.queryTaskCourse(List.data.list);
       
      } catch (err) {
        console.log(err)
      }
    },
    // 获取任务关联科目
    async queryTaskCourse(datas)
    {
      try {
        const List = await queryTaskCourse({taskId:this.$route.query.taskId})
        datas.forEach(function (item, index) 
        {
            item.checked=false;
            for(var x=0;x<List.data.length;x++)
            {
              if(item.id==List.data[x].courseId)
              {
                item.checked=true;
                continue;
              }
            }
        })
        this.courseList =datas
        
      } catch (err) {
        console.log(err)
      }
    },
     async save() {
      //loading(true)
      try {
        var courseIds=[];
        this.courseList.forEach(t => {
            if(t.checked)
            {
                courseIds.push(t.id)
            }
        });
        let res = await addPKCourse({taskId:this.$route.query.taskId,courseIds:courseIds})
         this.$emit('restCourses')
        this.$message.success('设置排课课程成功')
        //loading(false)
        done()
      } catch(err) {
        //loading(false)
      }
  }
}
}
</script>
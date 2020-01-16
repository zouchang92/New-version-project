<template>
    <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>走班信息</span>
            <div style=" position:absolute;  top: 19px;  right: 35px;" @click="save">保存
            </div>
          </div>
          <div class="assocition-content">
           <el-tabs tab-position="left" style="height: 200px;">
            <el-tab-pane v-for="(item,index) in classroomList" :key="index" :label="item.buildingName">
             <div  v-for="(classroom,i) in item.classrooms" :key="i">
              <el-checkbox v-model="classroom.checked">{{ classroom.classroomName}} {{classroom.checked}}</el-checkbox>
            </div>
            </el-tab-pane>
          </el-tabs>
          </div>
        </div>
</template>


<script>
import {  queryClassroom,addPKClassroom } from '@/api/classPlanManageApi'
import _ from 'lodash'

export default { 
  data() {
     return {
      classroomList: []//教室
    }
  },
  
  mounted() {
     this.queryClassroom()
  },
  methods: {
    //获取教室
    async queryClassroom()
    {
        try
        {
          const List = await queryClassroom({taskId:this.$route.query.taskId})
          this.classroomList=List.data;
        } catch (err) {
        console.log(err)
      }
    },
     async save() {
      //loading(true)
      try {
        var classroomIds=[];
        this.classroomList.forEach(element => {
            element.classrooms.forEach(t=>{
                if(t.checked)
                {
                    classroomIds.push(t.classroomId)
                }
            })
        });
        let res = await addPKClassroom({taskId:this.$route.query.taskId,classroomIds:classroomIds})
        this.$message.success('设置走班教室成功')
        //loading(false)
        done()
      } catch(err) {
        //loading(false)
      }
    }
  }
}
</script>

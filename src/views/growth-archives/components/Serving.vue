<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="tableList"
        :option="option"
        :page="page"
        @on-load="onLoad"
        @selection-change="selectionChange"
        :cell-style="cellStyle" 
        v-model="obj"
      >
        <template  slot="menu">
          <el-button class="el-button--text" size="small"><span>审核</span> </el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import {duty} from '@/api/growthArchivesApi'
export default {
  data() {
    return {
      fn:duty,
      page: {
        pageSize: 20
      },
      obj:[],
      tableList: [],
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "studentName"
          },
          {
            label: "所在职务",
            prop: "duty"
          },
          {
            label: "工作内容",
            prop: "dutyContext"
          },
          {
            label: "工作表现",
            prop: "dutyComment"
          },
          {
            label: "开始时间",
            prop: "startTime",
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: "结束时间",
            prop: "endTime",
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: "备注",
            prop: "description"
          }
        ]
      }
    };
  },
  mounted(){
    this.get();
  },
  methods: {
    async get() {
      try {
        let List = await duty({})
        this.tableList = List.data
      } catch(err) {
        console.log(120)
      }
    },
    onLoad(page) {
        this.$message.success('分页信息:' + JSON.stringify(page))
        this.page.total = 20
      },
      selectionChange(list) {
        this.$message.success("选中的数据" + JSON.stringify(list));
      },
      cellStyle({row,column,rowIndex,columnIndex}){
        if(columnIndex==4){
          if(row.dutyComment == '优秀'){
            return {
              color:'red',
            }
          }else if(row.dutyComment == '良好'){
            return {
              color:'#1890FF',
            }
          }else if(row.dutyComment == '一般'){
              return{
                  color:'#000'
              }
          }else{
              return{
                  color:'#808080'
              }
          }
        }
      }
    }
};
</script>
<style lang="">
</style>
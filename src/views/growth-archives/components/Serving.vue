<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        :page="page"
        @on-load="onLoad"
        @selection-change="selectionChange"
        :cell-style="cellStyle" 
      >
        <template  slot="menu">
          <el-button class="el-button--text" size="small"><span>审核</span> </el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: {
        pageSize: 20
      },
      data: [{ name: "蔡启超", post: "班长" , work: "负责班级全面工作", performance: "优秀", stardata: "2017-04-12", enddata: "2018-09-16", remarks: "此处备注信息"},{ name: "蔡启超", post: "团支部书记" , work: "负责团部工作", performance: "良好", stardata: "2017-10-30", enddata: "2018-09-16", remarks: "此处备注信息"},{ name: "蔡启超", post: "纪律、组织委员" , work: "负责班级纪律以及各项活动", performance: "一般", stardata: "2017-04-12", enddata: "2018-09-16", remarks: "此处备注信息"},{ name: "蔡启超", post: "学习委员" , work: "负责班级学习工作", performance: "不合格", stardata: "2017-04-12", enddata: "2018-09-16", remarks: "此处备注信息"}],
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "name"
          },
          {
            label: "所在职务",
            prop: "post"
          },
          {
            label: "工作内容",
            prop: "work"
          },
          {
            label: "工作表现",
            prop: "performance"
          },
          {
            label: "开始时间",
            prop: "stardata"
          },
          {
            label: "结束时间",
            prop: "enddata"
          },
          {
            label: "备注",
            prop: "remarks"
          }
        ]
      }
    };
  },
  methods: {
    onLoad(page) {
        this.$message.success('分页信息:' + JSON.stringify(page))
        this.page.total = 20
      },
      selectionChange(list) {
        this.$message.success("选中的数据" + JSON.stringify(list));
      },
      cellStyle({row,column,rowIndex,columnIndex}){
        if(columnIndex==4){
          if(row.performance == '优秀'){
            return {
              color:'red',
            }
          }else if(row.performance == '良好'){
            return {
              color:'#1890FF',
            }
          }else if(row.performance == '一般'){
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
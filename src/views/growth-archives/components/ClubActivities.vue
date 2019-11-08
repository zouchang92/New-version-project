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
      data: [{ name: "蔡启超", association: "舞蹈协会" , content: "教会学生正确的掌握舞蹈基本要领，知道基本手位，脚位；要求全体队员", perfor: "文化艺术", stardata: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", association: "书法协会" , content: "教会学生正确的掌握舞蹈基本要领，知道基本手位，脚位；要求全体队员", perfor: "文化艺术", stardata: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", association: "信风文学社" , content: "学会基本文学写作，如诗歌，散文，小说，随笔，摄影等", perfor: "学术交流", stardata: "2017-04-12", remarks: "此处备注信息"}],
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
            label: "社团名称",
            prop: "association"
          },
          {
            label: "活动内容",
            prop: "content",
            width:500
          },
          {
            label: "社团类型",
            prop: "perfor"
          },
          {
            label: "参加日期",
            prop: "stardata"
          },
          {
            label: "备注",
            prop: "remarks",
            width:100
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
        if(columnIndex==3){
            return{
                overflow:'hidden'
            }
        }
    }
  }
};
</script>
<style lang="">
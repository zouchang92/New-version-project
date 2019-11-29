<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        :page="page"
        :table-loading="tableListLoading"
        @row-del="del" 
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
import { clubQueryAll , delclub} from '@/api/growthArchivesApi'
import tableCommon from '@/mixins/table-common.js'

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn:clubQueryAll,
      del:delclub,
      page: {
        pageSize: 20
      },
      data: [],
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
            label: "社团名称",
            prop: "clubName"
          },
          {
            label: "活动内容",
            prop: "activityName",
            width:500
          },
          {
            label: "社团类型",
            prop: "orgName"
          },
          {
            label: "参加日期",
            prop: "createTime",
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: "备注",
            prop: "description",
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
    },
    async getClubQueryAll(id) {
      try {
        let List = await clubQueryAll({ id });
        this.data = List.data.list
        // console.log(List.data.list)
      } catch (err) {}
    }
  }
};
</script>
<style lang="">
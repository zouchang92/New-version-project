<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="tableList"
        :option="option"
        :page="page"
       :table-loading="tableListLoading"
        @selection-change="selectionChange"
        :cell-style="cellStyle"
        @row-del='del'
      >
        <template  slot="menu">
          <el-button class="el-button--text" size="small"><span>审核</span> </el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import { HealthQueryAll, delHealth} from "@/api/growthArchivesApi";
import tableCommon from '@/mixins/table-common.js'
export default {
  mixins: [tableCommon],
  data() {
    return {
      page: {
        pageSize: 20
      },
      fn:HealthQueryAll,
      del:delHealth,
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
            label: "身高",
            prop: "height"
          },
          {
            label: "体重",
            prop: "weight"
          },
          {
            label: "视力",
            prop: "sight"
          },
          {
            label: "重大疾病",
            prop: "zdjb"
          },
          {
            label: "体检日期",
            prop: "checkTime"
          },
          {
            label: "备注",
            prop: "createUserId",
            width:100
          }
        ]
      }
    };
  },
  created(){
    this.getHealth()
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
    async getHealth(id) {
      try {
        await HealthQueryAll({ id });
        console.log(a);
      } catch (err) {}
    },
  }
};
</script>
<style lang="">
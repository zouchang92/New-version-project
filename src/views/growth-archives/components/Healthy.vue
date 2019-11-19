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
import { HealthQueryAll } from "@/api/growthArchivesApi";
export default {
  data() {
    return {
      page: {
        pageSize: 20
      },
      fn:HealthQueryAll,
      data: [{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.5",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.5",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.5",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.5",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.0",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},{ name: "蔡启超", height: "184cm" , weight: "74kg", vision: "1.0",disease:'无', data: "2017-04-12", remarks: "此处备注信息"},],
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
            label: "身高",
            prop: "height"
          },
          {
            label: "体重",
            prop: "weight"
          },
          {
            label: "视力",
            prop: "vision"
          },
          {
            label: "重大疾病",
            prop: "disease"
          },
          {
            label: "体检日期",
            prop: "data"
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
    },
    async getHealth(id) {
      try {
        let a = await HealthQueryAll({ id });
       
        console.log(a);
      } catch (err) {}
    },
  }
};
</script>
<style lang="">
<template>
  <div>
    <el-card class="box-card Prize">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>奖励明细</p>
      </div>
      <avue-crud
        :data="tableList"
        :option="option"
        @selection-change="selectionChange"
        :table-loading="tableListLoading"
        v-model="obj"
        @row-del="del"
        @row-update="rowUpdate"
        ref="crud"
        style="margin-top:10px;"
      >
        <template slot="menu">
          <el-button class="el-button--text" size="small">
            <span>审核</span>
          </el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>惩罚明细</p>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50px;"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="reward" label="惩罚名称"></el-table-column>
        <el-table-column prop="level" label="惩罚级别"></el-table-column>
        <el-table-column prop="data" label="撤销日期"></el-table-column>
        <el-table-column prop="remarks" label="惩处原因"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width:100%;margin-top:20px;">+新增</el-button>
    </el-card>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { daRap, deleteDaRap, editDaRap } from "@/api/growthArchivesApi";
export default {
  mixins: [tableCommon],
  props: {
    input: {
      type: String
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      input: "",
      fn: daRap,
      delFn: deleteDaRap,
      obj: [],
      tableList: [],
      tableData: [],
      dialogVisible: false,
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "studentNum"
          },
          {
            label: "奖励名称",
            prop: "itemName"
          },
          {
            label: "奖励级别",
            prop: "level"
          },
          {
            label: "获奖日期",
            prop: "rapTime",
            type: "date",
            format: "yyyy-MM-dd"
          },
          {
            label: "获奖名次",
            prop: "status"
          },
          {
            label: "颁奖单位",
            prop: "status"
          },
          {
            label: "奖励照片",
            prop: "rapPic"
          },
          {
            label: "备注",
            prop: "reason"
          }
        ]
      }
    };
  },
  mounted() {},
  watch: {
    option: function(a, b) {
      console.log(a, b);
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async getdaRap(orgName, studentNum) {
      try {
        await daRap({ orgName, studentNum });
        // console.log(this.tableList);
      } catch (err) {
        console.log(err);
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let result = await editDaRap(row)
        console.log(result)
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
    },
    selectionChange(list) {
      this.$message.success("选中的数据" + JSON.stringify(list));
    }
  }
};
</script>
<style>
.Prize .avue-crud__right {
  display: none;
}
</style>
<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        @search-change="searchChange"
        :page="page"
        @selection-change="selectionChange"
      >
        <template slot="searchMenu">
          <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
          <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
          <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";

export default {
  mixins: [tableCommon],
  data() {
    return {
      page: {
        pageSize: 20
      },
      searchForm: {},
      data: [
        {
          semesterId: "2019下学期",
          clubName: "街舞社",
          name:"日常活动",
          clubOrgId:"一年级",
          person: "李安",
          classroomName: "体育馆二楼",
          honors: "无",
          description: "无",
          time:'2019-09-28 09:00'
        }
      ],
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "学期",
            prop: "semesterId",
            search: true
          },
          {
            label: "所属社团",
            prop: "clubName",
            search: true
          },
          {
            label: "活动名称",
            prop: "name"
          },
          {
            label: "活动单位",
            prop: "clubOrgId"
          },
          {
            label: "负责人",
            prop: "person",       
          },
          {
            label: "所在场馆",
            prop: "classroomName",
          },
          {
            label: "活动荣耀",
            prop: "honors",
          },
          {
            label: "精彩瞬间",
            prop: "description",
          },
          {
            label: "活动时间",
            prop: "time",
          }
        ]
      }
    };
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    onLoad(page) {
      this.$message.success("分页信息:" + JSON.stringify(page));
      this.page.total = 20;
    },
    selectionChange(list) {
      this.$message.success("选中的数据" + JSON.stringify(list));
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 3) {
        return {
          overflow: "hidden"
        };
      }
    }
  }
};
</script>
<style lang="">
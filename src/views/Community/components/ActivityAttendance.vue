<template>
  <div class="ActivityAttendance">
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        @search-change="searchChange"
        :page="page"
        @selection-change="selectionChange"
      >
        <template slot="searchMenu">
          <el-button type="success" icon="el-icon-folder-checked" size="small">批量记录签到</el-button>
          <el-button
            @click="batchDel()"
            type="danger"
            icon="el-icon-folder-delete
"
            size="small"
          >批量记录缺勤</el-button>
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
          semesterId: "街舞社",
          clubName: "20190377927",
          name: "王安",
          clubOrgId: "三年级/5班",
          person: "男",
          classroomName: "2019-09-28 09:00"
        }
      ],
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "社团名称",
            prop: "semesterId",
            type: "select",
            search: true
          },
          {
            label: "负责人",
            prop: "person",
            type: "select",
            search: true,
            hide: true
          },
          {
            label: "学号",
            prop: "clubName"
          },
          {
            label: "活动日期",
            prop: "daterange",
            type: "daterange",
            hide: true,
            search: true
          },
          {
            label: "姓名",
            prop: "name",
            search: true
          },
          {
            label: "所在班级",
            prop: "clubOrgId",
            type: "select",
            search: true
          },
          {
            label: "性别",
            prop: "person"
          },
          {
            label: "报名日期",
            prop: "classroomName"
          }
        ]
      }
    };
  },
  methods: {
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
<style>
.ActivityAttendance .el-date-editor .el-range-separator {
  width: 12%;
}
</style>
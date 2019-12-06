<template>
  <div class="ActivityAttendance">
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :data="tableList"
          :option="option"
          @search-change="searchChange"
          :page="page"
          @selection-change="selectionChange"
        >
          <template slot-scope="scope" slot="menu">
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row,scope.index)"
            >签到</el-button>
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row,scope.index)"
            ><span style="color:red;">缺勤</span></el-button>
          </template>
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-folder-checked" size="small">批量记录签到</el-button>
            <el-button
              @click="batchDel()"
              type="danger"
              icon="el-icon-folder-delete"
              size="small"
            >批量记录缺勤</el-button>
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { queryAttendance } from "@/api/CommunityApi.js";

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryAttendance,
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [
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
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        menuAlign: "center",
        column: [
          {
            label: "社团名称",
            prop: "clubName",
            type: "select",
            search: true
          },
          {
            label: "负责人",
            prop: "person",
            type: "select",
            hide: true,
            search: true
          },
          {
            label: "学号",
            prop: "studentNum"
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
            prop: "studentName",
            search: true
          },
          {
            label: "所在班级",
            prop: "studentOrgId",
            type: "select",
            search: true
          },
          {
            label: "性别",
            prop: "studentGender"
          },
          {
            label: "报名日期",
            prop: "days"
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
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index);
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
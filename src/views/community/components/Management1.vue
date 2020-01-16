<template>
  <div class="Management">
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          row-key="id"
          :data="tableList"
          :option="option"
          :page="page"
          :table-loading="tableListLoading"
          @row-update="rowUpdate"
          @search-change="searchChange"
          @selection-change="selectChange"
          @row-save="rowSave"
        >
          >
          <template slot="classMethod" slot-scope="scope">
            <el-button type="text" @click="showResult(scope.row, scope.index)"
              >点击查看</el-button
            >
          </template>
          <template slot="classType" slot-scope="scope">
            <el-button type="text" @click="showclass(scope.row, scope.index)"
              >点击查看</el-button
            >
          </template>
          <template slot="searchMenu">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="small"
              @click.stop="handleAdd()"
              >新建</el-button
            >
            <el-button type="warning" icon="el-icon-download" size="small"
              >导入</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="small"
              >批量删除</el-button
            >
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              @click.stop="handledel(scope.row, scope.index)"
              >删除</el-button
            >
          </template>
        </avue-crud>
      </div>
    </div>
    <template slot-scope="scope" slot="description">
      <div>
        <input type="text" @click="vie(scope)" />
      </div>
    </template>
    <el-dialog title="社团课表" :visible.sync="dialogTableVisible">
      <div class="class-table">
        <div class="table-wrapper">
          <div class="tabel-container">
            <table>
              <thead>
                <tr>
                  <th>年级</th>
                  <th v-for="(week, index) in weeks" :key="index">
                    {{ "周" + digital2Chinese(index + 1, "week") }}
                  </th>
                </tr>
              </thead>
              <tbody v-for="(week, index) in classTableData" :key="index">
                <tr>
                  <td>
                    <p class="period">{{ week.orgId }}</p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                  <td>
                    <p class="period"></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="success">编辑</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import {
  queryClub,
  addClub,
  delClub,
  getIdClub,
  updateClub,
  stTimetable
} from "@/api/communityApi.js";
import { getOrgan, getDictById } from "@/utils";
import PersonnelManagement from "./PersonnelManagement";
import CourseTable from "@/components/CourseTable/index";

export default {
  name: "Management1",
  omponents: {
    PersonnelManagement,
    CourseTable
  },
  inject: ["reload"],
  mixins: [tableCommon],
  data() {
    return {
      fn: queryClub,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      option: {
        selection: true,
        align: "center",
        delBtn: false,
        menuAlign: "center",
        column: [
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: "学期",
            prop: "semesterId",
            type: "select",
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + "/zhxyx/semester/queryAll",
            dicMethod: "post",
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: "data.list",
              label: "name",
              value: "name"
            },
            rules: [
              {
                required: true,
                message: "学期"
              }
            ]
          },
          {
            label: "社团名称",
            prop: "name",
            search: true,
            rules: [
              {
                required: true,
                message: "社团名称"
              }
            ]
          },
          {
            label: "社团成立时间",
            prop: "initTime",
            type: "date",
            format: "yyyy-MM-dd",
            hide: true
          },
          {
            label: "负责人",
            prop: "person",
            rules: [
              {
                required: true,
                message: "负责人"
              }
            ]
          },
          {
            label: "适用年级",
            prop: "studentOrgName",
            type: "tree",
            multiple: true,
            width: 150,
            dicData: getOrgan(),
            props: {
              label: "orgName",
              value: "orgName"
            },
            rules: [
              {
                required: true,
                message: "适用年级"
              }
            ]
          },
          {
            label: "社团课表",
            prop: "classMethod",
            formslot: true,
            slot: true
          },
          {
            label: "人员名单",
            prop: "classType",
            formslot: true,
            slot: true
          },
          {
            label: "社团简介",
            type: "textarea",
            component: "rich-text",
            span: 24,
            prop: "description"
          }
        ]
      },
      data: [],
      handleSee: false,
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [],
      form: {},
      weeks: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
      ],
      classTableData: []
    };
  },
  created() {
    this.get();
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    async get() {
      try {
        const page = 1;
        const rows = 10000;
        const List = await queryClub({ page, rows });
        this.tableList = List.data.list;
        console.log(this.tableList);
      } catch (err) {
        console.log(err);
      }
    },
    async rowSave(form, done, loading) {
      loading(true);
      console.log(form);
      try {
        await addClub(form);
        await this.resetList();
        done();
      } catch (err) {
        console.log(123);
        loading(false);
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true);
      try {
        const result = await updateClub(row);
        console.log(result);
        await this.resetList();
        done();
      } catch (err) {
        console.log(err);
        loading(false);
      }
    },
    async showResult(row, index) {
      this.dialogTableVisible = true;
      // console.log(row, index)
      const clubId = row.id;
      console.log(row.id);
      try {
        const result = await stTimetable({ clubId });
        this.classTableData = result.data;
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    async handledel(row, index, loading) {
      const ids = row.id;
      try {
        await delClub({ ids });
        await this.resetList();
      } catch (err) {
        console.log(err);
      }
    },
    showclass(row, index) {
      // this.dialogTableVisible1 = true;
      console.log(123)
      this.$emit('Personnel')
    },
    digital2Chinese(num, identifier) {
      const character = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      return identifier === "week" && (num === 0 || num === 7)
        ? "日"
        : character[num];
    }
  }
};
</script>
<style lang="scss" scpoed>
.Management {
  .title {
    margin: 15px;
    margin-top: 0px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    display: flex;
    .Nature,
    .type,
    .name {
      padding-top: 25px;
      padding-left: 40px;
    }
    .name {
      width: 270px;
      display: flex;
      p {
        margin: 0px;
        display: block;
        width: 120px;
        margin-top: 6px;
      }
    }
  }
  .content {
    margin: 15px;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }
  }
}
.class-table {
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .tabel-container {
    margin: 7px;

    table {
      table-layout: fixed;
      width: 100%;

      thead {
        background-color: #67a1ff;
        th {
          color: #fff;
          line-height: 17px;
          font-weight: normal;
        }
      }
      tbody {
        background-color: #eaf2ff;
        td {
          color: #677998;
          line-height: 12px;
        }
      }
      th,
      td {
        width: 60px;
        padding: 12px 2px;
        font-size: 12px;
        text-align: center;
      }

      tr td:first-child {
        color: #333;
        .period {
          font-size: 8px;
        }
      }
    }
  }
}
</style>
<style>
.Management .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.Management .title .el-input__suffix {
  top: 4px;
}
.Management .v-modal {
  z-index: 1990 !important;
}
</style>

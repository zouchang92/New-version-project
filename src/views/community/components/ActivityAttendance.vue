<template>
  <div class="ActivityAttendance">
    <div
      style="background:#fff;margin-top:15px;margin-bottom:20px;padding:20px;"
    >
      <div style="display:flex;margin-bottom:10px;">
        <p>社团:</p>
        <el-select
          v-model="value"
          clearable
          placeholder="请选择社团"
          @change="getperson(value)"
        >
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <p>负责人:</p>
        <el-input
          v-model="value1"
          placeholder="请输入负责人"
          style="width:200px;"
        ></el-input>
        <p>活动时间:</p>
        <el-date-picker v-model="value2" type="date" placeholder="选择日期">
        </el-date-picker>
        <p>所在班级:</p>
        <el-cascader
          v-model="value3"
          class="title-org"
          :options="options1"
          :props="{
            value: 'id',
            label: 'orgName',
            children: 'child',
            checkStrictly: true
          }"
          @change="handleChange(value3)"
        />
      </div>
      <div style="display:flex;">
        <p>学号/姓名:</p>
        <el-input
          v-model="name"
          placeholder="请输入学生姓名"
          style="width:200px;margin-right:20px;"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="searchList"
          >搜索</el-button
        >
        <el-button type="success" icon="el-icon-folder-checked" size="small"
          >批量签到</el-button
        >
        <el-button type="danger" icon="el-icon-folder-delete" size="small"
          >批量缺勤</el-button
        >
      </div>
    </div>
    <div>
      <el-table :data="tableList" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="clubName" label="社团名称" width="180">
        </el-table-column>
        <el-table-column prop="person" label="负责人" width="180">
        </el-table-column>
        <el-table-column prop="studentId" label="学号"> </el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="studentOrgId" label="所在班级">
        </el-table-column>
        <el-table-column prop="studentGender" label="性别"> </el-table-column>
        <el-table-column prop="days" label="报名日期"> </el-table-column>
        <el-table-column label="操作">
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row, scope.index)"
              >签到</el-button
            >
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row, scope.index)"
              ><span style="color:red;">缺勤</span></el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :data="tableList"
          :option="option"
          :page="page"
          @search-change="searchChange"
          @selection-change="selectionChange"
        >
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row, scope.index)"
              >签到</el-button
            >
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row, scope.index)"
              ><span style="color:red;">缺勤</span></el-button
            >
          </template>
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-folder-checked" size="small"
              >批量记录签到</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-folder-delete"
              size="small"
              @click="batchDel()"
              >批量记录缺勤</el-button
            >
          </template>
        </avue-crud>
      </div>
    </div> -->
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import {
  queryClub,
  getIdClub,
  queryAttendance,
  signIn,
  notSignIn
} from "@/api/communityApi.js";
import { getOrgan, getDictById } from "@/utils";
import { getOrganTree } from "@/api/organManageApi";
const genderDict = getDictById("gender");

export default {
  mixins: [tableCommon],
  data() {
    return {
      // fn: queryAttendance,
      options: [],
      value: "",
      list: [],
      value1: "",
      value2: "",
      options1: [],
      value3: "",
      name: "",
      studentOrg: '',
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
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
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + "/zhxyx/stClub/list",
            dicMethod: "post",
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: "data.list",
              label: "name",
              value: "id"
            },
            rules: [
              {
                required: true,
                message: "所属社团"
              }
            ]
          },
          {
            label: "负责人",
            prop: "person",
            type: "select",
            hide: true,
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + "/zhxyx/stClub/list",
            dicMethod: "post",
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: "data.list",
              label: "person",
              value: "person"
            },
            rules: [
              {
                required: true,
                message: "负责人"
              }
            ]
          },
          {
            label: "学号",
            prop: "studentId"
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
            search: true,
            rules: [
              {
                required: true,
                message: "所属班级"
              }
            ],
            type: "tree",
            span: 12,
            searchClearable: true,
            dicData: getOrgan(),
            props: {
              label: "orgName",
              value: "id"
            }
          },
          {
            label: "性别",
            prop: "studentGender",
            dicData: genderDict
          },
          {
            label: "报名日期",
            prop: "days",
            type: "date",
            format: "yyyy-MM-dd"
          }
        ]
      }
    };
  },
  created() {
    this.getclub();
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
      // eslint-disable-next-line eqeqeq
      if (columnIndex == 3) {
        return {
          overflow: "hidden"
        };
      }
    },
    async getclub() {
      try {
        const page = 1;
        const rows = 10000;
        const a = await queryClub({ page, rows });
        this.options = a.data.list;
      } catch (err) {
        console.log(err);
      }
    },
    handleChange(value3) {
      const a = value3[value3.length - 1]
      this.studentOrg = a
    },
    async getperson(value) {
      const id = value;
      try {
        const a = await getIdClub({ id });
        this.list = a.data;
        this.value1 = this.list.person;
        this.getOrganTree();
      } catch (err) {
        console.log(err);
      }
    },
    async getOrganTree() {
      try {
        const a = await getOrganTree();
        this.options1 = a.data;
      } catch (err) {
        console.log(err);
      }
    },
    async searchList() {
      const clubId = this.value
      const startTime = this.value2
      const person = this.value1
      const studentOrgId = this.studentOrg
      const studentName = this.name
      try {
       const a = await queryAttendance({clubId,startTime,person,studentOrgId,studentName})
       this.tableList = a.data
      }catch(err){
        console.log(err)
      }
    },
    async batchDel() {
      try {
        await notSignIn();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss">
  .ActivityAttendance{
    p{
      margin:10px;
    }
  }
</style>

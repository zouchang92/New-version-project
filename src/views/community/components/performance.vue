<template>
  <div class="table-container">
    <div class="basic-container">
      <avue-crud
        ref="crud"
        v-model="obj"
        :data="tabledata"
        :option="option"
        :page="page"
        :table-loading="tableListLoading"
        @search-change="searchChange"
        @row-update="rowUpdate"
      >
        <template slot="score" slot-scope="scope">
          <el-rate
            v-model="scope.row.score"
            disabled
            text-color="#ff9900"
            @change="handelclick(scope.row)"
          >
          </el-rate>
        </template>
        <template slot="searchMenu">
          <el-button type="warning" icon="el-icon-download" size="small"
            >导入</el-button
          >
        </template>
      </avue-crud>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import {
  getStudentScore,
  addStudentScore,
  delStudentScore,
  updateStudentScore,
  importStudentScore
} from "@/api/communityApi.js";
import { getOrgan, getDictById } from "@/utils";
const genderDict = getDictById("gender");

export default {
  mixins: [tableCommon],
  filters: {
    formatMS(fen) {
      var yuan = fen / 100.0;
      return yuan.toFixed(2);
    }
  },
  data() {
    return {
      fn: getStudentScore,
      delFn: delStudentScore,
      obj: {},
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
      tabledata: [],
      value: "",
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        delBtn: false,
        column: [
          {
            label: "社团名称",
            prop: "clubName",
            search: true,
            type: "select",
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
            label: "姓名",
            prop: "studentName",
            search: true,
            type: "select",
            dicUrl: process.env.VUE_APP_BASE_API + "/zhxyx/student/list ",
            dicMethod: "post",
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: "data.list",
              label: "userName",
              value: "id"
            },
            rules: [
              {
                message: "姓名"
              }
            ]
          },
          {
            label: "性别",
            prop: "studentGender",
            type: "radio",
            dicData: genderDict
          },
          {
            label: "所在班级",
            prop: "studentOrgId",
            rules: [
              {
                required: true,
                message: "所在班级"
              }
            ],
            type: "tree",
            search: true,
            span: 12,
            searchClearable: true,
            dicData: getOrgan(),
            props: {
              label: "orgName",
              value: "id"
            }
          },
          {
            label: "活动名称",
            prop: "activityName"
          },
          {
            label: "活动时间",
            prop: "time",
            type: "date",
            format: "yyyy-MM-dd"
          },
          {
            label: "活动照片",
            type: "upload",
            prop: "photos",
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: "0"
            },
            listType: "picture-card",
            span: 12,
            slot: true
          },
          {
            label: "活动表现",
            prop: "score",
            slot: true,
            width: 150
          },
          {
            label: "表现分值",
            prop: "score"
          }
        ]
      }
    };
  },
  created() {
    this.get();
  },
  mounted() {},
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    async get() {
      try {
        const page = 1;
        const rows = 10000;
        const a = await getStudentScore({ page, rows });
        this.tabledata = a.data.list;
        for(let i=0;i<this.tabledata.length;i++){
            console.log(this.tabledata[i].score)
            if(this.tabledata[i].score <= 20){
                this.tabledata[i].score = 1
            }else if(this.tabledata[i].score <= 40 && this.tabledata[i].score >= 20){
                this.tabledata[i].score = 2
            }else if(this.tabledata[i].score <= 60 && this.tabledata[i].score >= 40){
                this.tabledata[i].score = 3
            }else if(this.tabledata[i].score <= 80 && this.tabledata[i].score >= 60){
                this.tabledata[i].score = 4
            }else if(this.tabledata[i].score <= 100 && this.tabledata[i].score >= 80){
                this.tabledata[i].score = 5
            }
        }
        console.log(this.tabledata);
      } catch (err) {
        console.log(err);
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true);
      try {
        const result = await updateStudentScore(row);
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    }
  }
};
</script>
<style></style>

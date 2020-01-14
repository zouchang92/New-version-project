<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :permission="permission"
          rowKey="id"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
          :table-loading="tableListLoading"
          ref="crud"
          :page="page"
          :data="tableList"
          :option="option"
          v-model="obj"
        >
          <template slot="searchMenu">
            <el-button
              v-if="permission.addBtn"
              type="success"
              @click.stop="handleAdd()"
              icon="el-icon-plus"
              size="small"
              >新建</el-button
            >
            <el-button
              v-if="permission.batchDelBtn"
              @click="batchDel()"
              type="danger"
              icon="el-icon-delete"
              size="small"
              >批量删除</el-button
            >
            <el-button
              v-if="permission.import"
              type="warning"
              icon="el-icon-download"
              size="small"
              >导入</el-button
            >
            <el-button
              v-if="permission.export"
              type="warning"
              icon="el-icon-upload2"
              size="small"
              @click="
                exportExcel(
                  `${baseUrl}zhxyx/sjPractice/export
`,
                  []
                )
              "
              >导出</el-button
            >
            <el-button
              @click="initList()"
              type="info"
              icon="el-icon-refresh"
              size="small"
              circle
            ></el-button>
          </template>
          <template slot="studentNumForm" slot-scope="scope">
            <el-input
              :disabled="scope.row.id !== ''"
              clearable
              v-model="obj.studentNum"
              @click.native="openMemberModal(scope)"
            />
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
    <member-select
      :count="1"
      default-key="loginName"
      v-model="memberModal.visible"
      :member-selected="memberModal.selectedMember"
      search-type="student"
      @save="setStudent"
    />
  </div>
</template>

<script>
import tableCommon from "@/mixins/table-common";
import permission from "@/mixins/permission";
import MemberSelect from "@/components/MemberSelect";
import { getDictById, getOrgan } from "@/utils";
import {
  queryPractice,
  delPractice,
  addPractice,
  updatePractice,
  delsPractice,
  impPractice,
  expPractice
} from "@/api/social-practice.js";

import { querySemester } from "@/api/semesterManageApi";
export default {
  name: "breachRecord",
  data() {
    return {
      fn: queryPractice,
      singleDelFn: delPractice,
      delFn: delsPractice,
      memberModal: {
        visible: false,
        selectedMember: []
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      importDialog: {
        visible: false,
        fileList: "",
        importLoading: false,
        semesterName: "",
        semesterData: []
      },
      option: {
        delBtn: false,
        column: [
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: "学生学号",
            prop: "studentNum",
            // search: true,
            formslot: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "学生学号是必填项"
              }
            ]
          },
          {
            label: "学生姓名",
            prop: "studentName",
            search: true,
            width:150,
            disabled: true
          },
          {
            label: "所属班级",
            prop: "orgName",
            type: "tree",
            width:150,
            disabled: true,
            dicData: getOrgan(),
            props: {
              label: "orgName",
              value: "id"
            },
            rules: [
              {
                required: true,
                message: "所属班级是必填项"
              }
            ]
          },
          {
            label: "实践时间",
            prop: "createTime",
            type: "date",
            width:250,
            valueFormat: "yyyy-MM-dd",
            format: "yyyy-MM-dd",
            rules: [
              {
                required: true,
                message: "实践时间是必填项"
              }
            ]
          },
          {
            label: "实践内容",
            prop: "memo",
            type: "textarea",
            component: "rich-text",
            span: 24,
            rules: [
              {
                required: true,
                message: "实践内容是必填项"
              }
            ]
          }
        ]
      },
      obj: {}
    };
  },
  mixins: [tableCommon, permission],
  mounted() {
    this.getSemester();
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    async getSemester() {
      try {
        let data = await querySemester({ page: 1, rows: 10000 });
        this.importDialog.semesterData = data.data.list;
      } catch (err) {}
    },
    setStudent(data) {
      this.obj = {
        ...this.obj,
        studentName: data.data[0].userName,
        studentNum: data.data[0].value,
        orgName: data.data[0].organId
      };
    },
    openMemberModal(item) {
      this.memberModal = {
        visible: true,
        selectedMember: [
          {
            value: this.obj.studentNum,
            label: this.obj.studentName
          }
        ]
      };
    },
    async rowUpdate(row, index, done, loading) {
      loading(true);
      try {
        let res = await updatePractice(row);
        await this.resetList();
        loading(false);
        this.$message.success("更新成功");
        done();
      } catch (err) {
        loading(false);
      }
    },
    async rowSave(row, done, loading) {
      loading(true);
      try {
        let res = await addPractice(row);
        await this.resetList();
        loading(false);
        this.$message.success("添加成功");
        done();
      } catch (err) {
        loading(false);
      }
    },
    async handledel(row, index, loading) {
      const id = row.id
      console.log(id)
      try {
        await delPractice({ id })
        await this.resetList()
        loading(false);
        this.$message.success("删除成功");
        done();
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    MemberSelect
  }
};
</script>

<style></style>

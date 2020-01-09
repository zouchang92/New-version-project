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
            >新建</el-button>
            <el-button
              v-if="permission.import"
              @click="importClick"
              type="warning"
              icon="el-icon-download"
              size="small"
            >导入</el-button>
            <el-button
              v-if="permission.export"
              @click="exportExcel(`${baseUrl}zhxyx/teacher/export
`, ['organId', 'userName'])"
              type="warning"
              icon="el-icon-download"
              size="small"
            >导出</el-button>
            <el-button
              v-if="permission.batchDelBtn"
              @click="batchDel()"
              type="danger"
              icon="el-icon-delete"
              size="small"
            >批量删除</el-button>
            <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
          </template>
        </avue-crud>
      </div>
      <el-dialog title="老师导入" :visible.sync="importDialog">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/教师档案.xlsx`">下载模板</a>
          </el-form-item>
          <el-form-item label="上传">
            <el-upload
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :limit="1"
              ref="upload"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :loading="importObj.importLoading" type="primary" @click="importTeacher">导入</el-button>
          <el-button @click="importDialog = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableCommon from "@/mixins/table-common";
import { getOrgan, getDictById } from "@/utils";
import permission from "@/mixins/permission";
import {
  queryTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  deleteTeachers,
  importTeacher
} from "@/api/teacherManageApi";
const genderDict = getDictById("gender");
const curStatusDict = getDictById("curStatus");
export default {
  name: "teacherManage",
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {},
      fn: queryTeacher,
      delFn: deleteTeachers,
      singleDelFn: deleteTeacher,
      data: [],
      importDialog: false,
      baseUrl: process.env.VUE_APP_BASE_API,
      fileObj: "",
      fileList: [],
      importObj: {
        importLoading: false
      },
      option: {
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
            label: "所属机构",
            prop: "organId",
            rules: [
              {
                required: true,
                message: "所属机构"
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
            label: "姓名",
            prop: "userName",
            rules: [
              {
                required: true
              }
            ],
            search: true,
            span: 12
          },
          {
            label: "工号",
            prop: "loginName",
            rules: [
              {
                required: true
              }
            ],
            search: true,
            span: 12,
            editDisplay: false
          },
          {
            label: "性别",
            prop: "gender",
            span: 12,
            type: "radio",
            rules: [
              {
                required: true,
                message: "性别是必填项"
              }
            ],
            dicData: genderDict
          },
          {
            label: "进校时间",
            prop: "entryTime",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            width: 150,
            rules: [
              {
                required: true,
                message: "进校时间为必填项"
              }
            ]
          },
          {
            label: "职务",
            prop: "duties",
            rules: [
              {
                required: true,
                message: "职务为必填项"
              }
            ]
          },
          {
            label: "职称",
            prop: "titles",
            rules: [
              {
                required: true,
                message: "职称为必填项"
              }
            ]
          },
          {
            label: "照片",
            prop: "facePicFile",
            type: "upload",
            listType: "picture-card",
            span: 24,
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            propsHttp: {
              res: "0"
            },
            limit: 1
          },
          {
            label: "在校状态",
            prop: "curStatus",
            rules: [
              {
                required: false
              }
            ],
            span: 12,
            type: "select",
            hide: true,
            dicData: curStatusDict
          },
          {
            label: "证件类型",
            prop: "credType",
            type: "select",
            hide: true
          },
          {
            label: "证件号码",
            prop: "credNum",
            hide: true
          },
          {
            label: "证件正面",
            prop: "credPhotoObve",
            type: "upload",
            listType: "picture-card",
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            span: 24,
            limit: 1,
            propsHttp: {
              res: "0"
            },
            hide: true
          },
          {
            label: "证件反面",
            prop: "credPhotoRever",
            type: "upload",
            listType: "picture-card",
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            span: 24,
            propsHttp: {
              res: "0"
            },
            hide: true
          },
          {
            label: "籍贯",
            prop: "nativeLand",
            type: "select",
            hide: true
          },
          {
            label: "民族",
            prop: "volk",
            type: "select",
            hide: true
          },
          {
            label: "政治面貌",
            prop: "politstatus",
            type: "select",
            hide: true
          },
          {
            label: "家庭住址",
            prop: "homeAddr",
            hide: true
          },
          {
            label: "健康状况",
            prop: "health",
            hide: true
          },
          {
            label: "参加工作时间",
            prop: "inworkDate",
            type: "date",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            width: 150,
            hide: true
          },
          {
            label: "毕业院校",
            prop: "academy",
            hide: true
          },
          {
            label: "最高学历",
            prop: "education",
            hide: true
          }
        ]
      },
      obj: {}
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    handleChange(e) {
      this.fileObj = e.raw;
    },
    importClick() {
      this.importDialog = true;
    },
    async importTeacher() {
      this.importObj.importLoading = true;
      if (!this.fileObj) {
        this.$confirm("请选择文件", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        this.importObj.importLoading = false;
        this.$refs.upload.clearFiles();
        return;
      }
      try {
        let formData = new FormData();
        formData.append("file", this.fileObj);
        let res = await importTeacher(formData);
        await this.resetList();
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.fileObj = "";
        this.importObj.importLoading = false;
      } catch (err) {
        this.importObj.importLoading = false;
      }
    },
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    async rowUpdate(row, index, done, loading) {
      row.facePicFile =
        row.facePicFile && row.facePicFile.length
          ? row.facePicFile[0].value
          : "";
      row.credPhotoRever =
        row.credPhotoRever && row.credPhotoRever.length
          ? row.credPhotoRever[0].value
          : "";
      row.credPhotoObve =
        row.credPhotoRever && row.credPhotoObve.length
          ? row.credPhotoObve[0].value
          : "";
      loading(true);
      try {
        let result = await updateTeacher(row);
        this.$message.success('更新成功')
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    },
    async rowSave(row, done, loading) {
      row.facePicFile = row.facePicFile.length ? row.facePicFile[0].value : "";
      row.credPhotoRever = row.credPhotoRever.length
        ? row.credPhotoRever[0].value
        : "";
      row.credPhotoObve = row.credPhotoObve.length
        ? row.credPhotoObve[0].value
        : "";
      
      loading(true);
      try {
        let result = await addTeacher(row);
        this.$message.success('添加成功')
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    }
  }
};
</script>

<style scoped>
</style>
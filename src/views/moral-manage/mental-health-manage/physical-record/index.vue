<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
               <el-button
              v-if="permission.import"
              type="warning"
              icon="el-icon-download"
              size="small"
              @click="importClick"
            >导入</el-button>
            <el-button
              v-if="permission.export"
              type="warning"
              icon="el-icon-upload2"
              size="small"
              @click="exportExcel(`${baseUrl}/zhxyx/ryAward/export
`, [])"
            >导出</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
            <template slot="stuNumForm" slot-scope="scope" >
              <el-input :disabled="scope.row.id !== ''" clearable v-model="obj.stuNum" @click.native="openMemberModal(scope)" />
            </template>
           </avue-crud>
      </div>
     
    </div>
    <el-dialog title="体检信息导入" :visible.sync="importDialog.visible">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/体检导入模板.xlsx`">下载模板</a>
          </el-form-item>
          <el-form-item label="上传">
            <el-upload
              ref="upload"
              :on-change="handleChange"
              :file-list="importDialog.fileList"
              :auto-upload="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :loading="importDialog.importLoading" type="primary" @click="importHonor">导入</el-button>
          <el-button @click="importDialog.visible = false">取消</el-button>
        </span>
      </el-dialog>
    <member-select :count="1" default-key="loginName" v-model="memberModal.visible" :member-selected="memberModal.selectedMember" search-type="student" @save="setStudent" />
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import MemberSelect from '@/components/MemberSelect'
import { getDictById, getOrgan } from '@/utils'
import { querySemester } from '@/api/semesterManageApi'
import { queryPhysicalRecord, addPhysicalRecord, updatePhysicalRecord, deletePhysicalRecord, importPhysicalRecord } from '@/api/physicalRecordApi'
const honorTypeDict = getDictById('honorType')
export default {
  name: 'physicalRecord',
  data() {
    return {
      fn: queryPhysicalRecord,
      singleDelFn: deletePhysicalRecord,
      memberModal: {
        visible: false,
        selectedMember: []
      },
      treeParams: {
        data: getOrgan(),
        props: {
          label: 'orgName',
          value: 'id',
        },
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      importDialog: {
        visible: false,
        fileList: '',
        importLoading: false,
        orgCode: '',
        semesterName: '',
        semesterData: []
      },
      option: {
        column: [{
          label:'id',
          prop:'id',
          hide: true,
          addDisplay: false,
          editDisplay: false,
          viewDisplay: false
        }, {
          label: '学生学号',
          prop: 'stuNum',
          formslot: true,
          rules: [{
            required: true,
            message: '学生学号是必填项'
          }]
        }, {
          label: '学生姓名',
          prop: 'stuName',
          search: true,
          disabled: true,
        }, {
          label: '所属班级',
          prop: 'orgName',
          disabled: true,
          type: 'input',

        }, {
          label: '体检项目',
          prop: 'items',
          type: 'dynamic',
          span: 24,
          children: {
            column: [{
              label: 'id',
              prop: 'itemId',
              type: 'input',
              hide: true,
            }, {
              label: 'healthId',
              prop: 'healthId',
              type: 'input',
              hide: true,
            }, {
              label: '体检项目信息',
              prop: 'item',
              type: 'input',
              rules: [{
                required: true,
                message: '体检项目信息是必填项'
              }]
            }, {
              label: '体检项目数据',
              prop: 'itemValue',
              type: 'input'
            }, {
              label: '体检项目结果',
              prop: 'itemResult',
              type: 'input'
            }, {
              label: '体检项目描述',
              prop: 'itemDescription',
              type: 'input'
            }]
          }
        }, {
          label: '体检结果',
          prop: 'checkResult',
          search: true,
          rules: [{
            required: true,
            message: '体检结果是必填项'
          }]
        }, {
          label: '体检时间',
          type: 'date',
          prop: 'checkDate',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          rules: [{
            required: true,
            message: '体检时间是必填项'
          }]
        }]
      },
      obj: {}
    }
  },
  mixins: [tableCommon, permission],
  mounted() {
    this.getSemester()
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async getSemester() {
      try {
        let data = await querySemester({page: 1, rows: 10000})
        this.importDialog.semesterData = data.data.list
      } catch(err) {

      }
    },
    setStudent(data) {
      this.obj = {
        ...this.obj,
        stuName: data.data[0].userName,
        stuNum: data.data[0].value,
        orgName: data.data[0].orgName
      }
    },
    handleChange(e) {
      this.importDialog.fileList = e.raw;
    },
    async importHonor() {
      this.importDialog.importLoading = true;
      if (!this.importDialog.fileList) {
        this.$confirm("请选择文件", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        this.importDialog.importLoading = false;
        return;
      }
      try {
        const formData = new FormData();
        formData.append("file", this.importDialog.fileList);
        const res = await importPhysicalRecord(formData);
        await this.resetList();
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.importDialog.fileList = "";
        this.importDialog.importLoading = false;
        this.importDialog.visible = false;
      } catch (err) {
        this.importDialog.importLoading = false;
      }
    },
    openMemberModal(item) {
      if (item.row.id) {
        return
      }
      this.memberModal = {
        visible: true,
        selectedMember: [{
          value: this.obj.studentNo,
          label: this.obj.studentName
        }]
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let res = await updatePhysicalRecord(row)
        await this.resetList()
        loading(false)
        this.$message.success('更新成功')
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let res = await addPhysicalRecord(row)
        await this.resetList()
        loading(false)
        this.$message.success('添加成功')
        done()
      } catch(err) {
        loading(false)
      }
    },
    importClick() {
      this.importDialog.visible = true
    }
  },
  components: {
    MemberSelect
  }
}
</script>

<style>

</style>
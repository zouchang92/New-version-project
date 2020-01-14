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
              @click="exportExcel(`${baseUrl}zhxyx/ryAward/export
`, [])"
            >导出</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
            <template slot="stuDtosForm" slot-scope="scope" >
              <div>
                <el-button @click.native="openMemberModal" type="primary" size="mini" >添加学生</el-button>
                <el-table :data="obj.stuDtos">
                   <el-table-column
                     prop="stuName"
                     label="姓名"
                     width="180">
                   </el-table-column>
                   <el-table-column
                     prop="stuNum"
                     label="学号">
                   </el-table-column>
                </el-table>
              </div>
            </template>
           </avue-crud>
      </div>
     
    </div>
    <el-dialog title="导入" :visible.sync="importDialog.visible">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/morality_attendance.xlsx`">下载模板</a>
          </el-form-item>
          <el-form-item label="班级">
            <el-tree-select ref="treeSelect" :treeParams="treeParams" v-model="importDialog.orgName"/>
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
          <el-button :loading="importDialog.importLoading" type="primary" @click="importAttendance">导入</el-button>
          <el-button @click="importDialog.visible = false">取消</el-button>
        </span>
      </el-dialog>
    <member-select :count="2" default-key="loginName" v-model="memberModal.visible" :member-selected="memberModal.selectedMember" search-type="student" :search-organ="userInfo.organId" @save="setStudent" />
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import MemberSelect from '@/components/MemberSelect'
import { getDictById, getOrgan } from '@/utils'
import { queryTeachAttendance, addAttendance, deleteAttendance, deleteAttendances, importAttendance } from '@/api/teachActivityAttendanceApi'
import { mapGetters } from 'vuex'
const honorTypeDict = getDictById('honorType')
export default {
  name: 'teacherActivityAttendance',
  data() {
    return {
      fn: queryTeachAttendance,
      singleDelFn: deleteAttendance,
      delFn: deleteAttendances,
      memberModal: {
        visible: false,
        selectedMember: []
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      importDialog: {
        visible: false,
        fileList: [],
        importLoading: false,
        orgName: ''
      },
      treeParams: {
        props: {
          label: "orgName",
          value: "orgName"
        },
        data: getOrgan()
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
          label: '学生姓名',
          prop: 'stuName',
          search: true,
          addDisplay: false,
          editDisplay: false,
        }, {
          label: '所属机构',
          prop: 'orgName',
          addDisplay: false,
          editDisplay: false,
          search: true,
        }, {
          label: '学生',
          prop: 'stuDtos',
          formslot: true,
          hide: true,
          span: 24,
          rules: [{
            type: 'array',
            required: true,
            message: '学生编号是必填项'
          }]
        }, {
          label: '活动主题',
          prop: 'theme',
          search: true,
          rules: [{
            required: true,
            message: '获奖名称是必填项'
          }],
          width: 150
        }, {
          label: '缺勤日期',
          prop: 'absenteeismDate',
          type: 'datetime',
          search: true,
          valueFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd',
          rules: [{
            required: true,
            message: '缺勤日期是必填项'
          }]
        }]
      },
      obj: {
        stuDtos: []
      }
    }
  },
  mixins: [tableCommon, permission],
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    setStudent(data) {
      this.obj = {
        ...this.obj,
        stuDtos: data.data.map((n) => {
          return {
            stuName: n.label,
            stuNum: n.value,
            orgName: n.orgName
          }
        })
      }
    },
    handleChange(e) {
      this.importDialog.fileList = e.raw;
    },
    async importAttendance() {
      const { fileList, orgName } = this.importDialog
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
        formData.append('file', fileList);
        formData.append('orgName', orgName)
        const res = await importAttendance(formData);
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
      this.memberModal = {
        visible: true,
        selectedMember: this.obj.stuDtos ? this.obj.stuDtos.map((n) => ({
          label: n.stuName,
          value: n.stuNum,
          orgName: n.orgName
        })) : []
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let res = await updateComprehensiveHonor(row)
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
        row.stuDTOs = row.stuDtos
        let res = await addAttendance(row)
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    MemberSelect
  }
}
</script>

<style>

</style>
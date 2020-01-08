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
            <template slot="studentNumForm" slot-scope="scope" >
              <el-input clearable v-model="obj.studentNum" @click.native="openMemberModal(scope)" />
            </template>
           </avue-crud>
      </div>
     
    </div>
    <el-dialog title="荣誉导入" :visible.sync="importDialog.visible">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/学生档案.xlsx`">下载模板</a>
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
import { getDictById } from '@/utils'
import { queryComprehensiveHonor, deleteComprehensiveHonor, addComprehensiveHonor, updateComprehensiveHonor, importHonor } from '@/api/comprehensiveHonorApi'
const honorTypeDict = getDictById('honorType')
export default {
  name: 'comprehensiveHonor',
  data() {
    return {
      fn: queryComprehensiveHonor,
      singleDelFn: deleteComprehensiveHonor,
      memberModal: {
        visible: false,
        selectedMember: []
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      importDialog: {
        visible: true,
        fileList: '',
        importLoading: false
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
          prop: 'studentName',
          search: true,
          addDisplay: false,
          editDisplay: false,
        }, {
          label: '学生编号',
          prop: 'studentNum',
          search: true,
          formslot: true,
          rules: [{
            required: true,
            message: '学生编号是必填项'
          }]
        }, {
          label: '获奖名称',
          prop: 'title',
          rules: [{
            required: true,
            message: '获奖名称是必填项'
          }]
        }, {
          label: '获奖等级',
          prop: 'grade',
          rules: [{
            required: true,
            message: '获奖等级是必填项'
          }]
        }, {
          label: '获奖名次',
          prop: 'ranking',
          rules: [{
            required: true,
            message: '获奖名次是必填项'
          }]
        }, {
          label: '获奖类别',
          prop: 'type',
          type: 'select',
          rules: [{
            required: true,
            message: '获奖类别是必填项'
          }],
          dicData: honorTypeDict
        }, {
          label: '颁奖单位',
          prop: 'unit',
          rules: [{
            required: true,
            message: '颁奖单位是必填项'
          }]
        }, {
            label: '证书图片',
            prop: 'certPic',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24
          }]
      },
      obj: {}
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
        studentName: data.data[0].userName,
        studentNum: data.data[0].value
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
        const res = await importHonor(formData);
        await this.resetList();
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.importDialog.fileList = "";
        this.importDialog.importLoading = false;
      } catch (err) {
        this.importDialog.importLoading = false;
      }
    },
    openMemberModal(item) {
      this.memberModal = {
        visible: true,
        selectedMember: [{
          value: this.obj.studentNum,
          label: this.obj.studentName
        }]
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      row.certPic.length ? (row.certPic = row.certPic[0].url) : row.certPic = ''
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
      row.certPic.length ? row.certPic = row.certPic[0].url : row.certPic = ''
      loading(true)
      try {
        let res = await addComprehensiveHonor(row)
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
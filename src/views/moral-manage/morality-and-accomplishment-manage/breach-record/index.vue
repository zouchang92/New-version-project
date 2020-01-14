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
            <template slot="stuNumForm" slot-scope="scope" >
              <el-input :disabled="scope.row.id !== ''" clearable v-model="obj.stuNum" @click.native="openMemberModal(scope)" />
            </template>
           </avue-crud>
      </div>
     
    </div>
    <el-dialog title="违规记录导入" :visible.sync="importDialog.visible">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/morality_discipline.xlsx`">下载模板</a>
          </el-form-item>
          <el-form-item label="学期">
            <el-select v-model="importDialog.semesterName">
              <el-option v-for="(item, i) in importDialog.semesterData" :key="item.id" :value="item.name" :label="item.name" />
            </el-select>
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
import { queryBreachRecord, addBreachRecord, updateBreachRecord, undoBreach, undoBreachs, importBreach } from '@/api/breachRecordApi'
import { querySemester } from '@/api/semesterManageApi'
export default {
  name: 'breachRecord',
  data() {
    return {
      fn: queryBreachRecord,
      singleDelFn: undoBreach,
      delFn: undoBreachs,
      memberModal: {
        visible: false,
        selectedMember: []
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      importDialog: {
        visible: false,
        fileList: '',
        importLoading: false,
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
          search: true,
          formslot: true,
          rules: [{
            required: true,
            message: '学生学号是必填项'
          }]
        }, {
          label: '学生姓名',
          prop: 'stuName',
          search: true,
          disabled: true
        }, {
          label: '所属班级',
          prop: 'orgCode',
          type: 'tree',
          disabled: true,
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'id'
          },
          rules: [{
            required: true,
            message: '所属班级是必填项'
          }]
        }, {
          label: '学期',
          prop: 'semesterName',
          type: 'select',
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
          dicMethod: 'post',
          dicQuery:{
            page: 1,
            rows: 100000,
          },
          props: {
            res: 'data.list',
            label: 'name',
            value: 'name'
          },
          rules: [{
            required: true,
            message: '学期是必填项'
          }]
        }, {
          label: '违纪情况',
          prop: 'discipline',
          rules: [{
            required: true,
            message: '违纪情况是必填项'
          }]
        }, {
          label: '违纪时间',
          prop: 'disciplineTime',
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          format: 'yyyy-MM-dd',
          rules: [{
            required: true,
            message: '违纪时间是必填项'
          }]
        }, {
          label: '违纪类型',
          prop: 'type',
          rules: [{
            required: true,
            message: '违纪类型是必填项'
          }]
        }, {
          label: '违纪图片',
          prop: 'disciplinePic',
          type: 'upload',
          action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
          limit: 4,
          propsHttp: {
            res: '0'
          },
          listType: 'picture-card',
          span: 24,
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
        orgCode: data.data[0].organId
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
        formData.append("semesterName", this.importDialog.semesterName);
        const res = await importBreach(formData);
        await this.resetList();
        this.$refs.upload.clearFiles();
        this.$message.success("导入成功");
        this.importDialog.fileList = "";
        this.importDialog.importLoading = false;
        this.importDialog.visible = false;
      } catch (err) {
        console.log(err)
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
      const orgs = row.$orgCode.split('/')
      row.orgName = orgs[orgs.length - 1]
      row.disciplinePic ? row.disciplinePic = row.disciplinePic.map(n => n.value).join(',') : ''
      loading(true)
      try {
        let res = await updateBreachRecord(row)
        await this.resetList()
        loading(false)
        this.$message.success('更新成功')
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      const orgs = row.$orgCode.split('/')
      row.orgName = orgs[orgs.length - 1]
      row.disciplinePic ? row.disciplinePic = row.disciplinePic.map(n => n.value).join(',') : ''
      loading(true)
      try {
        let res = await addBreachRecord(row)
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
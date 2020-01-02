<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          v-model="obj"
          :permission="permission"
          row-key="id"
          :table-loading="tableListLoading"
          :page="page"
          :data="tableList"
          :option="option"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
        >
          <template slot="searchMenu">
            <el-button v-if="permission.addBtn" type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
            <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small" @click="importClick">导入</el-button>
            <el-button
              v-if="permission.export"
              type="warning"
              icon="el-icon-upload2"
              size="small"
              @click="exportExcel(`${baseUrl}zhxyx/student/export
`, ['organId', 'curStatus'])"
            >导出</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small" @click="batchDel()">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle @click="initList()" />
          </template>
        </avue-crud>
      </div>
      <el-dialog title="学生导入" :visible.sync="importDialog">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/学生档案.xlsx`">下载模板</a>
          </el-form-item>
          <el-form-item label="上传">
            <el-upload
              ref="upload"
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :loading="importObj.importLoading" type="primary" @click="importStudent">导入</el-button>
          <el-button @click="importDialog = false">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryStudent, addStudent, delStudent, delStudents, updateStudent, importStudent } from '@/api/studentManageApi'
import { getOrgan, getDictById } from '@/utils'
const genderDict = getDictById('gender')
const curStatusDict = getDictById('curStatus')
const relationDict = getDictById('guardianRelation')
const certTypeDict = getDictById('certificateType')
const nationDic = getDictById('nation')
const politicCountenanceDic = getDictById('politicCountenance')
const enrollmentDic = getDictById('enrollmentType')
const yearDic = getDictById('year')
export default {
  name: 'StudentManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      fileList: [],
      importDialog: false,
      fn: queryStudent,
      delFn: delStudents,
      singleDelFn: delStudent,
      data: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      fileObj: '',
      importObj: {
        importLoading: false
      },
      option: {
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: '所在班级',
            prop: 'organId',
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            rules: [{
              required: true,
              message: '所在班级是必填项'
            }],
            searchSpan: 8
          },
          {
            label: '姓名',
            prop: 'userName',
            rules: [{
              required: true,
              message: '姓名是必填项'
            }]
          },
          {
            label: '学号',
            prop: 'loginName',
            width: 150,
            rules: [{
              required: true,
              message: '学号是必填项'
            }],
            editDisplay: false
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            dicData: genderDict,
            rules: [{
              required: true,
              message: '性别是必填项'
            }]
          },
          {
            label: '在校状态',
            prop: 'curStatus',
            search: true,
            span: 12,
            type: 'select',
            dicData: curStatusDict,
            rules: [{
              required: true,
              message: '在校状态是必填项'
            }]
          },
          {
            label: '全国学籍号',
            prop: 'nationNum',
            width: 200,
            hide: true
          },
          {
            label: '入学时间',
            prop: 'initDtm',
            type: 'datetime',
            hide: true
          },
          {
            label: '入学序号',
            prop: 'initNum',
            hide: true
          },
          {
            label: '监护人姓名',
            prop: 'guarder',
            width: 150,
            hide: true
          },
          {
            label: '监护人关系',
            prop: 'guarderRelation',
            type: 'select',
            width: 150,
            hide: true,
            dicData: relationDict
          },
          {
            label: '监护人电话',
            prop: 'guarderTel',
            width: 150,
            hide: true
          },
          {
            label: '入学信息备注',
            prop: 'inMemo',
            width: 150,
            hide: true
          },
          {
            label: '照片',
            prop: 'facePicFile',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12
          },
          {
            label: '证件类型',
            prop: 'credType',
            type: 'select',
            width: 150,
            hide: true,
            dicData: certTypeDict
          },
          {
            label: '证件正面',
            prop: 'credPhotoObve',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            hide: true
          },
          {
            label: '证件反面',
            prop: 'credPhotoRever',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            hide: true
          },
          {
            label: '籍贯',
            prop: 'nativeLand',
            type: 'input',
            hide: true
          },
          {
            label: '证件号码',
            prop: 'credNum',
            width: 200,
            hide: true
          },
          {
            label: '民族',
            prop: 'volk',
            type: 'select',
            hide: true,
            dicData: nationDic
          },
          {
            label: '政治面貌',
            prop: 'politstatus',
            type: 'select',
            hide: true,
            dicData: politicCountenanceDic
          },
          {
            label: '家庭住址',
            prop: 'homeAddr',
            hide: true
          },
          {
            label: '来源',
            prop: 'comefromType',
            hide: true
          },
          {
            label: '录取分数',
            prop: 'score',
            hide: true
          },
          {
            label: '插班标注',
            prop: 'inClassType',
            hide: true
          },
          {
            label: '生源类别',
            prop: 'stuType',
            hide: true
          },
          {
            label: '就读方式',
            prop: 'schoolType',
            hide: true,
            type: 'select',
            dicData: enrollmentDic
          }
        ],
        group: [{
          label: '本人信息',
          prop: 'brxx',
          icon: 'el-icon-edit-outline',
          column: [{
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: '所在班级',
            prop: 'organId',
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            rules: [{
              required: true,
              message: '所在班级是必填项'
            }],
            searchSpan: 8
          },
          {
            label: '姓名',
            prop: 'userName',
            rules: [{
              required: true,
              message: '姓名是必填项'
            }]
          },
          {
            label: '学号',
            prop: 'loginName',
            width: 150,
            rules: [{
              required: true,
              message: '学号是必填项'
            }]
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            dicData: genderDict,
            rules: [{
              required: true,
              message: '性别是必填项'
            }]
          },
          {
            label: '在校状态',
            prop: 'curStatus',
            rules: [{
              required: false
            }],
            search: true,
            span: 12,
            type: 'select',
            dicData: curStatusDict,
            rules: [{
              required: true,
              message: '在校状态是必填项'
            }]
          },
          {
            label: '全国学籍号',
            prop: 'nationNum',
            rules: [{
              required: false
            }],
            width: 200,
            hide: true
          },
          {
            label: '入学时间',
            prop: 'initDtm',
            type: 'datetime',
            hide: true
          },
          {
            label: '入学序号',
            prop: 'initNum',
            hide: true
          },
          {
            label: '入学信息备注',
            prop: 'inMemo',
            type: 'textarea',
            span: 24,
            width: 150,
            hide: true
          },
          {
            label: '照片',
            prop: 'facePicFile',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24
          },
          {
            label: '证件正面',
            prop: 'credPhotoObve',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            hide: true
          },
          {
            label: '证件反面',
            prop: 'credPhotoRever',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            hide: true
          },
          {
            label: '证件类型',
            prop: 'credType',
            type: 'select',
            width: 150,
            hide: true,
            dicData: certTypeDict
          },
          {
            label: '证件号码',
            prop: 'credNum',
            width: 200,
            hide: true
          },
          {
            label: '籍贯',
            prop: 'nativeLand',
            type: 'input',
            hide: true
          },

          {
            label: '民族',
            prop: 'volk',
            type: 'select',
            hide: true,
            dicData: nationDic
          },
          {
            label: '政治面貌',
            prop: 'politstatus',
            type: 'select',
            hide: true,
            dicData: politicCountenanceDic
          },
          {
            label: '家庭住址',
            prop: 'homeAddr',
            hide: true
          },
          {
            label: '来源',
            prop: 'comefromType',
            hide: true
          },
          {
            label: '录取分数',
            prop: 'score',
            hide: true
          },
          {
            label: '插班标注',
            prop: 'inClassType',
            hide: true
          },
          {
            label: '生源类别',
            prop: 'stuType',
            hide: true
          },
          {
            label: '就读方式',
            prop: 'schoolType',
            hide: true,
            type: 'select',
            dicData: enrollmentDic
          }]
        }, {
          label: '家长信息',
          prop: 'jzxx',
          icon: 'el-icon-edit-outline',
          column: [{
            label: '家长姓名',
            prop: 'guarder',
            width: 150,
            hide: true
          },
          {
            label: '家长关系',
            prop: 'guarderRelation',
            type: 'select',
            width: 150,
            hide: true,
            dicData: relationDict
          },
          {
            label: '家长电话',
            prop: 'guarderTel',
            width: 150,
            hide: true
          }]
        }]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    async importStudent() {
      this.importObj.importLoading = true
      if (!this.fileObj) {
        this.$confirm('请选择文件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.importObj.importLoading = false
        return
      }
      try {
        const formData = new FormData()
        formData.append('file', this.fileObj)
        const res = await importStudent(formData)
        await this.resetList()
        this.$refs.upload.clearFiles()
        this.$message.success('导入成功')
        this.fileObj = ''
        this.importObj.importLoading = false
      } catch (err) {
        this.importObj.importLoading = false
      }
    },
    handleChange(e) {
      this.fileObj = e.raw
    },
    importClick() {
      this.importDialog = true
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      row.credPhotoObve.length ? row.credPhotoObve = row.credPhotoObve[0].value : row.credPhotoObve = ''
      row.credPhotoRever.length ? row.credPhotoRever = row.credPhotoRever[0].value : row.credPhotoRever = ''
      row.facePicFile.length ? row.facePicFile = row.facePicFile[0].value : row.facePicFile = ''
      try {
        const result = await updateStudent(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      row.credPhotoObve.length ? row.credPhotoObve = row.credPhotoObve[0].value : row.credPhotoObve = ''
      row.credPhotoRever.length ? row.credPhotoRever = row.credPhotoRever[0].value : row.credPhotoRever = ''
      row.facePicFile.length ? row.facePicFile = row.facePicFile[0].value : row.facePicFile = ''
      try {
        const result = await addStudent(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    }
  }
}
</script>

<style scoped>

</style>

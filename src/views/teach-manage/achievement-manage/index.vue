<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" @click.native="importBtnClick" icon="el-icon-download" size="small">导入</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
      <el-dialog title="成绩导入" :visible.sync="importDialog">
        <avue-form ref="form" @submit="importScore" v-model="importObj" :option="importConfig">
          <template slot-scope="scope" slot="downloadTemplate">
            <div>
              <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/stuScore_module.xlsx`" >下载模板</a>
            </div>
          </template>
        </avue-form>
      </el-dialog>  
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { importAchievement, queryAchievement } from '@/api/achievementManageApi'
import { phoneReg, credNumReg } from '@/utils/validate'
import { getOrgan, getDictById } from '@/utils'
import _ from 'lodash'

const genderDict = getDictById('gender')
const examType = getDictById('examType')

export default {
  name: 'achievementImport',
  mixins: [tableCommon, permission],
  data() {
    return {
      fn: queryAchievement,
      data: [],
      importDialog: false,
      importObj: {},
      baseUrl: process.env.VUE_APP_BASE_API,
      importConfig: {
        column: [{
          label: '所属班级',
          prop: 'orgId',
          type: 'cascader',
          span: 24,
          search: true,
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'id'
          },
          rules: {
            required: true,
            message: '班级是必填项'
          }
        }, {
          label: '学期',
          prop: 'semesterName',
          type: 'select',
          span: 24,
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
          dicMethod: 'post',
          dicQuery:{
            page: 1,
            rows: 100000,
          },
          props: {
            res: 'data.list',
            label: 'name',
            value: 'id'
          },
          rules: {
            required: true,
            message: '学期是必填项'
          }
        },{
          label: '科目',
          prop: 'course',
          type: 'select',
          span: 24,
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/course/queryAll',
          dicMethod: 'post',
          dicQuery:{
            page: 1,
            rows: 100000,
          },
          props: {
            res: 'data.list',
            label: 'name',
            value: 'id'
          },
          rules: {
            required: true,
            message: '科目是必填项'
          }
        }, {
          label: '考试批次',
          prop: 'examType',
          span: 24,
          type: 'select',
          dicData: examType,
          rules: {
            required: true,
            message: '考试批次是必填项'
          }
        }, {
          label: '老师',
          prop: 'teacherName',
          span: 24,
          type: 'select',
        }, {
          label:'下载模板',
          prop:'downloadTemplate',
          type: 'input',
          span: 24,
          formslot: true
        }, {
          label:'上传文件',
          prop:'excelPath',
          type: 'upload',
          action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
          limit: 1,
          propsHttp: {
            res: '0'
          },
          span: 24,
          rules: {
            required: true,
            message: '模板是必填项'
          }
        }]
      },
      option: {
        column: [{
          label: '所属班级',
          prop: 'orgName',
          type: 'cascader',
          span: 24,
          search: true,
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'orgName'
          },
          rules: {
            required: true,
            message: '班级是必填项'
          }
        }, {
          label: '学期',
          prop: 'semesterName',
          type: 'select',
          span: 24,
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
          dicMethod: 'post',
          search: true,
          dicQuery:{
            page: 1,
            rows: 100000,
          },
          props: {
            res: 'data.list',
            label: 'name',
            value: 'name'
          },
          rules: {
            required: true,
            message: '学期是必填项'
          }
        },{
          label: '科目',
          prop: 'course',
          type: 'select',
          search: true,
          span: 24,
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/course/queryAll',
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
          rules: {
            required: true,
            message: '科目是必填项'
          }
        }, {
          label: '考试批次',
          prop: 'examType',
          span: 24,
          search: true,
          type: 'select',
          dicData: examType,
          props: {
            value: 'label'
          },
          rules: {
            required: true,
            message: '考试批次是必填项'
          }
        }, {
          label: '老师',
          prop: 'teacherName',
          span: 24,
          type: 'select',
        }]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    importBtnClick() {
      this.importDialog = true
    },
    async importScore(data, done) {
      try {
        data.orgName = data.$orgId
        data.semesterName = data.$semesterName
        data.examType = [data.$examType]
        data.course = data.$course
        data.orgId = data.orgId[data.orgId.length - 1]
        data.excelPath = process.env.VUE_APP_FTP_BASE_URL + data.excelPath[0].value
        let res = await importAchievement(data)
        this.$message.success('导入成功')
        this.importDialog = false
        this.$refs.form.resetForm()
        await this.resetList()
        done()
      } catch(err) {
        done()
      }
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    rowDel(row, index) {
      
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
      
    },
  }
}
</script>

<style scoped>

</style>
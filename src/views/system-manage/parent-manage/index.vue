<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button @click="importClick" v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.export" @click="exportExcel(`${baseUrl}zhxyx/parent/export
`, ['userName'])" type="warning" icon="el-icon-download" size="small">导出</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     <el-dialog title="家长导入" :visible.sync="importDialog">
        <el-form>
          <el-form-item label="下载模板">
            <a style="color: blue" :href="`${baseUrl}/zhxyx/res/mod/学生档案.xlsx`">下载模板</a>
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
          <el-button :loading="importObj.importLoading" type="primary" @click="importParent">导入</el-button>
          <el-button @click="importDialog = false">取消</el-button>
        </span>
      </el-dialog>  
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryParent, updateParent, addParent, delParent, delParents, importParent } from '@/api/parentManageApi'
import { phoneReg, credNumReg } from '@/utils/validate'
import { getOrgan, getDictById } from '@/utils'
import _ from 'lodash'

const genderDict = getDictById('gender')


export default {
  name: 'parentManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      fn: queryParent,
      delFn: delParents,
      singleDelFn: delParent,
      baseUrl: process.env.VUE_APP_BASE_API,
      data: [],
      importDialog: false,
      fileList: [],
      fileObj: '',
      importObj: {
        importLoading: false
      },
      option: {
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'姓名',
            prop:'userName',
            span: 24,
            search: true,
            searchSpan: 4,
            rules: {
              required: true,
              message: '姓名是必填项'
            },
          },
          {
            label:'账号',
            prop:'loginName',
            span: 24,
            search: true,
            searchSpan: 4,
            rules: {
              required: true,
              message: '账号是必填项'
            },
          },
          {
            label:'性别',
            prop:'gender',
            span: 24,
            type: 'radio',
            searchSpan: 3,
            dicData: genderDict,
          },
          {
            label:'电话',
            prop:'tel',
            span: 24,
            width: 150,
            rules: [{
              required: true,
              message: '电话是必填项'
            }, {
              pattern: phoneReg,
              message: '请输入正确的电话号码'
            }]
          },
          {
            label:'身份证',
            prop:'credNum',
            span: 24,
            width: 200,
            rules: [{
              required: true,
              message:'身份证是必填项'
            }, {
              pattern: credNumReg,
              message: '请输入正确的身份证'
            }]
          },
          {
            label:'照片',
            prop:'facePicFile',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24,
          },
        ]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    importClick() {
      this.importDialog = true
    },
    async importParent() {
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
        let formData = new FormData()
        formData.append('file', this.fileObj)
        let res = await importParent(formData)
        await this.resetList()
        this.$refs.upload.clearFiles()
        this.$message.success('导入成功')
        this.fileObj = ''
        this.importObj.importLoading = false
      } catch(err) {
        this.importObj.importLoading = false
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
        let result = await updateParent(row)
        console.log(result)
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
        let result = await addParent(row)
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
<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button @click="batchDel" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryParent, updateParent, addParent, delParent, delParents } from '@/api/parentManageApi'
import { phoneReg, credNumReg } from '@/utils/validate.js'
import { getOrgan, getDictById } from '@/utils'
import _ from 'lodash'

const genderDict = getDictById('DXAWXGKHTCZMPNOZRPRHLPHSUZWLUCSD')

export default {
  name: 'parentManage',
  mixins: [tableCommon],
  data() {
    return {
      fn: queryParent,
      delFn: delParents,
      singleDelFn: delParent,
      data: [],
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
              message: '姓名'
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
            action: "http://192.168.1.125:8998/zhxyx/upload/file",
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
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    rowDel(row, index) {
      
    },
    async rowUpdate(row, done, loading) {
      loading(true)
      try {
        row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
        let result = await updateParent(row)
        await this.resetList()
        done()
      } catch(err) {
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
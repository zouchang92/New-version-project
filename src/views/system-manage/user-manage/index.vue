<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <el-card class="box-card">
          <avue-crud @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button @click="batchDel" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
         </el-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryUsers, addUser, delUser, batchDel } from '@/api/userManageApi'
import { phoneReg, credNumReg } from '@/utils/validate.js'
import _ from 'lodash'
export default {
  name: 'studentManage',
  mixins: [tableCommon],
  data() {
    return {
      fn: queryUsers,
      delFn: batchDel,
      singleDelFn: delUser,
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
            label:'账号',
            prop:'loginName',
            rules: {
              required: true,
              message: '账号是必填项'
            },
            width: 200,
            span: 24,
            search: true,
            searchSpan: 4,
          },
          {
            label:'用户名',
            prop:'userName',
            span: 24,
            search: true,
            searchSpan: 4,
            rules: {
              required: true,
              message: '用户名是必填项'
            },
          },
          {
            label:'性别',
            prop:'gender',
            span: 24,
            type: 'radio',
            searchSpan: 3,
            dicData: [{
              value: 'M',
              label: '男'
            }, {
              value: 'F',
              label: '女'
            }],
          },
          {
            label:'组织机构',
            prop:'organId',
            span: 24,
            type: 'tree',
            searchSpan: 4,
            dicData: [{
              value: 'M',
              label: '男'
            }, {
              value: 'F',
              label: '女'
            }],
            search: true,
          },
          {
            label:'电话',
            prop:'phone',
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
            label:'生日',
            prop:'birthday',
            span: 24,
            type: 'date',
            format: 'yyyy-MM-dd',
            width: 150
          },
          {
            label:'入校时间',
            prop:'entryDay',
            span: 24,
            type: 'date',
            format: 'yyyy-MM-dd',
            width: 150
          },
          {
            label:'描述',
            prop:'description',
            span: 24,
            width: 100
          },
          {
            label:'密码',
            prop:'password',
            span: 24,
            type: 'password'
          },
          {
            label:'照片',
            prop:'photo',
            type: 'upload',
            action: "http://192.168.1.125:8999/zhxyx/upload/file",
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24,
          },
          {
            label: "人员类型",
            prop: "orgType",
            type: 'select',
            span: 24
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
    rowUpdate(row, done, loading) {
      console.log(row)
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        delete row.$gender
        delete row.$organId
        row.photo = row.photo.length ? row.photo[0].value : ''
        let result = await addUser(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
      
    },
  }
}
</script>

<style scoped>

</style>
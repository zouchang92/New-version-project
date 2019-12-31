<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          v-model="obj"
          :permission="permission"
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
            <!--<el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>-->
            <el-button v-if="permission.changePassword" type="info" icon="el-icon-lock" size="small" @click="batchReset">批量重置密码</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small" @click="batchDel">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle @click="initList()" />
          </template>
        </avue-crud>
      </div>
    </div>
    <el-dialog :visible.sync="dialogShow">
      <avue-form ref="resetPassword" v-model="passwordObj" :option="passwordOption" />
    </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryUsers, addUser, updateUser, delUser, batchDel, batchResetPassword } from '@/api/userManageApi'
import { phoneReg, credNumReg } from '@/utils/validate.js'
import { getOrgan, getDictById } from '@/utils'
import _ from 'lodash'

const genderDict = getDictById('gender')
const orgTypeDict = getDictById('orgType')

export default {
  name: 'StudentManage',
  mixins: [tableCommon, permission],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordObj.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      fn: queryUsers,
      delFn: batchDel,
      singleDelFn: delUser,
      data: [],
      selectedId: '',
      dialogShow: false,
      passwordOption: {
        labelWidth: 125,
        column: [{
          label: '旧密码',
          prop: 'oldPassword',
          span: 24,
          rules: {
            required: true,
            message: '旧密码是必填项'
          }
        }, {
          label: '新密码',
          prop: 'password',
          span: 24,
          rules: {
            required: true,
            message: '新密码是必填项'
          }
        }, {
          label: '请再次输入密码',
          prop: 'rePassword',
          span: 24,
          rules: [{ validator: validatePass2, trigger: 'blur' }]
        }]
      },
      passwordObj: {

      },
      option: {
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '组织机构',
            prop: 'organId',
            span: 24,
            type: 'tree',
            searchSpan: 4,
            dicData: getOrgan(),
            rules: {
              required: true,
              message: '组织机构是必填项'
            },
            props: {
              label: 'orgName',
              value: 'id'
            },
            search: true
          },
          {
            label: '角色',
            prop: 'roleIds',
            span: 24,
            type: 'select',
            multiple: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/role/queryAll',
            dicMethod: 'post',
            hide: true,
            rules: {
              required: true,
              message: '角色是必填项'
            },
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'roleName',
              value: 'id'
            }
          },
          {
            label: '人员类型',
            prop: 'orgType',
            type: 'select',
            search: true,
            searchSpan: 4,
            span: 24,
            rules: {
              required: true,
              message: '人员类型是必填项'
            },
            dicData: orgTypeDict
          },
          {
            label: '账号',
            prop: 'loginName',
            rules: {
              required: true,
              message: '账号是必填项'
            },
            width: 200,
            span: 24,
            search: true,
            searchSpan: 4,
            editDisplay: false
          },
          {
            label: '姓名',
            prop: 'userName',
            span: 24,
            search: true,
            searchSpan: 4,
            width: 150,
            rules: {
              required: true,
              message: '用户名是必填项'
            }
          },
          {
            label: '性别',
            prop: 'gender',
            span: 24,
            type: 'radio',
            searchSpan: 3,
            dicData: genderDict
          },

          {
            label: '手机电话',
            prop: 'phone',
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
            label: '身份证',
            prop: 'credNum',
            span: 24,
            width: 200,
            rules: [{
              required: true,
              message: '身份证是必填项'
            }, {
              pattern: credNumReg,
              message: '请输入正确的身份证'
            }],
            hide: true
          },
          {
            label: '生日',
            prop: 'birthday',
            span: 24,
            type: 'date',
            format: 'yyyy-MM-dd',
            width: 150,
            hide: true
          },
          {
            label: '入校时间',
            prop: 'entryDay',
            span: 24,
            type: 'date',
            format: 'yyyy-MM-dd',
            width: 150,
            hide: true
          },
          {
            label: '描述',
            prop: 'description',
            span: 24,
            width: 100,
            hide: true
          },
          {
            label: '密码',
            prop: 'password',
            span: 24,
            type: 'password',
            hide: true,
            editDisplay: false
          },
          {
            label: '照片',
            prop: 'photo',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24
          }
        ]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    async batchReset() {
      if (!this.tableSelected.length) {
        this.$message({
          type: 'warning',
          message: '请选中至少一条记录'
        })
        return
      }
      try {
        await this.$confirm('此操作将重置这些用户的密码,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        })
        const ids = _.map(this.tableSelected, n => n.id)
        const res = await batchResetPassword(ids)
        this.$message.success('密码重置成功')
        this.$refs.resetPassword.resetForm()
        this.dialogShow = false
      } catch (err) {
      }
    },
    openPasswordDialog(row) {
      this.dialogShow = true
      this.selectedId = row.id
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    rowDel(row, index) {

    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        delete row.$gender
        delete row.$organId
        row.photo = row.photo && row.photo.length ? row.photo[0].value : ''
        const result = await updateUser(row)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        delete row.$gender
        delete row.$organId
        row.photo = row.photo.length ? row.photo[0].value : ''
        const result = await addUser(row)
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

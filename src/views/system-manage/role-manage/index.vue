<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="permission" slot-scope="scope" >
              <el-button @click.native="setAuthorize(scope)">设置菜单权限</el-button>
            </template>
            <template slot="searchMenu">
              <el-button type="success" v-if="permission.addBtn" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="info" @click="resetList()" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
      <el-dialog :visible.sync="roleModal.visible">
        <div style="height: 450px;overflow: auto;" v-loading="roleModal.loading" class="">
          <el-tabs type="border-card">
             <el-tab-pane label="菜单权限">
                <el-tree ref="authTree" :default-checked-keys="roleModal.defaultCheckedKeys" show-checkbox node-key="id" :data="roleModal.data" :props="treeProps">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                   <i :class="{'el-icon-menu' : data.menuName, 'el-icon-edit-outline': data.buttonId}"></i>
                    <span>
                      {{data.buttonId ? data.name : data.menuName}}
                    </span>
                    <span>
                      <i :class="data.belongSystem === '0' ? 'el-icon-monitor' : 'el-icon-mobile-phone'" />
                    </span>
                  </span>
                </el-tree>
             </el-tab-pane>
          </el-tabs>
         
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="roleModal.submitLoading"  @click="bindAuthorize">确定</el-button>
          <el-button @click="roleModal.visible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryRoles, addRole, deleteRole, updateRole, getRoleAuthorize, roleBindMenus } from '@/api/roleManageApi'
import _ from 'lodash'
export default {
  name: 'roleManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      roleModal: {
        visible: false,
        loading: false,
        data: [],
        defaultCheckedKeys: [],
        submitLoading: false,
        currentRoleId: ''
      },
      treeProps: {
        children: 'data',
        label: 'name',

      },
      singleDelFn: deleteRole,
      fn: queryRoles,
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
            label:'角色名称',
            prop:'roleName',
            rules: {
              required: true,
            },
            width: 200,
            search: true
          },
          {
            label: '备注',
            prop: 'description',
            rules: {
              required: false,
            },
          },
          {
            label:'权限',
            prop:'permission',
            rules: {
              required: false,
            },
            width: 200,
            slot: true,
            addDisplay: false,
            editDisplay: false,
          },
          {
            label: '创建时间',
            prop: 'createTime',
            rules: {
              required: false,
            },
            type: 'datetime',
            format: 'yyyy-MM-DD HH:mm:ss',
            width: 200,
            addDisplay: false,
            editDisplay: false
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
    async setAuthorize(row) {
      this.roleModal.loading = true
      this.roleModal.visible = true
      this.roleModal.currentRoleId = row.row.id
      try {
        let data = await getRoleAuthorize(row.row.id)
        let pData = data.data.map(n => ({...n, id: n.menuId}))
        this.roleModal = {
          ...this.roleModal,
          loading: false,
          visible: true,
          data: pData
        }
        this.roleModal.defaultCheckedKeys = this.getDefaultCheck(pData)
      } catch(err) {
        this.roleModal.loading = false
        this.roleModal.visible = true
      }
    },
    getDefaultCheck(data, checkArray = []) {
      data.forEach(n => {
        if (n.menuName) {
          if (!n.data.length && n.status === 1) {
            checkArray.push(n.id)
          }
        } else {
          if (n.status === 1) {
            checkArray.push(n.id)
          }
        }
        if (n.data && n.data.length) {
          this.getDefaultCheck(n.data, checkArray)
        }
      })
      return checkArray
    },
    async bindAuthorize() {
      this.roleModal.submitLoading = true
      let result = this.$refs.authTree.getCheckedNodes(false, true)
      try {
       let res = await roleBindMenus({
         roleId: this.roleModal.currentRoleId,
         menuIds: this.assembleMenuJson(result)
       })
       this.roleModal.submitLoading = false
       this.roleModal.visible = false
      } catch(err) {
        this.roleModal.submitLoading = false
        this.roleModal.visible = false
      }
    },
    assembleMenuJson(result) {
      let output = []
      let data = _.cloneDeep(result)
      _.forEach(data, function (n) {
        let tmp = {}
        if (n.menuName) {
          tmp.id = n.id
          tmp.buttons = []
          if (n.data.length) {
            n.data.forEach(x => {
              let exist = data.find(j => j.id === x.id)
              if (exist) {
                tmp.buttons.push({
                  buttonId: exist.buttonId,
                  buttonUrl: exist.buttonUrl
                })
              }
            })
          }
          output.push(tmp)
        }
      })
      return output
    },
    uploadBefore(file, done) {
      alert(1)
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        row.name = row.roleName
        let result = await updateRole(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        row.name = row.roleName
        let result = await addRole(row)
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
.custom-tree-node {
  font-size: 14px;
  padding-right: 8px;
}
</style>
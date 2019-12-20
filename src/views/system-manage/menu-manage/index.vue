<template>
  <div>
    <div class="menu-container">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-card>
            <el-input size="small"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <el-tree ref="tree" @node-click="nodeClick" :filter-node-method="filterNode" node-key="id" :props="treeOption.props" :data="treeData">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <i :class="data.belongSystem === '0' ? 'el-icon-monitor' : 'el-icon-mobile-phone'" />
                </span>
                </span>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <el-form :inline="true">
              <el-form-item>
                <el-button icon="el-icon-plus" @click="changeMode('add')" style="height: 32px;line-height: 12px" size="medium" type="primary">添加</el-button>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-edit" @click="changeMode('edit')" style="height: 32px;line-height: 12px" size="medium" type="primary">编辑</el-button>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-delete" @click="deleteMenu" style="height: 32px;line-height: 12px" size="medium" type="danger">删除</el-button>
              </el-form-item>
            </el-form>
            <el-form ref="form" :model="formData" :rules="rules" label-width="80px" label-position="right" size="small">
              <el-form-item label="菜单名称" prop="name">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="菜单编码" prop="menuUrl">
                <el-input v-model="formData.menuUrl"></el-input>
              </el-form-item>
              <el-form-item label="隶属系统" prop="belongSystem">
                <el-select v-model="formData.belongSystem">
                  <el-option v-for="(item, i) in systemDict" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="上级菜单">
                <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="treeData" v-model="formData.parentId"/>
              </el-form-item>
              <el-form-item label="菜单图标">
                <el-input v-model="formData.menuIcon"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="formData.sort"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="formData.description"></el-input>
              </el-form-item>
              <el-form-item v-if="!formData.hasChildren" label="三级菜单">
                <el-switch
                  v-model="formData.threeMenu">
                </el-switch>
              </el-form-item>
              <el-form-item v-if="!formData.hasChildren" label="绑定按钮">
                <div v-loading="btnManage.buttonLoading" class="button-list">
                  <el-tag style="margin-right: 10px" @close="handleClose(item.id)" v-for="(item, i) in selectedButtons" :key="i" closable>{{item.name}}</el-tag>
                  <el-button
                    class="input-new-tag"
                    @click="addNewButton"
                    size="small"
                    icon="el-icon-plus"
                  >添加按钮</el-button>
                </div>
              </el-form-item>
            </el-form>
            <el-form label-width="80px" label-position="right" size="small">
              <el-form-item>
                <el-col :span="2">
                  <el-button :loading="updateLoading" @click="organSubmit" size="mini" type="primary">{{this.mode === 'edit' ? '修改' : '添加'}}</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加按钮" :visible.sync="btnManage.dialogVisible">
      <div v-loading="btnManage.allBtnLoading">
        <el-transfer :titles="['按钮列表', '已选按钮']" v-model="btnManage.buttonIds" :data="btnManage.allBtns"></el-transfer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { listMenuTree, addMenu, updateMenu, deleteMenu, queryBtnByMenuId, menuBindButtons } from '@/api/menuManageApi'
import { queryBtns } from '@/api/buttonManageApi'
import { interArrayTree, getDictById } from '@/utils'

const systemDict = getDictById('belongSystem')
export default {
  name: 'menuManage',
  data() {
    return {
      systemDict,
      mode: 'add',
      updateLoading: false,
      filterText: '',
      searchForm: {
        id: ''
      },
      btnManage: {
        buttonLoading: false,
        allBtnLoading: false,
        dialogVisible: false,
        buttonIds: [],
        allBtns: [],
      },
      formData: {
        name: '',
        parentId: '',
        menuUrl: '',
        menuIcon: '',
        belongSystem: '0',
        description: '',
        hasChildren: false,
        threeMenu: false,
        id: '',
        sort: '',
      },
      treeParams: {
        props: {
          label: 'name',
          value: 'id',
        },
        data: []
      },
      treeData: [],
      rules: {
        name: {
          required: true,
          message: '菜单名称是必填项'
        },
        menuUrl: {
          required: true,
          message: '菜单编码是必填项'
        },
        belongSystem: {
          required: true,
          message: '隶属系统是必填项'
        }
      },
      treeOption: {
        expandAll: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        props: {
          label: 'name',
          value: 'id',
        }
      },
    }
  },
  mounted() {
    this.getMenuTree()
    this.queryAllBtns()
  },
  methods: {
    async deleteMenu() {
      try {
        await this.$confirm('是否删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$message.success('删除成功')
        await deleteMenu(this.formData.id)
        await this.getMenuTree()
      } catch(err) {

      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleClose(id) {
      let index = this.btnManage.buttonIds.findIndex(n => n === id)
      this.btnManage.buttonIds.splice(index, 1)
    },
    async organSubmit() {
      this.updateLoading = true
      let id = ''
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            if (this.mode === 'add') {
              if (!this.formData.parentId) {
                this.formData.parentId = 'root'
              }
              let res = await addMenu(this.formData)
              id = res.menuId
              this.$message.success('添加成功')
            } else {
              await updateMenu(this.formData)
              this.$message.success('更新成功')
            }
            if (this.selectedButtons.length) {
              await menuBindButtons({
                id: this.mode === 'add' ? id : this.formData.id,
                buttons: this.selectedButtons
              })
            } 
            this.updateLoading = false
            this.getMenuTree()
        } catch(err) {
          this.updateLoading = false
        }
        } else {
          this.updateLoading = false
        }
      })
      
      
      
    },
    async queryBtns(id) {
      this.btnManage.buttonLoading = true
      try {
        let res = await queryBtnByMenuId(id)
        this.btnManage.buttons = res.data
        this.btnManage = {
          ...this.btnManage,
          buttons: res.data,
          buttonIds: res.data.map(n => n.buttonId),
          buttonLoading: false
        }
      } catch(err) {
        this.btnManage.buttonLoading = false
      }
    },
    async queryAllBtns() {
      this.btnManage.allBtnLoading = true
      try {
        let res = await queryBtns({
          page: 1,
          rows: 2000
        })
        this.btnManage = {
          ...this.btnManage,
          allBtnLoading: false,
          allBtns: res.data.list.map(n => ({...n, key: n.id, label: n.name}))
        }
      } catch(err) {
        this.btnManage.allBtnLoading = false
      }
    },
    addNewButton() {
      this.btnManage.dialogVisible = true
    },
    changeMode(mode) {
      const e = this.$refs.tree.getCurrentNode()
      this.mode = mode
      if (mode === 'add') {
        this.formData = {
          ...this.formData,
          menuUrl: '',
          menuIcon: '',
          description: '',
          name: '',
        }
      }
      if (e) {
        this.formData = {
          ...this.formData,
          name: this.mode === 'add' ? '' : e.name,
          parentId: this.mode === 'add' ? e.id : e.parentId,
          menuUrl: this.mode === 'add' ? '' :  e.menuUrl,
          menuIcon: this.mode === 'add' ? '' : e.menuIcon,
          description: this.mode === 'add' ? '' : e.description,
          belongSystem: this.mode === 'add' ? '0' : e.belongSystem,
          id: e.id,
          sort: this.mode === 'add' ? '' : e.sort,
          hasChildren: this.mode === 'add' ? false : e.child.length > 0,
          threeMenu: e.threeMenu ? true : false,
        }
      }
    },
    nodeClick(e) {
      this.mode = 'edit'
      this.searchForm = {
        ...this.searchForm,
        id: e.id
      }
      this.formData = {
        name: this.mode === 'add' ? '' : e.name,
        parentId: this.mode === 'add' ? e.id : e.parentId,
        menuUrl: this.mode === 'add' ? '' :  e.menuUrl,
        menuIcon: this.mode === 'add' ? '' : e.menuIcon,
        description: this.mode === 'add' ? '' : e.description,
        belongSystem: this.mode === 'add' ? '0' : e.belongSystem,
        id: e.id,
        sort: this.mode === 'add' ? '' : e.sort,
        hasChildren: this.mode === 'add' ? false : e.child.length > 0,
        threeMenu: e.threeMenu ? true : false,

      }
      if (this.mode === 'add') {
        this.btnManage.buttonIds = []
      } else {
        this.queryBtns(e.id)
      }
    },
    getMenuTree() {
      listMenuTree().then(res => {
        let treeData = interArrayTree(res.data)
        this.treeData = treeData
        this.$refs.treeSelect.treeDataUpdateFun(treeData)
      })
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    selectedButtons() {
      const { allBtns, buttonIds } = this.btnManage
      let result = []
      _.forEach(allBtns, (n, i) => {
        let exist = buttonIds.find(j => j === n.id)
        if (exist) {
          result.push({...n, buttonId: n.id})
        }
      })
      return result
    }
  }
}
</script>

<style scoped>
.menu-container {
  margin: 15px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
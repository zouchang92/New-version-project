<template>
  <div>
    <div class="menu-container">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-card>
            <avue-tree nodeKey="id" ref="organTree" :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <el-form :inline="true">
              <el-form-item>
                <el-button :icon="mode === 'add' ? 'el-icon-plus' : 'el-icon-edit'" @click="changeMode" style="height: 32px;line-height: 12px" size="medium" type="primary">{{mode === 'add' ? '添加模式' : '编辑模式'}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-delete" @click="deleteMenu" style="height: 32px;line-height: 12px" size="medium" type="danger">删除</el-button>
              </el-form-item>
            </el-form>
            <el-form label-width="80px" label-position="right" size="small">
              <el-form-item label="菜单名称">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="菜单编码">
                <el-input v-model="formData.menuUrl"></el-input>
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
import { interArrayTree } from '@/utils'
export default {
  name: 'menuManage',
  data() {
    return {
      mode: 'edit',
      updateLoading: false,
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
        await deleteMenu(this.formData.id)
        await this.getMenuTree()
      } catch(err) {

      }
    },
    handleClose(id) {
      let index = this.btnManage.buttonIds.findIndex(n => n === id)
      this.btnManage.buttonIds.splice(index, 1)
    },
    async organSubmit() {
      this.updateLoading = true
      try {
        if (this.mode === 'add') {
          if (!this.formData.parentId) {
            this.formData.parentId = 'root'
          }
          await addMenu(this.formData)
        } else {
          await updateMenu(this.formData)
          await menuBindButtons({
            id: this.formData.id,
            buttons: this.selectedButtons
          })
        }
        this.updateLoading = false
        this.getMenuTree()
      } catch(err) {
        this.updateLoading = false
      }
      
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
        let res = await queryBtns()
        this.btnManage = {
          ...this.btnManage,
          allBtnLoading: false,
          allBtns: res.data.map(n => ({...n, key: n.id, label: n.name}))
        }
      } catch(err) {
        this.btnManage.allBtnLoading = false
      }
    },
    addNewButton() {
      this.btnManage.dialogVisible = true
    },
    changeMode() {
      if (this.mode === 'add') {
        this.mode = 'edit'
      } else {
        this.mode = 'add'
      }
    },
    nodeClick(e) {
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
        id: e.id,
        sort: e.sort,
        hasChildren: e.child.length > 0,
        threeMenu: e.threeMenu ? true : false
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
</style>
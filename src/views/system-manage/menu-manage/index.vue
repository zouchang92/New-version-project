<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <el-card class="box-card">
          <el-container>
            <el-aside width="200px">
              <avue-tree nodeKey="id" ref="organTree" :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
            </el-aside>
            <el-main style="padding-top: 0">
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
                
              </el-form>
              <el-form label-width="80px" label-position="right" size="small">
                <el-form-item>
                   <el-col :span="2">
                     <el-button :loading="updateLoading" @click="organSubmit" size="mini" type="primary">确定</el-button>
                   </el-col>
                   <el-col :span="2">
                     <el-button size="mini" type="primary">取消</el-button>
                   </el-col>
                 </el-form-item>
              </el-form>
            </el-main>
          </el-container>
          
         </el-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { listMenuTree, addMenu, updateMenu, deleteMenu } from '@/api/menuManageApi'
import { interArrayTree } from '@/utils'
export default {
  name: 'menuManage',
  data() {
    return {
      mode: 'add',
      updateLoading: false,
      searchForm: {
        id: ''
      },
      formData: {
        name: '',
        parentId: '',
        menuUrl: '',
        menuIcon: '',
        description: '',
        id: '',
        sort: ''
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
        }
        this.updateLoading = false
        this.getMenuTree()
      } catch(err) {
        this.updateLoading = false
      }
      
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
        name: e.name,
        parentId: this.mode === 'add' ? e.id : e.parentId,
        menuUrl: e.menuUrl,
        menuIcon: e.menuIcon,
        description: e.description,
        id: e.id
      }
    },
    getMenuTree() {
      listMenuTree().then(res => {
        let treeData = interArrayTree(res.data)
        this.treeData = treeData
        this.$refs.treeSelect.treeDataUpdateFun(treeData)
      })
    },
  }
}
</script>

<style scoped>

</style>
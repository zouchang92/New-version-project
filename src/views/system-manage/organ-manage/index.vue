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
              <el-form>
                 <el-form-item>
                   <el-button :icon="mode === 'add' ? 'el-icon-plus' : 'el-icon-edit'" @click="changeMode" style="height: 32px;line-height: 12px" size="medium" type="primary">{{mode === 'add' ? '添加模式' : '编辑模式'}}</el-button>
                   <el-button icon="el-icon-delete" @click="deleteOrgan" style="height: 32px;line-height: 12px" size="medium" type="danger">删除</el-button>
                   <el-button icon="el-icon-top" style="height: 32px;line-height: 12px" size="medium" type="warning">一键升级</el-button>
                 </el-form-item>
              </el-form>
              <el-form label-width="80px" label-position="right" size="small">
                <el-form-item label="机构名称">
                  <el-input v-model="formData.orgName"></el-input>
                </el-form-item>
                <el-form-item label="机构编码">
                  <el-input v-model="formData.orgCode"></el-input>
                </el-form-item>
                <el-form-item label="上级机构">
                  <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="treeData" v-model="formData.parentId"/>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="formData.description"></el-input>
                </el-form-item>
              </el-form>
              <el-form label-width="80px" label-position="right" size="small">
                <el-form-item>
                   <el-col :span="4">
                     <el-button :loading="updateLoading" @click="organSubmit" size="mini" type="primary">确定</el-button>
                   </el-col>
                   <el-col :span="4">
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
import { getOrganTree, insertOrgan, updateOrgan, deleteOrgan } from '@/api/organManageApi'
import { interArrayTree } from '@/utils'
export default {
  name: 'organManage',
  data() {
    return {
      mode: 'add',
      updateLoading: false,
      searchForm: {
        id: ''
      },
      formData: {
        orgName: '',
        parentId: '',
        orgCode: '',
        orgType: '',
        description: '',
        id: ''
      },
      treeParams: {
        props: {
          label: 'orgName',
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
          label: 'orgName',
          value: 'id',
        }
      },
    }
  },
  mounted() {
    this.getOrganTree()
  },
  methods: {
    async deleteOrgan() {
      try {
        await this.$confirm('是否删除该机构?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteOrgan(this.formData.id)
        this.getOrganTree()
      } catch(err) {

      }
    },
    async organSubmit() {
      this.updateLoading = true
      try {
        if (this.mode === 'add') {
          await insertOrgan(this.formData)
        } else {
          await updateOrgan(this.formData)
        }
        this.updateLoading = false
        this.getOrganTree()
        this.$store.dispatch('system/getOrganTree')
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
        orgName: e.orgName,
        orgCode: e.orgCode,
        description: e.description,
        orgType: e.orgType,
        parentId: this.mode === 'add' ? e.id : e.parentId,
        id: e.id
      }
    },
    getOrganTree() {
      getOrganTree().then(res => {
        let treeData = interArrayTree(res.data)
        this.treeData = treeData
        this.$refs.treeSelect.treeDataUpdateFun(treeData)
      })
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    uploadBefore(file, done) {
      alert(1)
    },
    rowUpdate(row, done, loading) {
      console.log(row)
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addStudent(row)
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
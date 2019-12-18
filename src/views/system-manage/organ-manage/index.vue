<template>
  <div>
    <div class="organ-container">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-card>
               <avue-tree nodeKey="id" ref="organTree" :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card>
             <el-form>
                 <el-form-item>
                   <el-button icon="el-icon-plus" @click="changeMode('add')" style="height: 32px;line-height: 12px" size="medium" type="primary">添加</el-button>
                   <el-button icon="el-icon-edit" @click="changeMode('edit')" style="height: 32px;line-height: 12px" size="medium" type="primary">编辑</el-button>
                   <el-button v-if="permission.delBtn" icon="el-icon-delete" @click="deleteOrgan" style="height: 32px;line-height: 12px" size="medium" type="danger">删除</el-button>
                   <el-button v-if="permission.oneKeyUpdate" icon="el-icon-top" style="height: 32px;line-height: 12px" size="medium" type="warning">一键升级</el-button>
                 </el-form-item>
              </el-form>
              <el-form ref="form" :model="formData" :rules="rules" label-width="80px" label-position="right" size="small">
                <el-form-item label="机构名称" prop="orgName">
                  <el-input v-model="formData.orgName"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="orgCode">
                  <el-input v-model="formData.orgCode"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="parentId">
                  <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="treeData" v-model="formData.parentId"/>
                </el-form-item>
                <el-form-item label="备注" prop="description">
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
            </el-card>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { getOrganTree, insertOrgan, updateOrgan, deleteOrgan } from '@/api/organManageApi'
import { interArrayTree } from '@/utils'
export default {
  name: 'organManage',
  mixins: [permission],
  data() {
    return {
      mode: 'add',
      updateLoading: false,
      searchForm: {
        id: ''
      },
      rules: {
        orgName: [
            { required: true, message: '请输入机构名称', trigger: 'blur' },
          ],
        orgCode: [
          { required: true, message: '请输入机构编码', trigger: 'blur' }
        ],
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
        this.$message.success('删除成功')
        this.getOrganTree()
      } catch(err) {

      }
    },
    async organSubmit() {
      this.updateLoading = true
       this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            if (this.mode === 'add') {
              await insertOrgan(this.formData)
              this.$message.success('添加成功')
            } else {
              await updateOrgan(this.formData)
              this.$message.success('更新成功')
            }
            this.updateLoading = false
            this.getOrganTree()
            this.$store.dispatch('system/getOrganTree')
          } catch(err) {
            this.updateLoading = false
          }
        } else {
          this.updateLoading = false
        }
      }); 
    },
    changeMode(mode) {
      this.mode = mode
      if (mode === 'add') {
        this.formData = {
          ...this.formData,
          orgName: '',
          orgCode: '',
          description: '',
          orgType: ''
        }
      }
    },
    nodeClick(e) {
      this.searchForm = {
        ...this.searchForm,
        id: e.id
      }
      this.formData = {
        orgName: this.mode === 'add' ? '' : e.orgName,
        orgCode: this.mode === 'add' ? '' : e.orgCode,
        description: this.mode === 'add' ? '' : e.description,
        orgType: this.mode === 'add' ? '' : e.orgType,
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
    rowUpdate(row, index, done, loading) {
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
.organ-container {
  margin: 15px;
}
</style>
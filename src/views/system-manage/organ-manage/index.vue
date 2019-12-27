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
                   <el-button icon="el-icon-edit" v-if="this.mode !== 'add'" @click="changeMode('edit')" style="height: 32px;line-height: 12px" size="medium" type="primary">编辑</el-button>
                   <el-button v-if="permission.delBtn && this.mode !== 'add'" icon="el-icon-delete" @click="deleteOrgan" style="height: 32px;line-height: 12px" size="medium" type="danger">删除</el-button>
                   <el-button v-if="permission.oneKeyUpdate" icon="el-icon-top" style="height: 32px;line-height: 12px" size="medium" type="warning">一键升级</el-button>
                 </el-form-item>
              </el-form>
              <el-form ref="form" :model="formData" :rules="rules" label-width="85px" label-position="right" size="small">
                <el-form-item label="机构名称" prop="orgName">
                  <el-input v-model="formData.orgName"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="orgCode">
                  <el-input v-model="formData.orgCode"></el-input>
                </el-form-item>
                <el-form-item label="上级机构" prop="parentId">
                  <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="treeData" v-model="formData.parentId"/>
                </el-form-item>
                <el-form-item v-if="this.mode === 'edit'" label="机构负责人" prop="dutyPeople">
                  <div v-loading="organLeader.loading">
                  <el-button
                    class="input-new-tag"
                    @click="addManager"
                    size="small"
                    icon="el-icon-plus"
                    v-if="organLeader.selectedPerson.length === 0"
                  >添加负责人</el-button>
                  <el-tag v-else style="margin-right: 10px" @close="handleClose(item.id)" v-for="(item, i) in organLeader.selectedPerson" :key="i" closable>{{item.name}}</el-tag>
                  </div>
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
        <el-dialog title="添加机构负责人" :visible.sync="organLeader.visible">
          <ul class="leader-select" v-loading="organLeader.modalLoading">
            <li @click.stop="triggerMember(item, i)" v-for="(item, i) in organLeader.organPerson" :key="item.id">
              <i class="el-icon-user" />
              {{item.loginName}}
              <el-checkbox
                class="user-checkbox"
                :value="findIndex(organLeader.selectedPerson, item.id) > -1"
              ></el-checkbox>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">确定</el-button>
            <el-button type="primary" @click="organLeader.visible = false">取消</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { getOrganTree, insertOrgan, updateOrgan, deleteOrgan, getLeaderById, setLeaderById } from '@/api/organManageApi'
import { queryUsers } from '@/api/userManageApi'
import { interArrayTree } from '@/utils'
import _ from 'lodash'
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
      organLeader: {
        loading: false,
        data: [],
        visible: false,
        organPerson: [],
        selectedPerson: [],
        modalLoading: false,
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
    findIndex(arr, id) {
      return _.findIndex(arr, n => n.id === id)
    },
    
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
    async getOrgLeader(id) {
      this.organLeader.loading = true
      try {
        let res = await getLeaderById(id)
        this.organLeader = {
          ...this.organLeader,
          loading: false,
          selectedPerson: _.map(res.data, n => {
            return {
              ...n,
              id: n.userId,
              name: n.userName
            }
          })
        }
      } catch(err) {
        this.organLeader.loading = true
      }
    },
    triggerMember(item, i) {
      let index = _.findIndex(this.organLeader.selectedPerson, n => (n.id === item.id))
      if (index > -1) {
        this.removeMember(item.id)
      } else {
        this.organLeader.selectedPerson.push({
          name: item.loginName,
          id: item.id
        })
      }
    },
    handleClose(id) {
      let index = _.findIndex(this.organLeader.selectedPerson, n => n.id === id)
      this.organLeader.selectedPerson.splice(index, 1)
    },
    removeMember(id) {
      let removeArray = []
      _.forEach(this.organLeader.selectedPerson, n => {
        if (n.id !== id) {
          removeArray.push(n)
        }
      })
      this.organLeader.selectedPerson = removeArray
    },
    async addManager() {
      this.organLeader = {
        ...this.organLeader,
        visible: true
      }
      try {
        let res = await this.getOrganPerson()
      } catch(err) {
         console.log(err)
      }
    },
    async getOrganPerson() {
      this.organLeader.modalLoading = true
      try {
        let res = await queryUsers({
          page: 1,
          rows: 100000,
          organId: this.formData.id
        })
        this.organLeader = {
          ...this.organLeader,
          modalLoading: false,
          organPerson: _.filter(res.data.list, n => {
            return n.orgType !== 'parentDuty' && n.orgType !== 'studentDuty'
          })
        }
      } catch(err) {
        this.organLeader.modalLoading = false
        throw new Error(err)
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
              await setLeaderById({organId: this.formData.id, ids: _.map(this.organLeader.selectedPerson, n => n.id)})
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
      const e = this.$refs.organTree.$refs.tree.getCurrentNode()
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
      if (e) {
        this.formData = {
          orgName: this.mode === 'add' ? '' : e.orgName,
          orgCode: this.mode === 'add' ? '' : e.orgCode,
          description: this.mode === 'add' ? '' : e.description,
          orgType: this.mode === 'add' ? '' : e.orgType,
          parentId: this.mode === 'add' ? e.id : e.parentId,
          id: e.id
        }
        this.getOrgLeader(e.id)
      }
    },
    nodeClick(e) {
      this.mode = 'edit'
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
      this.getOrgLeader(e.id)
    },
    getOrganTree() {
      getOrganTree().then(res => {
        let treeData = interArrayTree(res.data)
        this.treeData = treeData
        console.log(treeData)
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

<style scoped lang="less">
.organ-container {
  margin: 15px;
}
.leader-select {
  list-style: none;
  height: 200px;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  li {
    width: auto;
    height: auto;
    display: block;
    position: relative;
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
    padding: 10px 5px;
    cursor: pointer;
    .user-checkbox {
      float: right;
    }
  }
}
</style>
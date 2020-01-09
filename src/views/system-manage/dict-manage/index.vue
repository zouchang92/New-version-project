<template>
  <div>
    <div class="dict-container">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-card>
            <el-input size="small"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
                <el-button @click="addRootNode" slot="append" icon="el-icon-plus"></el-button>
               </el-input>
              <el-tree :filter-node-method="filterNode" ref="tree" node-key="id" :props="treeOption.props" :data="treeData" @node-click="nodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                  <el-button
                      type="text"
                      size="mini"
                      icon="el-icon-plus"
                      v-if="data.parentId === '' && permission.addBtn"
                      @click="() => addNode(node, data)">
                      
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      icon="el-icon-edit"
                      v-if="permission.editBtn"
                      @click="() => editNode(node, data)">
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      icon="el-icon-delete"
                      v-if="permission.delBtn"
                      @click="() => removeNode(node, data)">
                    </el-button>
                  </span>
                </span>
              </el-tree>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <avue-crud :permission="permission" rowKey="id" @row-del="singleDel" @size-change="pageSizeChange" @current-change="currentPageChange" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" @search-change="searchChange" :page="page" :data="tableList" :option="option" v-model="obj">
              <template slot="searchMenu">
                <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
                <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
                <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
                <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
              </template>
            </avue-crud>
          </el-card>
        </el-col>
      </el-row>
    </div>
   <el-dialog :title="rootMode === 'add' ? '新增' : '编辑'" :visible.sync="dialogVisible">
     <avue-form ref="form" v-model="dictData" :option="dictEditOption" @reset-change="emptytChange" @submit="submit" />
   </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryDictList, searchDictById, addDict, updateDict, deleteDict, deleteChildDict } from '@/api/dictManageApi'
import { interArrayTree } from '@/utils'
export default {
  name: 'roleManage',
  mixins: [tableCommon, permission],
  
  data() {
    return {
      initLoad: false,
      dictData: {

      },
      singleDelFn: deleteChildDict,
      dialogVisible: false,
      rootMode: 'add',
      dictEditOption: {
        column: [{
          label:'名称',
          prop:'name',
          span: 24,
        }, {
          label:'排序',
          prop:'sort',
          span: 24,
          type: 'number',
          rules: [{
            required: true,
            message: '排序是必填项'
          }]
        }, {
          label:'特殊编码',
          prop:'uniqueName',
          span: 24,
          rules: [{
            required: true,
            message: '特殊编码是必填项'
          }],
          editDisable: true
        }, {
          label:'id',
          prop:'id',
          display: false
        }, {
          label:'parentId',
          prop:'parentId',
          display: false
        }, {
          label:'dictId',
          prop:'dictId',
          display: false
        }]
      },
      filterText: '',
      searchForm: {
        id: ''
      },
      dictId: '',
      dictParentId: '',
      treeData: [],
      treeOption: {
        props: {
          label: 'name',
          value: 'id',
          id: 'id'
        },
      },
      fn: searchDictById,
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
            label: 'dictId',
            prop: 'dictId',
            rules: [{
              required: false,
            }],
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'名称',
            prop:'name',
            rules: [{
              message: '名称是必填项',
              required: true,
            }],
            span: 24,
            width: 200,
            search: true
          },
          {
            label: '排序',
            prop: 'sort',
            rules: [{
              message: '排序是必填项',
              required: true,
            }],
            type: 'number',
            span: 24,
            width: 200
          },
          {
            label: '值',
            prop: 'code',
            rules: [{
              message: '值是必填项',
              required: true,
            }],
            span: 24,
            width: 200
          },
          {
            label: '备注',
            prop: 'description',
            rules: [{
              required: false,
            }],
            span: 24,
            width: 200
          },
        ]
      },
      obj: {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getDictTree()
  },
  methods: {
    emptytChange() {

    },
    addRootNode() {
      this.rootMode = 'add'
      this.dictData = {}
      this.dialogVisible = true
    },
    singleDel(row) {
      const that = this
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delFn = that.singleDelFn
          that.singleDelFn({id: row.id, dictId: row.dictId}).then(res => {
            that.initList()
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(err => {

          }) 
          
        }).catch(() => {
      
        });
    },
    async submit(data, done) {
      try {
        if (this.rootMode === 'add') {
          await addDict(data)
          this.$message.success('添加成功')
        } else if (this.rootMode === 'edit') {
          await updateDict(data)
          this.$message.success('更新成功')
        }
        await this.getDictTree()
        done()
        this.dialogVisible = false
      } catch(err) {
        done()
        this.dialogVisible = false
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(e) {
      this.searchForm = {
        ...this.searchForm,
        id: e.id
      }
      this.dictId = e.id
      this.dictParentId = e.parentId
      this.resetList()
    },
    async updateRootDic(data, node, done) {
      const { id, parentId, name, sort } = data
      try {
        await updateDict({ id, name, sort, dict_id: parentId })
        this.$message.success('更新成功')
        done()
      } catch(err) {
        
      }
    },
    refreshDictStore() {
      this.$store.dispatch('system/getDictionary')
    },
    addNode(node, data) {
      this.rootMode = 'add'
      this.dictData = {}
      this.dictData = {parentId: data.id}
      this.dialogVisible = true
    },
    resetForm() {
      
    },
    editNode(node, data) {
      this.dictData = {}
      this.rootMode = 'edit'
      this.dictData = data
      this.dialogVisible = true
    },
    async addRootDict(data, node, done) {
      const { id, parentId, name, sort, uniqueName } = data
      try {
        await addDict({ id, name, sort, dict_id: parentId, uniqueName })
        this.$message.success('添加成功')
        done()
      } catch(err) {

      }
    },
    async getDictTree() {
      try {
        let res = await queryDictList()
        this.treeData = interArrayTree(res.data)
      } catch(err) {

      }
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    uploadBefore(file, done) {
      
    },
    async rowUpdate(row, index, done, loading) {
      loading()
      row.dictId = this.dictId
      try {
        let result = await updateDict(row)
        await this.resetList()
        this.$message.success('更新成功')
        this.refreshDictStore()
        done()
      } catch(err) {
        done()
      }
    },
    async removeNode(node, data) {
      try {
        await this.$confirm('是否删除该字典?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteDict(data.id)
        this.$message.success('删除成功')
        await this.getDictTree()
        
        this.refreshDictStore()
      } catch(err) {

      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      row.dictId = this.dictId
      try {
        let result = await addDict(row)
        await this.resetList()
        this.refreshDictStore()
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
.dict-container {
  margin: 15px;
}
</style>
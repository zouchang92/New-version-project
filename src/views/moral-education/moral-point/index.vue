<template>
  <div class="moral-point">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix" style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
">
            <span>德育指标</span>
            <el-button @click="addMoralRootNode" type="primary" size="small" icon="el-icon-plus">新增</el-button>
          </div>
          <el-input size="small"
            placeholder="输入关键字进行过滤"
            v-model="treeConfig.filterText">
            
          </el-input>
          <el-tree ref="tree" @node-click="nodeClick" :filter-node-method="filterNode" node-key="id" v-loading='treeConfig.loading' :props="treeConfig.props" :data="treeConfig.data">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="() => editMoralNode(node, data)">
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  @click="() => removeMoralNode(node, data)">
                </el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogShow">
      <avue-form ref="form" v-model="moralNodeConfig.moralParams" :option="moralNodeConfig.moralEditOption" @submit="submitNode" />
    </el-dialog>
  </div>
</template>

<script>
import { queryMoralTree, addMoralNode, updateMoralNode, deleteMoralNode, queryChildMoralPoint, addChildMoralPoint, updateChildMoralPoint, deleteChildMoralPoint } from '@/api/moralPointManageApi'
import { interArrayTree, getDictById } from '@/utils'
import _ from 'lodash'
import tableCommon from '@/mixins/table-common.js'

const ioFlagDict = getDictById('moralType')
const booleanDict = getDictById('boolean')
export default {
  mixins: [tableCommon],
  name: 'moralPoint',
  data() {
    return {
      option: {
        header: true,
        column: [{
          prop: 'id',
          label: 'id',
          editDisplay: false,
          addDisplay: false,
          hide: true,
        }, {
          prop: 'pTitle',
          label: '一级指标',
          editDisabled: true,
          addDisabled: true
        }, {
          prop: 'title',
          label: '二级指标'
        }, {
          prop: 'mutScore',
          label: '固定分值',
          rules: [{
            required: true,
            message: '固定分值为必填项'
          }]
        }, {
          prop: 'variaScore',
          label: '酌情分值',
          rules: [{
            required: true,
            message: '酌情分值为必填项'
          }]
        }, {
          prop: 'type',
          label: '类型',
          type: 'select',
          editDisabled: true,
          addDisabled: true,
          dicData: ioFlagDict,
          hide:true
        }, {
          prop: 'ioflag',
          label: '类型',
          type: 'select',
          dicData: ioFlagDict
        }, {
          prop: 'isClassroom',
          label: '班级指标',
          type: 'select',
          editDisabled: true,
          addDisabled: true,
          dicData: booleanDict
        }, {
          prop: 'isStudent',
          label: '学生指标',
          type: 'select',
          editDisabled: true,
          addDisabled: true,
          dicData: booleanDict
        }]
      },
      obj: {

      },
      fn: queryChildMoralPoint,
      singleDelFn: deleteChildMoralPoint,
      dialogShow: false,
      treeConfig: {
        filterText: '',
        data: [],
        loading: true,
        props: {
          label: 'title'
        },
      },
      moralNodeConfig: {
        mode: 'add',
        moralParams: {
          id: '',
          type: '',
          title: '',
          isClassroom: '',
          isStudent: '',
          isTeacher: '',
          isMaster: ''
        },
        moralEditOption: {
          labelWidth: '135',
          column: [{
            label:'指标名称',
            prop:'title',
            rules: [{
              required: true,
              message: '指标名称为必填项'
            }]
          }, {
            label: '指标类型',
            prop: 'type',
            type: 'select',
            rules: [{
              required: true,
              message: '指标类型为必填项'
            }],
            dicData: ioFlagDict
          }, {
            label: '是否应用于教室',
            prop: 'isClassroom',
            type: 'radio',
            dicData: booleanDict
          }, {
            label: '是否应用于学生',
            prop: 'isStudent',
            type: 'radio',
            dicData: booleanDict
          }, {
            label: '是否应用于教师',
            prop: 'isTeacher',
            type: 'radio',
            dicData: booleanDict
          }, {
            label: '是否应用于班主任',
            prop: 'isMaster',
            type: 'radio',
            dicData: booleanDict
          }]
        }
      }
    } 
  },
  mounted() {
    this.getMoralNodeTree()
    this.tableListLoading = false
  },
  watch: {
    ['treeConfig.filterText'](val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    nodeClick(data) {
      this.searchForm.projId = data.id
      this.resetList()
    },
    async rowUpdate(row, index, done, loading) {
      console.log(row)
      loading(true)
      try {
        row.projId = this.searchForm.projId
        await updateChildMoralPoint(row)
        await this.initList()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        row.projId = this.searchForm.projId
        await addChildMoralPoint(row)
        await this.initList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    addMoralRootNode() {
      this.moralNodeConfig.mode = 'add'
      this.resetMoralData()
      this.showDialog()
    },
    resetMoralData() {
      
      this.moralNodeConfig.moralParams = {
        id: '',
        type: '',
        title: '',
        isClassroom: '',
        isStudent: '',
        isTeacher: '',
        isMaster: ''
      }
    },
    editMoralNode(node, data) {
      this.moralNodeConfig.mode = 'edit'
      this.moralNodeConfig.moralParams = data
      this.showDialog()
    },
    async removeMoralNode(node, data) {
      const that = this
      try {
        await this.$confirm('是否删除该德育指标?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              try {
                await deleteMoralNode(data.id)
                await that.getMoralNodeTree()
                done()
              } catch(err) {
                done()
              }
            } else {
              done()
            }
          }
        })
      } catch(err) {

      }
    },
    showDialog() {
      this.dialogShow = true
    },
    async submitNode(data, done) {
      const { mode } = this.moralNodeConfig
      try {
        if (mode === 'add') {
          await addMoralNode(data)
        } else if (mode === 'edit') {
          await updateMoralNode(data)
        }
        done()
        this.getMoralNodeTree()
        this.dialogShow = false
      } catch(err) {

      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    async getMoralNodeTree() {
      this.treeConfig.loading = true
      try {
        let treeData = await queryMoralTree({})
        this.treeConfig.data = _.map(treeData.data.list, n => ({...n}))
        this.treeConfig.loading = false
      } catch(err) {
        this.treeConfig.loading = false
      }
    },
    handleClick() {

    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.moral-point {
  margin: 15px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
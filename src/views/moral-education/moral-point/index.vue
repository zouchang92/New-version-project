<template>
  <div class="moral-point">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>德育指标</span>
          </div>
          <el-input size="small"
            placeholder="输入关键字进行过滤"
            v-model="treeConfig.filterText">
            <el-button @click="addMoralRootNode" slot="append" icon="el-icon-plus"></el-button>
          </el-input>
          <el-tree ref="tree" :filter-node-method="filterNode" node-key="id" v-loading='treeConfig.loading' :props="treeConfig.props" :data="treeConfig.data">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-plus"
                  v-if="data.hasOwnProperty('isClassroom')"
                  @click="() => addMoralNode(node, data)">
                </el-button>
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
          <el-table>
         
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogShow">
      <avue-form ref="form" v-model="moralNodeConfig.moralParams" :option="moralNodeConfig.moralEditOption" @submit="submitNode" />
    </el-dialog>
  </div>
</template>

<script>
import { queryMoralTree, addMoralNode, updateMoralNode, deleteMoralNode } from '@/api/moralPointManageApi'
import { interArrayTree } from '@/utils'
export default {
  name: 'moralPoint',
  data() {
    return {
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
            rules: {
              required: true,
              message: '指标名称为必填项'
            }
          }, {
            label: '指标类型',
            prop: 'type',
            type: 'select',
            rules: {
              required: true,
              message: '指标类型为必填项'
            },
            dictData: [{
              value: '1',
              label: '指标类型1'
            }, {
              value: '1',
              label: '指标类型2'
            }]
          }, {
            label: '是否应用于教室',
            prop: 'isClassroom',
            type: 'radio',
            dicData: [{
              value: '0',
              label: '否'
            }, {
              value: '1',
              label: '是'
            }]
          }, {
            label: '是否应用于学生',
            prop: 'isStudent',
            type: 'radio',
            dicData: [{
              value: '0',
              label: '否'
            }, {
              value: '1',
              label: '是'
            }]
          }, {
            label: '是否应用于教师',
            prop: 'isTeacher',
            type: 'radio',
            dicData: [{
              value: '0',
              label: '否'
            }, {
              value: '1',
              label: '是'
            }]
          }, {
            label: '是否应用于班主任',
            prop: 'isMaster',
            type: 'radio',
            dicData: [{
              value: '0',
              label: '否'
            }, {
              value: '1',
              label: '是'
            }]
          }]
        }
      }
    } 
  },
  mounted() {
    this.getMoralNodeTree()
  },
  watch: {
    ['treeConfig.filterText'](val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    addMoralRootNode() {
      this.showDialog()
    },
    addMoralNode(node, data) {

      this.showDialog()
    },
    editMoralNode(node, data) {
      console.log(data)
    },
    removeMoralNode(node, data) {

    },
    showDialog() {
      this.dialogShow = true
    },
    submitNode() {

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    async getMoralNodeTree() {
      this.treeConfig.loading = true
      try {
        let treeData = await queryMoralTree({})
        this.treeConfig.data = interArrayTree(treeData.data.list)
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
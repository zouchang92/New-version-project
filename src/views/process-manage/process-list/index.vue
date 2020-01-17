<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :before-open="queryNodeInfo" :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
            <template slot-scope="scope" slot="flowNodesForm">
              <div style="position: relative">
                <flow-node ref="flowNode" />
              </div>
            </template>
          </avue-crud>
           
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryFlowDefined, addFlowDefined, updateFlowDefined, queryFlowNode, addFlowNode, deleteFlowDefined } from '@/api/processManageApi'
import FlowNode from '@/components/NodeFlow/NodePanel'
export default {
  name: 'processList',
  data() {
    return {
      fn: queryFlowDefined,
      singleDelFn: deleteFlowDefined,
      option: {
        dialogWidth: '90%',
        column: [{
          label:'id',
          prop:'id',
          hide: true,
          addDisplay: false,
          editDisplay: false,
          viewDisplay: false
        }, {
          label: '流程类型',
          prop: 'categoryId',
          type: 'select',
          dicUrl: process.env.VUE_APP_BASE_API + "/zhxyx/category/listFlowCategory",
          dicMethod: "post",
          dicQuery: {
            page: 1,
            rows: 100000
          },
          props: {
            res: "data",
            label: "categoryName",
            value: "id"
          },
          rules: [{
            required: true,
            message: '流程类型为必填项'
          }],
          search: true
        }, {
          label: '流程名称',
          prop: 'flowName',
          rules: [{
            required: true,
            message: '流程名称为必填项'
          }],
          search: true
        },{
          label: '描述',
          prop: 'description',
        }, {
          label: '节点数',
          prop: 'flowNodes',
          formslot: true,
          span: 24
        }, {
          label: '状态',
          prop: 'status',
          type: 'select',
          addDisplay: false,
          editDisplay: false,
          dicData: [{
            value: 1,
            label: '使用中'
          }, {
            value: 0,
            label: '未使用'
          }]
        }]
      },
      nodeInfo: [],
      obj: {
        
      }
    }
  },
  mixins: [tableCommon, permission],
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async queryNodeInfo(done, type) {
      try {
        if (type === 'edit') {
          let res = await queryFlowNode(this.obj.id)
          this.nodeInfo = res.data
          done()
        } else {
          this.nodeInfo = []
          done()
        }
      } catch(err) {

      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const flowData = this.$refs.flowNode.getSubmitData()
        let res = await updateFlowDefined(row)
        await this.resetList()
        loading(false)
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        const flowData = this.$refs.flowNode.getSubmitData()
        let res = await addFlowDefined(row)
        await this.resetList()
        loading(false)
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
    }
  },
  components: {
    FlowNode
  },
  watch: {
    nodeInfo: function(val) {
      setTimeout(() => {
        this.$refs.flowNode.dataReload(val)
      }, 0)
    }
  }
}
</script>

<style>

</style>
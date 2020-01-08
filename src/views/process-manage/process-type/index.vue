<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryProcessType, updateProcessType, deleteProcessType, addProcessType } from '@/api/processManageApi'
export default {
  name: 'processType',
  data() {
    return {
      fn: queryProcessType,
      singleDelFn: deleteProcessType,
      option: {
        column: [{
          label:'id',
          prop:'id',
          hide: true,
          addDisplay: false,
          editDisplay: false,
          viewDisplay: false
        }, {
          label: '分类名',
          prop: 'categoryName',
          rules: [{
            required: true,
            message: '分类名为必填项'
          }],
          search: true
        }, {
          component: 'rich-text',
          prop: 'rr',
          label: 'ee',
          span: 24,
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
      obj: {}
    }
  },
  mixins: [tableCommon, permission],
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      console.log(row)
      loading(true)
      try {
        let res = await updateProcessType(row)
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
        let res = await addProcessType(row)
        await this.resetList()
        loading(false)
        done()
      } catch(err) {
        loading(false)
      }
    }
  }
}
</script>

<style>

</style>
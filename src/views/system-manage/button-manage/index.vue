<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryBtns, addBtn, updateBtn, deleteBtn } from '@/api/buttonManageApi'
export default {
  name: 'buttonManage',
  data() {
    return {
      fn: queryBtns,
      singleDelFn: deleteBtn,
      option: {
        column: [{
          label:'id',
          prop:'id',
          hide: true,
          addDisplay: false,
          editDisplay: false,
          viewDisplay: false
        }, {
          label: '按钮名',
          prop: 'name',
          rules: [{
            required: true,
            message: '按钮名为必填项'
          }],
          search: true
        }, {
          label: '按钮代码',
          prop: 'buttonCode',
          rules: [{
            required: true,
            message: '按钮代码为必填项'
          }],
          search: true
        }, {
          label: '描述',
          prop: 'description',
          rules: [{
            required: true,
            message: '描述为必填项'
          }]
        }, {
          label: '图标',
          prop: 'icon',
          rules: [{
            required: true,
            message: '图标为必填项'
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
      loading(true)
      try {
        let res = await updateBtn(row)
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
        let res = await addBtn(row)
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
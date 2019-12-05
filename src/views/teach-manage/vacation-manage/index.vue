<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
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
import { queryVacation, addVacation, updateVacation, deleteVacation } from '@/api/vacationManageApi'
export default {
  name: 'vacationManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      fn: queryVacation,
      singleDelFn: deleteVacation,
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
            label:'节假日名称',
            prop:'name',
            rules: {
              required: true,
              message: '科目名称是必填项'
            },
            search: true,
            searchSpan: 12,
            span: 24,
          },
          {
            label: '开始时间',
            prop:'startTime',
            type: 'date',
            rules: {
              required: true,
              message: '开始时间是必填项'
            },
            search: true,
            span: 24,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
          {
            label:'结束时间',
            prop:'endTime',
            type: 'date',
            rules: {
              required: true,
              message: '结束时间是必填项'
            },
            search: true,
            span: 24,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
          },
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let result = await updateVacation(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addVacation(row)
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
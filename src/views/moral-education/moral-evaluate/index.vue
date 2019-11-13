
<template>
  <div class="table-container">
      <div class="basic-container">
          <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
    </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryMoralEvaluateList, addMoralEvaluateRecord, updateMoralEvaluateRecord, deleteMoralEvaluateRecord } from '@/api/moralEvaluateManageApi'
export default {
  name: 'moralEvalute',
  mixins: [tableCommon],
  data() {
    return {
      fn: queryMoralEvaluateList,
      singleDelFn: deleteMoralEvaluateRecord,
      option: {
        column: [{
          prop: 'id',
          label: 'id',
          hide: true,
          addDisplay: false,
          editDisplay: false
        }, {
          prop: 'objId',
          label: '姓名',
          search: true,
          editDisabled: true
        }, {
          prop: 'score',
          label: '分值',
          search: true
        }, {
          prop: 'projId',
          label: '指标',
          search: true,
          type: 'cascader',
          editDisabled: true,
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/project/list',
          dicMethod: 'post',
          dicQuery:{
            page: 1,
            rows: 100000,
          },
          props: {
            res: 'data.list',
            label: 'title',
            children: 'child',
            value: 'id'
          }
        }, {
          prop: 'content',
          label: '备注',
        }]
      }
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, done, loading) {
      loading(true)
      try {
        let result = await updateMoralEvaluateRecord(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addMoralEvaluateRecord(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
      
    },
  }
}
</script>

<style lang="scss">
.student-report {
  .el-card__body {
    padding: 0;
  }
}
</style>
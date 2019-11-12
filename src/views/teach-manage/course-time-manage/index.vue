<template>
  <div>
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
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryTimeTable, deleteTimeTable, addTimeTable } from '@/api/courseTimeManageApi'
import { getOrgan } from '@/utils'
export default {
  name: 'courseTimeManage',
  mixins: [tableCommon],
  data() {
    return {
      searchForm: {

      },
      fn: queryTimeTable,
      singleDelFn: deleteTimeTable,
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
            label:'机构名称',
            prop:'orgId',
            rules: {
              required: true,
              message: '机构名称是必填项'
            },
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            searchSpan: 8,
            span: 24,
          },
          {
            label:'周几',
            prop:'weekN',
            type: 'number',
            rules: {
              required: true,
              message: '周几是必填项'
            },
            span: 24,
          },
          {
            label:'第几节',
            prop:'lessonN',
            type: 'number',
            rules: {
              required: true,
              message: '第几节是必填项'
            },
            span: 24,
          },
          {
            label:'开始时间',
            prop:'starttime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: {
              required: true,
              message: '开始时间是必填项'
            },
            span: 24,
          },
          {
            label:'结束时间',
            prop:'endtime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: {
              required: true,
              message: '结束时间是必填项'
            },
            span: 24,
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
    async rowUpdate(row, done, loading) {
      loading(true)
      try {
        let result = await updateCourse(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addTimeTable(row)
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
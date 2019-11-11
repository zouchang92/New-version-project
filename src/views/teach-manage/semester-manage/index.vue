<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="danger" @click="batchDel()" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" @click="initList()" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { querySemester, addSemesters, updateSemester, delSemester, delSemesters } from '@/api/semesterManageApi'
export default {
  name: 'semesterManage',
  mixins: [tableCommon],
  data() {
    return {
      searchForm: {

      },
      delFn: delSemesters,
      singleDelFn: delSemester,
      fn: querySemester,
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
            label:'学期名称',
            prop:'name',
            rules: {
              required: false,
            },
            width: 200,
            search: true,
            searchSpan: 4,
            span: 24
          },
          {
            label:'学年度',
            prop:'year',
            rules: {
              required: false,
            },
            width: 200,
            search: true,
            searchSpan: 4,
            span: 24,
            type: 'select'
          },
          {
            label: '开始时间',
            prop: 'starttime',
            rules: {
              required: false,
            },
            type: 'date',
            width: 200,
            search: true,
            searchSpan: 5,
            span: 24,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd'
          },
          {
            label: '结束时间',
            prop: 'endtime',
            rules: {
              required: false,
            },
            type: 'date',
            width: 200,
            search: true,
            searchSpan: 5,
            span: 24,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd'
          },
        ]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, done, loading) {
      loading(true)
      try{
        let result = await updateSemester(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addSemesters(row)
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
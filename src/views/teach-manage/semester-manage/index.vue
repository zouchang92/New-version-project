<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud :permission="permission" ref="crud" row-key="id" :table-loading="tableListLoading" :page="page" :data="tableList" @search-change="searchChange" :option="option" @selection-change="selectChange" v-model="obj" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate">
          <template slot="searchMenu">
            <el-button v-if="permission.addBtn" type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
            <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small" @click="batchDel()">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle @click="initList()" />
          </template>
        </avue-crud>
      </div>

    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { querySemester, addSemesters, updateSemester, delSemester, delSemesters } from '@/api/semesterManageApi'
import { getOrgan, getDictById } from '@/utils'
const yearDic = getDictById('year')
export default {
  name: 'SemesterManage',
  mixins: [tableCommon, permission],
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
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '学期名称',
            prop: 'name',
            rules: [{
              required: false
            }],
            width: 200,
            search: true,
            searchSpan: 4,
            span: 24
          },
          {
            label: '学年度',
            prop: 'year',
            dicData: yearDic,
            props: {
              label: 'label',
              value: 'value'
            },
            rules: [{
              required: false
            }],
            width: 200,
            search: true,
            searchSpan: 4,
            span: 24,
            type: 'select'
          },
          {
            label: '开始时间',
            prop: 'starttime',
            rules: [{
              required: false
            }],
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
            rules: [{
              required: false
            }],
            type: 'date',
            search: true,
            searchSpan: 5,
            span: 24,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd'
          }
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
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await updateSemester(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        const result = await addSemesters(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
    <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
          <template slot="searchMenu">
            <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
            <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
          </template>
          </avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import { queryClassPlan } from '@/api/classPlanManageApi'
import tableCommon from '@/mixins/table-common'
import { getOrgan } from '@/utils'
export default {
  data() {
    return {
      fn: queryClassPlan,
      option: {
        column: [{
          label: '所属机构',
          prop: 'orgId',
          type: 'tree',
          search: true,
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'id'
          },
          searchSpan: 8,
          span: 24
        }]
      }
    }
  },
  mixins: [tableCommon],
  name: 'classPlanHome',
  mounted() {

  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    }
  }
}
</script>

<style>

</style>
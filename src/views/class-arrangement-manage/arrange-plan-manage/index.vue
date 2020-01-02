<template>
    <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="status" slot-scope="scope">
              <div>
                <el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.status" status="success"></el-progress>
              </div>

            </template>
            <template slot-scope="scope" slot="menu">
              <div v-if="scope.row.status !== 100">
                <el-button @click="$router.push({name: 'arrangeDetailPage', query: { orgId: scope.row.orgId, taskId: scope.row.id }})" type="text" size="small">开始排课</el-button>
              </div>
              <div v-else>
                <el-button type="text" size="small">查看课表</el-button>
                <el-button type="text" size="small">重新排课</el-button>
              </div>
            </template>
          <template slot="searchMenu">
            <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
            <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
          </template>
          
          </avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import { queryClassPlan, addClassPlan } from '@/api/classPlanManageApi'
import tableCommon from '@/mixins/table-common'
import { getOrgan } from '@/utils'
export default {
  data() {
    return {
      fn: queryClassPlan,
      permission: {
        addRowBtn: false,
        editBtn: false,
        viewBtn: false,
        delBtn: false
      },
      option: {
        column: [{
          label: '学期',
          prop: 'semester',
          type: 'select',
          dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'name',
              value: 'id'
            },
            rules: [{
            required: true,
            message: '学期是必填项'
          }]
        }, {
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
          span: 24,
          rules: [{
            required: true,
            message: '所属机构是必填项'
          }]
        }, {
          label: '班级总数',
          prop: 'classCount',
          span: 24,
          editDisplay: false,
          viewDisplay: false,
        }, {
          label: '排课进度',
          prop: 'status',
          span: 24,
          editDisplay: false,
          viewDisplay: false,
          slot: true
        }]
      },
      obj: {

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
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let res = await addClassPlan(row)
        this.$message.success('添加选课任务成功')
        loading(false)
        done()
        await this.initList()
      } catch(err) {
        loading(false)
      }
    }
  }
}
</script>

<style>

</style>
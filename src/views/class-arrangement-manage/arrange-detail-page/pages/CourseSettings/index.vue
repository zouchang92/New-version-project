<template>
  <div>
    <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="{}" :data="tableList" :option="option" v-model="obj">
      <template slot="orgTeacher" slot-scope="scope">
        <div v-if="scope.row.orgTeacher && scope.row.orgTeacher.length">
          {{scope.row.orgTeacher.map(n => n.userId).join(',')}}
        </div>
        <div v-else>
          <p style="color: red">未设置</p>
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
          <el-button type="text" icon="el-icon-search" size="small">查看</el-button>
          <el-button @click="editCell(scope)" type="text" icon="el-icon-edit" size="small">编辑</el-button>
      </template>
    </avue-crud> 
  </div>
</template>

<script>
import { queryCourseNum } from '@/api/classPlanManageApi'
import tableCommon from '@/mixins/table-common'
import { getOrgan } from '@/utils'
export default {
  mixins: [tableCommon],
  data() {
    return {
      permission: {
        addRowBtn: false,
        editBtn: false,
        viewBtn: false,
        delBtn: false
      },
      obj: {

      },
      fn: queryCourseNum,
      initLoad: false,
      option: {
        column: [{
          label: '年级',
          prop: 'orgId',
          type: 'tree',
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'id'
          },
          searchSpan: 8,
          span: 24,
          rules: {
            required: true,
            message: '所属机构是必填项'
          }
        }, {
          label: '任课教师',
          prop: 'orgTeacher',
          span: 24,
          slot: true
        }, {
          label: '班级负责人',
          prop: 'orgLeader',
          span: 24,
          slot: true
        }, {
          label: '上课地点',
          prop: 'classRoomName',
          span: 24,
        }]
      }
    }
  },
  mounted() {
    this.searchForm = {
      ...this.searchForm,
      taskId: this.$route.query.taskId
    }
    
    this.initList()
  },
}
</script>

<style lang="less">

</style>
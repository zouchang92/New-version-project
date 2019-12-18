<template>
  <div class="table-container">
    <div class="basic-container">
      <avue-crud
        ref="crud"
        v-model="obj"
        :permission="permission"
        row-key="id"
        :table-loading="tableListLoading"
        :page="page"
        :data="tableList"
        :option="option"
        @search-change="searchChange"
        @selection-change="selectChange"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        @row-del="singleDel"
      >
        <template slot="sexRatio" slot-scope="scope">
          {{ scope.row.boyQty }}/{{ scope.row.girlQty }}
        </template>
        <template slot="searchMenu">
          <el-button type="danger" icon="el-icon-delete" size="small" @click="batchDel()">批量删除</el-button>
          <el-button type="info" icon="el-icon-refresh" size="small" circle />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text" size="small" @click="showResult(scope.row.orgId)">查看结果</el-button>
          <el-button type="text" size="small">导出结果</el-button>
        </template>
      </avue-crud>
    </div>
    <el-dialog :visible.sync="resultDialog.visible" title="分班结果">
      <div>
        <el-table :data="resultDialog.data">
          <el-table-column
            prop="organId"
            label="班级"
            width="180"
          />
          <el-table-column
            prop="userName"
            label="学生姓名"
            width="180"
          />
          <el-table-column
            prop="gender"
            label="性别"
            width="180"
          />
          <el-table-column
            prop="credNum"
            label="身份证号"
            width="180"
          />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common'
import { queryOrgClass } from '@/api/studentPlaceMentApi'
import { queryStudent } from '@/api/studentManageApi'
import { getOrgan } from '@/utils'
export default {
  name: 'PlacementResult',
  mixins: [tableCommon],
  data() {
    return {
      fn: queryOrgClass,
      obj: {

      },
      permission: {
        delBtn: false,
        editBtn: false,
        viewBtn: false
      },
      resultDialog: {
        organId: '',
        visible: false,
        data: [],
        loading: false,
        obj: {

        },
        page: {
          page: 1,
          rows: 15,
          total: 0
        },
        option: {

        }
      },
      option: {
        column: [{
          label: '班级',
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
        }, {
          label: '班级人数',
          prop: 'studentQty'
        }, {
          label: '男女比例',
          prop: 'sexRatio',
          slot: true
        }, {
          label: '班级负责人',
          prop: 'orgLeader'
        }]
      }
    }
  },
  methods: {
    async showResult(orgId) {
      this.resultDialog.visible = true
      this.resultDialog.organId = orgId
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await this.getResult()
      // eslint-disable-next-line no-empty
      } catch (err) {

      }
    },
    async getResult() {
      this.resultDialog.loading = true
      const { organId, page } = this.resultDialog
      try {
        const res = await queryStudent({ organId, page: page.page, rows: page.rows })
        this.resultDialog = {
          ...this.resultDialog,
          data: res.data.list,
          page: {
            ...this.resultDialog.page,
            page: res.data.currPage,
            total: res.data.totalCount
          },
          loading: false
        }
        return res
      } catch (err) {
        console.log(err)
        this.resultDialog.loading = false
      }
    }
  }
}
</script>
<style lang="">

</style>

<template>
  <div class="ActivityAttendance">
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :data="tableList"
          :option="option"
          :page="page"
          @search-change="searchChange"
          @selection-change="selectionChange"
        >
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row,scope.index)"
            >签到</el-button>
            <el-button
              type="text"
              size="small"
              plain
              @click.stop="handleEdit(scope.row,scope.index)"
            ><span style="color:red;">缺勤</span></el-button>
          </template>
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-folder-checked" size="small">批量记录签到</el-button>
            <el-button
              type="danger"
              icon="el-icon-folder-delete"
              size="small"
              @click="batchDel()"
            >批量记录缺勤</el-button>
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
import { queryAttendance } from '@/api/communityApi.js'
import { getOrgan, getDictById } from '@/utils'
const genderDict = getDictById('gender')

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryAttendance,
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
      option: {
        selection: true,
        align: 'center',
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        menuAlign: 'center',
        column: [
          {
            label: '社团名称',
            prop: 'clubName',
            type: 'select',
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/stClub/list',
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
              message: '所属社团'
            }]
          },
          {
            label: '负责人',
            prop: 'person',
            type: 'select',
            hide: true,
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/stClub/list',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'person',
              value: 'person'
            },
            rules: [{
              required: true,
              message: '负责人'
            }]
          },
          {
            label: '学号',
            prop: 'studentId'
          },
          {
            label: '活动日期',
            prop: 'daterange',
            type: 'daterange',
            hide: true,
            search: true
          },
          {
            label: '姓名',
            prop: 'studentName',
            search: true
          },
          {
            label: '所在班级',
            prop: 'studentOrgId',
            search: true,
            rules: [{
              required: true,
              message: '所属班级'
            }],
            type: 'tree',
            span: 12,
            searchClearable: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            }
          },
          {
            label: '性别',
            prop: 'studentGender',
            dicData: genderDict
          },
          {
            label: '报名日期',
            prop: 'days',
            type: 'date',
            format: 'yyyy-MM-dd'
          }
        ]
      }
    }
  },
  methods: {
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page))
      this.page.total = 20
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },
    selectionChange(list) {
      this.$message.success('选中的数据' + JSON.stringify(list))
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // eslint-disable-next-line eqeqeq
      if (columnIndex == 3) {
        return {
          overflow: 'hidden'
        }
      }
    },
    async get() {
      try {
        const List = await queryAttendance()
        this.tableList = List.data.list
        console.log(this.tableList)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
.ActivityAttendance .el-date-editor .el-range-separator {
  width: 12%;
}
</style>

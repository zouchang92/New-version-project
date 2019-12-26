<template>
  <div class="table-container">
    <div class="basic-container">
      <avue-crud
        ref="crud"
        v-model="obj"
        :data="tableList"
        :option="option"
        :page="page"
        :table-loading="tableListLoading"
        @search-change="searchChange"
        @row-save="rowSave"
        @row-update="rowUpdate"
        @selection-change="selectionChange"
      >
        <template slot="searchMenu">
          <el-button type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="batchDel()">批量删除</el-button>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            size="small"
            @click.stop="handledel(scope.row,scope.index)"
          >删除</el-button>
        </template>
      </avue-crud>
    </div>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
import { queryPerson, delPerson, addPerson, editPerson } from '@/api/CommunityApi.js'
import { getOrgan, getDictById } from '@/utils'
const genderDict = getDictById('gender')

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryPerson,
      delFn: delPerson,
      obj: {},
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
      option: {
        selection: true,
        align: 'center',
        menuAlign: 'center',
        delBtn: false,
        column: [
          {
            label: '社团名称',
            prop: 'clubId',
            search: true,
            type: 'select',
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
            rules: {
              required: true,
              message: '所属社团'
            }
          },
          {
            label: '姓名',
            prop: 'studentName',
            search: true,
            type: 'select',
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/student/list ',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'userName',
              value: 'id'
            },
            rules: {
              message: '姓名'
            }
          },
          {
            label: '所属班级',
            prop: 'studentOrgId',
            rules: {
              required: true,
              message: '所属班级'
            },
            type: 'tree',
            search: true,
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
            type: 'radio',
            dicData: genderDict
          },
          {
            label: '报名日期',
            prop: 'inTime',
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: '缴费情况',
            prop: 'payStatus'
          }
        ]
      }
    }
  },
  created() {
    this.get()
    console.log(this)
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page))
      this.page.total = 20
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
        const List = await queryPerson()
        this.tableList = List.data.list
      } catch (err) {
        console.log(err)
      }
    },
    async rowSave(form, done, loading) {
      loading(true)
      try {
        const result = await addPerson(form)
        await this.resetList()
        done()
      } catch (err) {
        console.log(123)
        loading(false)
      }
    },
    async handledel(row, index, loading) {
      const id = row.id
      try {
        await delPerson({ id })
        await this.resetList()
      } catch (err) {
        console.log(err)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        await editPerson(row)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
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

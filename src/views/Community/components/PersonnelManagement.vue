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
import { queryPerson, delPerson, addPerson } from '@/api/CommunityApi.js'
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
            prop: 'clubName',
            search: true,
            rules: {
              required: true
            }
          },
          {
            label: '姓名',
            prop: 'studentName',
            search: true,
            rules: {
              required: true
            }
          },
          {
            label: '所在班级',
            prop: 'studentOrgName',
            search: true,
            rules: {
              required: true
            }
          },
          {
            label: '性别',
            prop: 'studentGender',
            type: 'radio',
            dicData: genderDict,
            rules: {
              required: true
            }
          },
          {
            label: '报名日期',
            prop: 'inTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: {
              required: true
            }
          },
          {
            label: '缴费情况',
            prop: 'payStatus',
            rules: {
              required: true
            }
          }
        ]
      }
    }
  },
  created() {
    this.get()
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
        await addPerson(form)
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
        this.get()
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

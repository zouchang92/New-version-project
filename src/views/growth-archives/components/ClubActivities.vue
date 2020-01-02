<template>
  <div>
    <avue-crud
      ref="crud"
      row-key="id"
      :page="page"
      :data="tableList"
      :option="option"
      :table-loading="tableListLoading"
      @search-change="searchChange"
      @selection-change="selectChange"
      @row-update="rowUpdate"
    >
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
</template>
<script>
import { clubQueryAll, delclub, updateClub } from '@/api/growthArchivesApi'
import tableCommon from '@/mixins/table-common.js'

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: clubQueryAll,
      del: delclub,
      page: {
        pageSize: 20
      },
      tableList: [],
      option: {
        selection: true,
        align: 'center',
        delBtn: false,
        column: [
          {
            label: '姓名',
            prop: 'studentName',
            rules: [{
              required: true,
              message: '姓名'
            }]
          },
          {
            label: '社团名称',
            prop: 'clubName',
            rules: [{
              required: true,
              message: '社团名称'
            }]
          },
          {
            label: '活动内容',
            prop: 'activityName',
            width: 500,
            rules: [{
              required: true,
              message: '活动内容'
            }]
          },
          {
            label: '社团类型',
            prop: 'orgName',
            rules: [{
              required: true,
              message: '社团类型'
            }]
          },
          {
            label: '参加日期',
            prop: 'activityTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            rules: [{
              required: true,
              message: '参加日期'
            }]
          },
          {
            label: '备注',
            prop: 'description',
            width: 100,
            rules: [{
              required: true,
              message: '备注'
            }]
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
    selectionChange(list) {
      // this.$message.success('选中的数据' + JSON.stringify(list))
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // eslint-disable-next-line eqeqeq
      if (columnIndex == 3) {
        return {
          overflow: 'hidden'
        }
      }
    },
    async getClubQueryAll(id) {
      try {
        const List = await clubQueryAll({ id })
        this.tableList = List.data.list
      } catch (err) {
        console.log(err)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await updateClub(row)
        console.log(result)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
      }
    },
    async handledel(row, index, loading) {
      const id = row.id
      try {
        await delclub({ id })
        this.getClubQueryAll()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="">

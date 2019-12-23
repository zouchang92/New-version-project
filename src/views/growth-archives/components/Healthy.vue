<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="tableList"
        :option="option"
        :page="page"
        :table-loading="tableListLoading"
        :cell-style="cellStyle"
        @row-update="rowUpdate"
        @selection-change="selectionChange"
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
    </el-card>
  </div>
</template>
<script>
import { queryHealth, delHealth, upadateHealth } from '@/api/growthArchivesApi'
import tableCommon from '@/mixins/table-common.js'
export default {
  mixins: [tableCommon],
  data() {
    return {
      page: {
        pageSize: 20
      },
      fn: queryHealth,
      tableList: [],
      option: {
        selection: true,
        align: 'center',
        delBtn: false,
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'studentName'
          },
          {
            label: '身高(cm)',
            prop: 'itemHeight'
          },
          {
            label: '体重(kg)',
            prop: 'itemWeight'
          },
          {
            label: '视力',
            prop: 'itemSight'
          },
          {
            label: '重大疾病',
            prop: 'itemZdjb'
          },
          {
            label: '体检日期',
            type: 'date',
            prop: 'checkTime',
            format: 'yyyy-MM-dd'
          },
          {
            label: '备注',
            prop: 'description',
            width: 100
          }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page))
      this.page.total = 20
    },
    selectionChange(list) {
      this.$message.success('选中的数据' + JSON.stringify(list))
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 3) {
        return {
          overflow: 'hidden'
        }
      }
    },
    async get() {
      try {
        const page = 1
        const rows = 10000
        const List = await queryHealth({ page, rows })
        this.tableList = List.data.list
        console.log(this.tableList)
      } catch (err) {
        console.log(err)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await upadateHealth(row)
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
        await delHealth({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="">

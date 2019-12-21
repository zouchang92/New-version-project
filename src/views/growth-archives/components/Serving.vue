<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          v-model="obj"
          :data="tableList"
          :option="option"
          :page="page"
          :table-loading="tableListLoading"
          :cell-style="cellStyle"
          @row-save="rowSave"
          @row-del="del"
          @row-update="rowUpdate"
          @selection-change="selectionChange"
        >
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import { duty, delduty, editDuty, adduty } from '@/api/growthArchivesApi'
import tableCommon from '@/mixins/table-common.js'
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: duty,
      del: delduty,
      page: {
        pageSize: 20
      },
      obj: [],
      tableList: [],
      option: {
        title: '任职情况',
        selection: true,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: '姓名',
            prop: 'studentName',
            rules: {
              required: true,
              message: '姓名'
            }
          },
          {
            label: '所在职务',
            prop: 'duty',
            rules: {
              required: true,
              message: '所在职务'
            }
          },
          {
            label: '工作内容',
            prop: 'dutyContext',
            rules: {
              required: true,
              message: '工作内容'
            }
          },
          {
            label: '工作表现',
            prop: 'dutyComment',
            rules: {
              required: true,
              message: '工作表现'
            }
          },
          {
            label: '开始时间',
            prop: 'startTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: {
              required: true,
              message: '开始时间'
            }
          },
          {
            label: '结束时间',
            prop: 'endTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: {
              required: true,
              message: '结束时间'
            }
          },
          {
            label: '备注',
            prop: 'description',
            rules: {
              required: true,
              message: '备注'
            }
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    async get() {
      try {
        const List = await duty({})
        this.tableList = List.data
      } catch (err) {
        console.log(err)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await editDuty(row)
        console.log(result)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await adduty(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
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
      if (columnIndex == 4) {
        // eslint-disable-next-line eqeqeq
        if (row.dutyComment == '优秀') {
          return {
            color: 'red'
          }
        // eslint-disable-next-line eqeqeq
        } else if (row.dutyComment == '良好') {
          return {
            color: '#1890FF'
          }
        // eslint-disable-next-line eqeqeq
        } else if (row.dutyComment == '一般') {
          return {
            color: '#000'
          }
        } else {
          return {
            color: '#808080'
          }
        }
      }
    }
  }
}
</script>
<style lang="">
</style>

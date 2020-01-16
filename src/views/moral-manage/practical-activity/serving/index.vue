<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :permission="permission"
          rowKey="id"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
          :cell-style="cellStyle"
          :table-loading="tableListLoading"
          ref="crud"
          :page="page"
          :data="tableList"
          :option="option"
          v-model="obj"
        >
          <template slot="searchMenu">
            <el-button
              v-if="permission.addBtn"
              type="success"
              @click.stop="handleAdd()"
              icon="el-icon-plus"
              size="small"
              >新建</el-button
            >
            <el-button
              v-if="permission.batchDelBtn"
              @click="batchDel()"
              type="danger"
              icon="el-icon-delete"
              size="small"
              >批量删除</el-button
            >
            <el-button
              v-if="permission.import"
              type="warning"
              icon="el-icon-download"
              size="small"
              >导入</el-button
            >
            <!-- <el-button
              v-if="permission.export"
              type="warning"
              icon="el-icon-upload2"
              size="small"
              @click="
                exportExcel(
                  `${baseUrl}/zhxyx/sjPractice/export
`,
                  []
                )
              "
              >导出</el-button 
            >-->
            <el-button
              @click="initList()"
              type="info"
              icon="el-icon-refresh"
              size="small"
              circle
            ></el-button>
          </template>
          <template slot="studentNumForm" slot-scope="scope">
            <el-input
              :disabled="scope.row.id !== ''"
              clearable
              v-model="obj.studentNum"
              @click.native="openMemberModal(scope)"
            />
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              @click.stop="handledel(scope.row, scope.index)"
              >删除</el-button
            >
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import { duty, adduty, delduty, editDuty, delsduty } from '@/api/growthArchivesApi'
import permission from "@/mixins/permission"
import tableCommon from '@/mixins/table-common.js'
import { getOrgan, getDictById } from '@/utils'
const ServingType = getDictById('servingType')
export default {
  mixins: [tableCommon,permission ],
  data() {
    return {
      fn: duty,
      singleDelFn: delduty,
      delFn: delsduty,
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
        delBtn: false,
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: '姓名',
            prop: 'studentName',
            search:true,
            rules: [{
              required: true,
              message: '姓名'
            }]
          },
          {
            label: '所在职务',
            prop: 'duty',
            rules: [{
              required: true,
              message: '所在职务'
            }]
          },
          {
            label: '工作内容',
            prop: 'dutyContext',
            rules: [{
              required: true,
              message: '工作内容'
            }]
          },
          {
            label: '工作表现',
            type: 'select',
            prop: 'dutyComment',
            dicData: ServingType,
            rules: [{
              required: true,
              message: '工作表现'
            }]
          },
          {
            label: '开始时间',
            prop: 'startTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: [{
              required: true,
              message: '开始时间'
            }]
          },
          {
            label: '结束时间',
            prop: 'endTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: [{
              required: true,
              message: '结束时间'
            }]
          },
          {
            label: '备注',
            prop: 'description',
            type: "textarea",
            component: "rich-text",
            span: 24,
            rules: [{
              required: true,
              message: '备注'
            }]
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    async get() {
      try {
        const List = await duty({})
        this.tableList = List.data
      } catch (err) {
        console.log(err)
      }
    },
    async rowSave(row, done, loading) {
      loading(true);
      try {
        let res = await adduty(row);
        await this.resetList();
        loading(false);
        this.$message.success("添加成功");
        done();
      } catch (err) {
        loading(false);
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
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page))
      this.page.total = 20
    },
    selectionChange(list) {
      this.$message.success('选中的数据' + JSON.stringify(list))
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        if (row.dutyComment == '0') {
          return {
            color: 'red'
          }
        } else if (row.dutyComment == '1') {
          return {
            color: '#1890FF'
          }
        } else if (row.dutyComment == '2') {
          return {
            color: '#000'
          }
        } else {
          return {
            color: '#808080'
          }
        }
      }
    },
    async handledel(row, index, loading) {
      const id = row.id
      console.log(row.dutyComment)
      try {
        await delduty({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="">
</style>

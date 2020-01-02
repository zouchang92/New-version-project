<template>
  <div>
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
          @row-save="rowSave"
          @row-update="rowUpdate"
        >
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-plus" size="small" @click.stop="add">新建</el-button>
            <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
          </template>
        </avue-crud>
      </div>
    </div>
    <el-dialog title="新建课时" :visible.sync="dialogTableVisible" width="80%">
      <el-dialog
        width="30%"
        title="课时"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div><p>开始时间:</p></div>
        <div><p>结束时间:</p></div>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-dialog>
      <div class="time-title">
        <p>机构名称:</p>
        <el-cascader
          v-model="value"
          class="title-org"
          :options="options"
          :props="{value:'orgName',label:'orgName',children: 'child', checkStrictly: true }"
          @change="handleChange"
        />
        <div style="display:flex">
          <p style="margin-right: 37px;">学期:</p>
          <el-select v-model="value" placeholder="请选择学期">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="title-content">
          <ul>
            <li v-for="(item,index) in 12" :key="index" class="content-text">
              <div class="content-title">第{{ item }}节课</div>
              <div class="content-t" @click="innerVisible = true"><span>设置时间段</span></div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import permission from '@/mixins/permission'
import { queryTimeTable, deleteTimeTable, addTimeTable, querySemester } from '@/api/courseTimeManageApi'
import { getOrganTree } from '@/api/organManageApi'
import { getOrgan } from '@/utils'
export default {
  name: 'CourseTimeManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      options: {},
      value: null,
      list: {},
      dialogTableVisible: false,
      innerVisible: false,
      fn: queryTimeTable,
      singleDelFn: deleteTimeTable,
      data: [],
      option: {

        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            addBtn: false
          },
          {
            label: '机构名称',
            prop: 'orgId',
            rules: [{
              required: true,
              message: '机构名称是必填项'
            }],
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            searchSpan: 8,
            span: 24
          },
          {
            label: '周几',
            prop: 'weekN',
            type: 'number',
            rules: [{
              required: true,
              message: '周几是必填项'
            }],
            span: 24
          },
          {
            label: '第几节',
            prop: 'lessonN',
            type: 'number',
            rules: [{
              required: true,
              message: '第几节是必填项'
            }],
            span: 24
          },
          {
            label: '开始时间',
            prop: 'starttime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: [{
              required: true,
              message: '开始时间是必填项'
            }],
            span: 24
          },
          {
            label: '结束时间',
            prop: 'endtime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: [{
              required: true,
              message: '结束时间是必填项'
            }],
            span: 24
          }
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await updateCourse(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        const result = await addTimeTable(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async getOrganTree() {
      try {
        const a = await getOrganTree()
        this.options = a.data
        console.log(a.data)
      } catch (err) {
        console.log(err)
      }
    },
    async querySemester() {
      try {
        const a = await querySemester()
        this.list = a.data.list
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    handleChange(value) {
      console.log(value)
    },
    add() {
      this.dialogTableVisible = true
      this.getOrganTree()
      this.querySemester()
    }
  }
}
</script>

<style scoped>
  .title-org{
    position: relative;
    top: -41px;
    left: 71px;
  }
  ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .content-text{
    width: 220px;
    height:174px;
    border:1px solid #000;
    margin:5px
  }
  .content-title{
    text-align: center;
    padding: 15px;
    font-size: 18px;
    font-weight: 700;
    color: #1ABC9C;
  }
  .content-t{
    text-align: center;
    padding: 10px;
    font-size: 15px;
    background: #F5F5F5;
    min-height: 102px;
    cursor: pointer;
  }
</style>

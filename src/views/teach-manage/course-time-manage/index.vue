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
      <div class="time-title">
        <p>机构名称:</p>
        <el-cascader
          v-model="value"
          class="title-org"
          :options="options"
          :props="{value:'id',label:'orgName',children: 'child', checkStrictly: true }"
          @change="handleChange"
        />
        <div class="title-content">
          <ul>
            <li v-for="(item,index) in timer" :key="index" class="content-text" @click="clickadd(item, index)">
              <div class="content-title">第{{ item.lessonN }}节课</div>
              <div v-if="item.starttime == ''" class="content-t"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ item.starttime | formatTS }}-{{ item.endtime | formatTS }}</p>
                <p> {{ item.region }} </p>
              </div>

            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsub">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="30%"
      title="课时"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="开始时间:">
          <el-time-picker v-model="form.date1" placeholder="Pick a time" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="请选择时间段">
          <el-select v-model="form.region" placeholder="请选择时间">
            <el-option label="早晨" value="早晨" />
            <el-option label="上午" value="上午" />
            <el-option label="下午" value="下午" />
            <el-option label="晚上" value="晚上" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import permission from '@/mixins/permission'
import { formatDate } from '@/api/date.js'
import { queryTimeTable, deleteTimeTable, addTimeTable, querySemester } from '@/api/courseTimeManageApi'
import { getOrganTree } from '@/api/organManageApi'
import { getOrgan } from '@/utils'
export default {
  name: 'CourseTimeManage',
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'hh:mm')
    }
  },
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      activeIndex: 0,
      options: {},
      value: null,
      list: {},
      timer: [{ lessonN: '1', starttime: '', endtime: '' }, { lessonN: '2', starttime: '', endtime: '' }, { lessonN: '3', starttime: '', endtime: '' }, { lessonN: '4', starttime: '', endtime: '' }, { lessonN: '5', starttime: '', endtime: '' }, { lessonN: '6', starttime: '', endtime: '' }, { lessonN: '7', starttime: '', endtime: '' }, { lessonN: '8', starttime: '', endtime: '' }, { lessonN: '9', starttime: '', endtime: '' }, { lessonN: '10', starttime: '', endtime: '' }, { lessonN: '11', starttime: '', endtime: '' }, { lessonN: '12', starttime: '', endtime: '' }],
      dialogTableVisible: false,
      innerVisible: false,
      valuea: '',
      fn: queryTimeTable,
      singleDelFn: deleteTimeTable,
      data: [],
      form: {},
      region: '',
      starttime: '',
      endtime: '',
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
      obj: {},
      orgId: '',
      ssh: ''
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
      var a = value[value.length - 1]
      this.orgId = a
      console.log(a)
    },
    changevalue(valuea) {
      this.ssh = valuea
      console.log(valuea)
    },
    add() {
      this.dialogTableVisible = true
      this.getOrganTree()
      this.querySemester()
    },
    onSubmit() {
      const { timer, form } = this
      this.innerVisible = false
      this.timer[this.activeIndex] = {
        ...this.timer[this.activeIndex],
        starttime: form.date1,
        endtime: form.date2
      }
    },
    async addsub() {
      this.dialogVisible = false
      const a = this.timer
      const orgId = this.orgId
      try {
        for (let i = 0; i < a.length; i++) {
          if (a[i].starttime != '') {
            const lessonN = a[i].lessonN
            const starttime = a[i].starttime
            const endtime = a[i].endtime
            await addTimeTable({ orgId, lessonN, starttime, endtime })
            console.log(orgId, lessonN, starttime, endtime)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    clickadd(item, index) {
      this.innerVisible = true
      this.activeIndex = index
      this.form = {
        ...this.form,
        date1: item.starttime,
        date2: item.endtime
      }
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
  .content-t p{
    margin:0px;
  }
</style>

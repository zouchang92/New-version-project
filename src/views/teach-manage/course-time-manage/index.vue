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
        >
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              size="small"
              @click.stop="handleupdate(scope.row,scope.index)"
            >编辑</el-button>
          </template>
          <template slot="searchMenu">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="small"
              @click.stop="add"
            >新建</el-button>
            <el-button
              v-if="permission.import"
              type="warning"
              icon="el-icon-download"
              size="small"
            >导入</el-button>
            <el-button
              v-if="permission.batchDelBtn"
              type="danger"
              icon="el-icon-delete"
              size="small"
            >批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
          </template>
        </avue-crud>
      </div>
    </div>
    <el-dialog title="新建课时" :visible.sync="dialogTableVisible" width="80%" :before-close="handleClose">
      <div class="time-title">
        <p>机构名称:</p>
        <el-cascader
          v-model="value"
          class="title-org"
          :options="options"
          :props="{
            value: 'id',
            label: 'orgName',
            children: 'child',
            checkStrictly: true
          }"
          @change="handleChange"
        />
        <div class="title-content">
          <ul>
            <li
              v-for="(item, index) in timer"
              :key="index"
              class="content-text"
              @click="clickadd(item, index)"
              :id="item.lessonN" ref="dataInfo"
            >
              <div class="content-title">第{{ item.lessonN }}节课</div>
              <div v-if="item.starttime == ''" class="content-t">
                <span>设置时间段</span>
              </div>
              <div v-else class="content-t">
                <p>
                  {{ item.starttime | formatTS }}-{{ item.endtime | formatTS }}
                </p>
                <p>{{ item.region }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addtime()">添加</el-button>
        <el-button @click="handlesc">取 消</el-button>
        <el-button type="primary" @click="addsub">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="30%"
      title="课时"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form ref="form" status-icon :rules="rules" :model="form" label-width="120px">
        <el-form-item label="开始时间:" prop="date1">
          <el-time-picker
            v-model="form.date1"
            format="HH:mm"
            placeholder="请输入上课时间"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="结束时间:" prop="date2">
          <el-time-picker
            v-model="form.date2"
            format="HH:mm"
            placeholder="请输入下课时间"
            style="width: 100%;"
          />
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
import {
  queryTimeTable,
  deleteTimeTable,
  addTimeTable,
  querySemester
} from '@/api/courseTimeManageApi'
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
  inject: ['reload'],
  mixins: [tableCommon, permission],
  data() {
    const star = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('开始时间不能为空'))
      }
      callback()
    }
    const end = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('结束时间不能为空'))
      } else if (value < this.form.date1) {
        return callback(new Error('开始时间不能大于结束时间'))
      }
      callback()
    }
    return {
      searchForm: {},
      activeIndex: 0,
      options: [],
      value: null,
      list: {},
      timer: [
        { lessonN: '1', starttime: '', endtime: '' },
        { lessonN: '2', starttime: '', endtime: '' },
        { lessonN: '3', starttime: '', endtime: '' },
        { lessonN: '4', starttime: '', endtime: '' },
        { lessonN: '5', starttime: '', endtime: '' },
        { lessonN: '6', starttime: '', endtime: '' },
        { lessonN: '7', starttime: '', endtime: '' },
        { lessonN: '8', starttime: '', endtime: '' },
        { lessonN: '9', starttime: '', endtime: '' },
        { lessonN: '10', starttime: '', endtime: '' },
        { lessonN: '11', starttime: '', endtime: '' },
        { lessonN: '12', starttime: '', endtime: '' }
      ],
      rules: {
        date1: [{ validator: star, trigger: 'blur' }],
        date2: [{ validator: end, trigger: 'blur' }]
      },
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
      a: '',
      option: {
        editBtn: false,
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
            rules: [
              {
                required: true,
                message: '机构名称是必填项'
              }
            ],
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
            label: '总节数',
            prop: 'lessonCount',
            type: 'number',
            rules: [
              {
                required: true,
                message: '第几节是必填项'
              }
            ],
            span: 24
          },
          {
            label: '上课时间',
            prop: 'startTime',
            type: 'time',
            format: 'HH:mm',
            valueFormat: 'HH:mm',
            rules: [
              {
                required: true,
                message: '开始时间是必填项'
              }
            ],
            span: 24
          },
          {
            label: '下课时间',
            prop: 'endTime',
            type: 'time',
            format: 'HH:mm',
            valueFormat: 'HH:mm',
            rules: [
              {
                required: true,
                message: '结束时间是必填项'
              }
            ],
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
    async handleupdate(row, index) {
      this.dialogTableVisible = true
      this.getOrganTree()
      this.timer = row.items
      try {
        this.value = row.orgId
        const { timer, form } = this
        this.a = {
          ...this.a,
          starttime: form.date1,
          endtime: form.date2
        }
        this.innerVisible = false
        // const result = await addTimeTable(row)
        await this.resetList()
      } catch (err) {
        console.log(err)
      }
    },
    handlesc() {
      this.dialogTableVisible = false
      this.reload()
    },
    init() {
      this.starttime = ''
      this.endtime = ''
      this.value = null
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
          this.reload()
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
      console.log(value)
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
      const orgId = this.orgId
      const items = this.timer
      try {
        if (orgId === '') {
          this.$confirm('机构是必须要填的', '提示')
        } else if (orgId !== '') {
          await addTimeTable({
            orgId,
            items
          })
          this.starttime = ''
          this.endtime = ''
          this.value = null
          this.reload()
          this.dialogTableVisible = false
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
      this.a = item.lessonN
    },
    addtime() {
      var b = document.getElementsByClassName("content-title")
      console.log(b.length)
      let a = b.length
      a+1
      console.log(a++)
      if(a+1<13 || a<13){
        this.timer.push({lessonN:a, starttime: '', endtime: ''})
      }else if(a+1>13 || a>13){
        this.$confirm('不能添加了','提示')
      }
      
    }
  }
}
</script>

<style scoped>
.title-org {
  position: relative;
  top: -41px;
  left: 71px;
}
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.content-text {
  width: 220px;
  height: 174px;
  border: 1px solid #000;
  margin: 5px;
}
.content-title {
  text-align: center;
  padding: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #1abc9c;
}
.content-t {
  text-align: center;
  padding: 10px;
  font-size: 15px;
  background: #f5f5f5;
  min-height: 102px;
  cursor: pointer;
}
.content-t p {
  margin: 0px;
}
</style>

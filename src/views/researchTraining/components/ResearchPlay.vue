<template>
  <div class="ResearchPlay">
    <div class="title">
      <div class="Nature">
        性质:
        <el-select v-model="value" placeholder="请选择课程性质">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="type">
        类型:
        <el-select v-model="value1" placeholder="请选择课程性质">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="name">
        <p>名称:</p>
        <el-input v-model="input" placeholder="请输入名称" />
      </div>
      <div style="height:32px;margin-left:23px;margin-top:24px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          size="small"
          @click="dialogFormVisible = true"
        >新建</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">导入</el-button>
      </div>
    </div>
    <el-dialog title="新建计划" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="研训名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人" :label-width="formLabelWidth">
          <el-input v-model="form.presenter" autocomplete="off" />
        </el-form-item>
        <el-form-item label="研训时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="研训性质" :label-width="formLabelWidth">
          <el-select v-model="form.classProperty" placeholder="请选择研修性质">
            <el-option label="必修" value="必修" />
            <el-option label="选修" value="选修" />
          </el-select>
        </el-form-item>
        <el-form-item label="研训形式" :label-width="formLabelWidth">
          <el-input v-model="form.classMethod" autocomplete="off" />
        </el-form-item>
        <el-form-item label="研训类型" :label-width="formLabelWidth">
          <el-input v-model="form.classType" autocomplete="off" />
        </el-form-item>
        <el-form-item label="研训地点" :label-width="formLabelWidth">
          <el-input v-model="form.place" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课时" :label-width="formLabelWidth">
          <el-input v-model="form.lession" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参训名单" :label-width="formLabelWidth">
          <el-input v-model="form.memberList" autocomplete="off" />
        </el-form-item>
        <el-form-item label="未完成名单" :label-width="formLabelWidth">
          <el-input v-model="form.undoneList" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="研训名称" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主讲人">
          <template slot-scope="scope">
            <span>{{ scope.row.presenter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.classTime | formatTS }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训性质">
          <template slot-scope="scope">
            <span>{{ scope.row.classProperty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训形式">
          <template slot-scope="scope">
            <span>{{ scope.row.classMethod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训类型">
          <template slot-scope="scope">
            <span>{{ scope.row.classType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训地点">
          <template slot-scope="scope">
            <span>{{ scope.row.place }}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时">
          <template slot-scope="scope">
            <span>{{ scope.row.lession }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参训名单" width="150" style="overflow:hidden">
          <template slot-scope="scope">
            <span>{{ scope.row.trainUsers }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未完成人员" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <p>数学组/{{ scope.row.undoneList }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</span>
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="handleDelete(scope.row)"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
import { formatDate } from '@/api/date.js'
import {
  queryResearch,
  addResearch,
  delResearch
} from '@/api/researchTrainingApi'
export default {
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  mixins: [tableCommon],
  data() {
    return {
      fn: queryResearch,
      options: [
        {
          value: '选项1',
          label: '选修'
        },
        {
          value: '选项2',
          label: '必修'
        }
      ],
      options1: [
        {
          value: '选项1',
          label: '教育学培训'
        },
        {
          value: '选项2',
          label: '教育管理培训'
        }
      ],
      value: '',
      value1: '',
      input: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [],
      form: { }
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row.id)
    },
    async handleDelete(row) {
      try {
        const id = row.id
        await delResearch({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async get() {
      try {
        const page = 1
        const rows = 10000
        const List = await queryResearch({ page, rows })
        this.tableData = List.data.list
        console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    },
    async submit() {
      try {
        const name = JSON.parse(JSON.stringify(this.form.name))
        const presenter = JSON.parse(JSON.stringify(this.form.presenter))
        const classProperty = JSON.parse(JSON.stringify(this.form.classProperty))
        const classMethod = JSON.parse(JSON.stringify(this.form.classMethod))
        const classTime = JSON.parse(JSON.stringify(this.form.date1))
        const classType = JSON.parse(JSON.stringify(this.form.classType))
        const place = JSON.parse(JSON.stringify(this.form.place))
        const lession = JSON.parse(JSON.stringify(this.form.lession))
        const memberList = JSON.parse(JSON.stringify(this.form.memberList))
        const undoneList = JSON.parse(JSON.stringify(this.form.undoneList))

        console.log(name, presenter, classProperty, classMethod, classTime, classType, place, lession, memberList, undoneList)
        await addResearch({ name, presenter, classProperty, classMethod, classTime, classType, place, lession, memberList, undoneList })
        this.dialogFormVisible = false
        this.get()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang='scss' scpoed>
.ResearchPlay {
  .title {
    margin: 15px;
    margin-top: 0px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    display: flex;
    .Nature,
    .type,
    .name {
      padding-top: 25px;
      padding-left: 40px;
    }
    .name {
      width: 270px;
      display: flex;
      p {
        margin: 0px;
        display: block;
        width: 50px;
        margin-top: 6px;
      }
    }
  }
  .content {
    margin: 15px;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }
  }
}
</style>
<style>
.ResearchPlay .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.ResearchPlay .title .el-input__suffix {
  top: 4px;
}
</style>

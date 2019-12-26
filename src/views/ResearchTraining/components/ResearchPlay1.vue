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
      >
        <template slot="undoneList" slot-scope="scope">
            <p>数学组/{{ scope.row.undoneList }}</p>
        </template>
        <template slot="searchMenu">
          <el-button type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
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
import { formatDate } from '@/api/date.js'
import {
  queryResearch,
  addResearch,
  delResearch
} from '@/api/ResearchTrainingApi'
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
      optionsa: [
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
      obj: {},
      dialogFormVisible: false,
      formLabelWidth: '120px',
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
      form: { },
      option: {
        selection: true,
        align: 'center',
        delBtn: false,
        menuAlign: 'center',
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '研训名称',
            prop: 'name',
            rules: {
              required: true,
              message: '研训名称'
            }
          },
          {
            label: '主讲人',
            prop: 'presenter',
            search: true,
            rules: {
              required: true,
              message: '主讲人'
            }
          },
          {
            label: '负责人',
            prop: 'person',
            rules: {
              required: true,
              message: '负责人'
            }
          },
          {
            label: '研训时间',
            prop: 'classTime',
            type: 'date',
            format: 'yyyy-MM-dd',
            rules: {
              required: true,
              message: '研训时间'
            }
          },
          {
            label: '研训性质',
            prop: 'classProperty',
            rules: {
              required: true,
              message: '研训性质'
            }
          },
          {
            label: '研训形式',
            prop: 'classMethod',
            rules: {
              required: true,
              message: '研训形式'
            }
          },
          {
            label: '研训类型',
            prop: 'classType',
            rules: {
              required: true,
              message: '研训类型'
            }
          },
          {
            label: '研训地点',
            prop: 'place',
            rules: {
              required: true,
              message: '研训地点'
            }
          },
          {
            label: '课时',
            prop: 'lession',
            rules: {
              required: true,
              message: '课时'
            }
          },
          {
            label: '参训名单',
            prop: 'trainUsers.userName',
            rules: {
              required: true,
              message: '参训名单'
            }
          },
          {
            label: '未完成人员',
            prop: 'undoneList.userName',
            rules: {
              required: true,
              message: '未完成人员'
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.get()
    console.log(this.tableList.id)
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

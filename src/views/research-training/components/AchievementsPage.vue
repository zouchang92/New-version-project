<template>
  <div class="table-container" style="height:900px;background:#eee">
    <div class="basic-container">
      <avue-crud
        ref="crud"
        v-model="obj"
        row-key="id"
        :data="tableList"
        :option="option"
        :page="page"
        :table-loading="tableListLoading"
        @search-change="searchChange"
        @row-save="rowSave"
        @row-update="rowUpdate"
      >
        <template slot="permission" slot-scope="scope">
          <el-button @click.native="setAuthorize(scope)">设置菜单权限</el-button>
        </template>
        <template slot="searchMenu">
          <el-button type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
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
import { queryList } from '@/api/researchTrainingApi'
import { getDictById } from '@/utils'
const research = getDictById('researchProperties')
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
      fn: queryList,
      obj: {},
      form: {},
      value: '',
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
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
            search: true,
            rules: [{
              required: true,
              message: '研训名称'
            }]
          },
          {
            label: '研训性质',
            search: true,
            type: 'select',
            prop: 'classProperty',
            dicData: research,
            props: {
              label: 'label',
              value: 'value'
            },
            rules: [{
              required: true,
              message: '研训性质'
            }]
          },
          {
            label: '研训类型',
            search: true,
            hide: true,
            type: 'select',
            prop: 'classType',
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/yxTask/list',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'classType',
              value: 'id'
            },
            rules: [{
              required: true,
              message: '研训性质'
            }]
          },
          {
            label: '主讲人',
            prop: 'presenter',
            rules: [{
              required: true,
              message: '主讲人'
            }]
          },
          {
            label: '次数',
            prop: 'classTime',
            rules: [{
              required: true,
              message: '次数'
            }]
          },
          {
            label: '课时',
            prop: 'lession',
            rules: [{
              required: true,
              message: '课时'
            }]
          },
          // {
          //   label: '参训名单',
          //   prop: 'classType',
          //   rules: {
          //     required: true,
          //     message: '研训类型'
          //   }
          // },
          {
            label: '未完成人员',
            prop: 'place',
            rules: [{
              required: true,
              message: '研训地点'
            }]
          }
          // {
          //   label: '参训名单',
          //   prop: 'trainUsers'
          //   rules: {
          //     required: true,
          //     message: '参训名单'
          //   }
          // },
          // {
          //   label: '未完成人员',
          //   prop: 'undoneList.userName'
          //   rules: {
          //     required: true,
          //     message: '未完成人员'
          //   }
          // }
        ]
      }
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async handledel(row, index, loading) {
      const id = row.id
      try {
        await delResearch({ id })
        await this.resetList()
      } catch (err) {
        console.log(err)
      }
    },
    async rowSave(form, done, loading) {
      loading(true)
      try {
        await addResearch(form)
        await this.resetList()
        done()
      } catch (err) {
        console.log(123)
        loading(false)
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
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        await updateResearch(row)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
      }
    }
  }
}
</script>
<style lang='scss' scpoed>

</style>

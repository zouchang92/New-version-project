<template>
  <div class="RewardPunishment">
    <el-card class="box-card">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>奖励明细</p>
      </div>
      <avue-crud
        ref="crud"
        v-model="obj"
        :data="tableList"
        :option="option"
        :table-loading="tableListLoading"
        style="margin-top:10px;"
        @selection-change="selectionChange"
        @row-update="rowUpdate"
        @row-save="rowSave"
      >
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            size="small"
            @click.stop="handledel(scope.row,scope.index)"
          >删除</el-button>
          <el-button class="el-button--text" size="small" @click.stop="examine(scope.row,scope.index)">审核
          </el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>惩罚明细</p>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50px;" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="reward" label="惩罚名称" />
        <el-table-column prop="level" label="惩罚级别" />
        <el-table-column prop="data" label="撤销日期" />
        <el-table-column prop="remarks" label="惩处原因" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width:100%;margin-top:20px;">+新增</el-button>
    </el-card>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
import { daRap, deleteDaRap, editDaRap, examineDaRap } from '@/api/growthArchivesApi'
export default {
  mixins: [tableCommon],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    input: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String
    }
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      input: '',
      fn: daRap,
      obj: [],
      tableList: [],
      tableData: [],
      dialogVisible: false,
      option: {
        selection: true,
        addBtn: true,
        delBtn: false,
        header: true,
        align: 'center',
        viewBtn: false,
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'studentNum'
          },
          {
            label: '奖励名称',
            prop: 'itemName'
          },
          {
            label: '奖励级别',
            prop: 'level'
          },
          {
            label: '获奖日期',
            prop: 'rapTime',
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: '获奖名次',
            prop: 'score'
          },
          {
            label: '颁奖单位',
            prop: 'createUserId'
          },
          {
            label: '奖励照片',
            type: 'upload',
            prop: 'rapPic',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12
          },
          {
            label: '备注',
            prop: 'reason'
          }
        ]
      }
    }
  },
  watch: {
    option: function(a, b) {
      console.log(a, b)
    }
  },
  mounted() {},
  created() {
    this.get()
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    handleClick(row) {
      console.log(row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async get() {
      try {
        const list = await daRap()
        this.tableList = list.data
        console.log(this.tableList)
      } catch (err) {
        console.log(err)
      }
    },
    async rowSave(form, done, loading) {
      loading(true)
      try {
        await addclub(form)
        done()
      } catch (err) {
        console.log(123)
        loading(false)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        row.rapPic = row.rapPic && row.rapPic.length ? row.rapPic[0].value : ''
        const result = await editDaRap(row)
        console.log(result)
        await this.resetList()
        done()
      } catch (err) {
        console.log(err)
        loading(false)
      }
    },
    async examine(row, index) {
      try {
        const id = row.id
        await examineDaRap({ id })
      } catch (err) {
        console.log(err)
      }
    },
    selectionChange(list) {
      // this.$message.success('选中的数据' + JSON.stringify(list))
    },
    async handledel(row, index, loading) {
      const id = row.id
      try {
        await deleteDaRap({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style >
</style>

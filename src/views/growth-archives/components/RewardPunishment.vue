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
      <avue-crud
        ref="crud"
        v-model="obj1"
        :data="tableData"
        :option="option1"
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
      <el-button style="width:100%;margin-top:20px;" @click.stop="addPunishment()">+新增</el-button>
    </el-card>
    <el-dialog title="新建惩罚" :visible.sync="dialogTableVisible2">
      <el-form :model="forms">
        <el-form-item label="姓名" label-width="120" required>
          <el-input v-model="forms.studentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="惩罚名称" label-width="120" required>
          <el-input v-model="forms.itemName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="惩处类型" label-width="120" required>
          <el-input v-model="forms.level" autocomplete="off" />
        </el-form-item>
        <el-form-item label="惩罚时间" label-width="120" required>
          <el-date-picker v-model="forms.rapTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="撤销时间" label-width="120" required>
          <el-date-picker v-model="forms.endTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="惩罚原因" label-width="120" required>
          <el-input v-model="forms.reason" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" label-width="120" required>
          <el-input v-model="forms.reasons" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="Submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
import { daRap, deleteDaRap, editDaRap, examineDaRap, addDaRap } from '@/api/growthArchivesApi'
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
      input1: '',
      obj: [],
      obj1: [],
      tableList: [],
      tableData: [],
      dialogTableVisible2: false,
      forms: {},
      option: {
        selection: true,
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
      },
      option1: {
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
            label: '惩罚名称',
            prop: 'itemName'
          },
          {
            label: '惩罚类型',
            prop: 'level'
          },
          {
            label: '惩罚日期',
            prop: 'rapTime',
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: '撤销日期',
            prop: 'rapTime',
            type: 'date',
            format: 'yyyy-MM-dd'
          },
          {
            label: '惩罚原因',
            prop: 'reason'
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
  mounted() {
    
  },
  created() {
    this.get()
    console.log(this.tableData, this.tableList)
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
        const a = list.data
        // eslint-disable-next-line eqeqeq
        for (const i in a) {
          // console.log(a[i])
          if (a[i].status == 1) {
            this.tableList.push(a[i])
          }
          if (a[i].status == 0) {
            this.tableData.push(a[i])
          }
        }
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
    },
    addPunishment() {
      this.dialogTableVisible2 = true
    },
    async Submit() {
      try {
        const semesterName = '2019年上学期'
        const orgName = '三年级二班'
        const studentNum = '10001'
        const studentName = JSON.parse(JSON.stringify(this.forms.studentName))
        const itemName = JSON.parse(JSON.stringify(this.forms.itemName))
        const level = JSON.parse(JSON.stringify(this.forms.level))
        const rapTime = JSON.parse(JSON.stringify(this.forms.rapTime))
        const reason = JSON.parse(JSON.stringify(this.forms.reason))
        const status = 0
        await addDaRap({ semesterName, orgName, studentNum, studentName, itemName, level, status, rapTime, reason })
      } catch (err) {
        console.log(err)
      }
      
    }
  }
}
</script>
<style >
</style>

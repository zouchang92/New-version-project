<template>
  <div>
  <el-table size="mini" class="table" style="width: 100%" :border="true" :data="tData">
    <el-table-column
      prop="date1"
      label="日期"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rules"
      label="考勤时间">
      <template slot-scope="scope">
        <div v-if="scope.row.rules.length === 0" class="empty">
          <p style="color: #bbb">未设置考勤时间</p>
        </div>
        <div class="rule-list" v-else>
          <div v-for="(item, i) in scope.row.rules" class="into-list">
            <img src="@/assets/attendance/in.svg" />{{item.in}}到校 &nbsp;&nbsp;<img src="@/assets/attendance/out.svg" />{{item.out}}离校
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      width="90"
      label="操作" v-if="canEdit">
      <template slot-scope="scope">
        <div v-if="scope.row.rules.length === 0">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)">设置时间</el-button>
        </div>
        <span v-else>
          <div style="display: flex">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>|
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </span>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :modal-append-to-body='false' title="时间设置" :visible.sync="dialogVisible">
     <div>
       <time-setting :date="date" :needDate="needDate" ref="timeSetting" :timeData="timeData"  />
     </div>
     <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveSetting">保存</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import TimeSetting from '../TimeSetting'
import _ from 'lodash'
import moment from 'moment'
export default {
  data() {
    return {
      dialogVisible: false,
      index: 0,
      date: '',
      timeData: [],
      tData: this.processTableData(this.value)
    }
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    needDate: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    value(value) {
      this.tData = this.processTableData(value)
    }
  },
  methods: {
    processTableData(d) {
      return _.map(d, n => {
        return {
          ...n,
          date1: this.needDate ? moment(n.date).format('YYYY-MM-DD') : n.date
        }
      })
    },
    handleEdit(index, row) {
      this.index = index
      this.dialogVisible = true
      if (this.needDate) {
        this.date = row.date
      }
      this.timeData = row.rules
    },
    handleDelete(index) {
      this.tData.splice(index, 1)
      this.$emit('input', this.tData)
    },
    saveSetting() {
      const { date, data } = this.$refs.timeSetting.getData()
      this.tData[this.index].rules = data
      if (this.needDate) {
        this.tData[this.index].date = date
        this.tData[this.index].date1 = moment(date).format('YYYY-MM-DD')
      }
      this.dialogVisible = false
      this.$emit('input', this.tData)
    }
  },
  components: {
    TimeSetting
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 90%;
  margin: 10px auto;
}
.rule-list {
  display: flex;
  .into-list {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    background: #f9f9f9;
    border-radius: 4px;
    color: #888;
    margin-right: 13px;
    height: 28px;
    font-size: 12px;
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
}
</style>
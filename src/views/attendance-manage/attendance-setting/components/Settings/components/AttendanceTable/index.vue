<template>
  <div>
  <el-table class="table" style="width: 100%" :border="true" :data="tableData">
    <el-table-column
      prop="date"
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
              @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          </div>
        </span>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="时间设置" :visible.sync="dialogVisible">
     <div>
       <time-setting v-model="timeData"  />
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
export default {
  data() {
    return {
      dialogVisible: false,
      index: 0,
      timeData: {

      },
      tData: this.tableData
    }
  },
  props: {
    tableData: {
      type: Array,
      default: []
    },
    canEdit: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    tableData(value) {
      this.tData = value
    }
  },
  methods: {
    handleEdit(index, row) {
      this.index = index
      this.dialogVisible = true
      this.timeData = _.cloneDeep(row.rules)
    },
    saveSetting() {
      this.tData[this.index].rules = _.cloneDeep(this.timeData)
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
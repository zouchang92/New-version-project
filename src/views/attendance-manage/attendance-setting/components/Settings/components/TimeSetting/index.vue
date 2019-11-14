<template>
  <div>
    <div style="margin-bottom: 20px;" v-if="needDate">
      日期
      <el-date-picker
        v-model="date1"
        type="date"
        size="small"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <el-button style="margin-bottom: 10px;" @click="addList" v-if="currentValue.length < 3" icon="el-icon-plus" type="primary" size="small">
      新建
    </el-button>
    <el-table
    :data="currentValue"
    border
    style="width: 100%">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          第{{scope.$index}}次
        </template>
      </el-table-column>
      <el-table-column
        label="到校时间"
        props="in"
        >
        <template slot-scope="scope">
          <el-time-select
            v-model="scope.row.in"
            placeholder="选择到校时间">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column
        label="离校时间"
        props="out"
        >
        <template slot-scope="scope">
          <el-time-select
            v-model="scope.row.out"
            placeholder="选择离校时间">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index)" icon="el-icon-delete" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import _ from 'lodash'
export default {
  data() {
    return {
      date1: this.date,
      currentValue: _.cloneDeep(this.timeData)
    }
  },
  props: {
    timeData: {
      type: Array
    },
    needDate: {
      type: Boolean,
      default: false
    },
    date: {
      
    }
  },
  watch: {
    timeData(value) {
      this.currentValue = _.cloneDeep(value)
    },
    date(value) {
      this.date1 = value
    }
  },
  methods: {
    addList() {
      this.currentValue.push({
        in: '',
        out: ''
      })
    },
    getData() {
      return {date: this.date1, data: this.currentValue}
    },
    handleDelete(index) {
      this.currentValue.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
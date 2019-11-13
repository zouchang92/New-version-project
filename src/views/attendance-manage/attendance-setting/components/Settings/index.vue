<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>新增考勤规则</span>
      </div>
      <div>
        <el-form size="small" v-model="model">
          <el-form-item label="考勤规则名称" prop="name">
            <el-input style="width: 200px" v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="考勤角色" prop="group">
            <el-radio-group v-model="model.group">
              <el-radio label="指定学生"></el-radio>
              <el-radio label="指定教师"></el-radio>
              <el-radio label="全校学生"></el-radio>
              <el-radio label="全校教师"></el-radio>
              <el-radio label="全校师生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考勤类型">
            <el-select v-model="model.type">
              <el-option label="固定考勤日期" value="1"></el-option>
              <el-option label="每月灵活时间" value="0"></el-option>
            </el-select>
            <div style="width: 60%;margin-top: 10px">
              <attendance-table v-if="model.type === '0'" :tableData="tableData" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import AttendanceTable from './components/AttendanceTable'
export default {
  data() {
    return {
      model: {
        name: '',
        group: '',
        type: '0'
      },
      tableData: [{
        date: '星期一',
      }, {
        date: '星期二',
      },{
        date: '星期三',
      },{
        date: '星期四',
      },{
        date: '星期五',
      },{
        date: '星期六',
      },{
        date: '星期天',
      }]
    }
  },
  components: {
    AttendanceTable
  }
  
}
</script>

<style>

</style>
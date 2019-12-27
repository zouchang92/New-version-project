<template>
  <div>
    <div style="margin-top: 10px;" class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" :table-loading="false" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import DateSearch from '@/components/DateSearch'
import { queryAttendanceRecord } from '@/api/attendanceManageApi'
export default {
  data() {
    return {
      obj: {},
      fn: null,
      tableList: [
        {userName: '三墩中学', orgName: '二年级', checkTime: '一班', rate: '95%', rate1: '65', rate2: '63', rate3: '1', rate4: '0', rate5: 0, rate6: '2019-10-13'},
        {userName: '三墩中学', orgName: '三年级', checkTime: '一班', rate: '96.5%', rate1: '50', rate2: '46', rate3: '3', rate4: '0', rate5: 0, rate6: '2019-10-13'},
        {userName: '三墩中学', orgName: '三年级', checkTime: '二班', rate: '95%', rate1: '50', rate2: '44', rate3: '4', rate4: '0', rate5: 0, rate6: '2019-10-13'},
        {userName: '三墩中学', orgName: '三年级', checkTime: '四班', rate: '95%', rate1: '50', rate2: '44', rate3: '4', rate4: '0', rate5: 0, rate6: '2019-10-13'}
      ],
      
      option: {
        dateBtn: true,
        menu:false,
        column: [{
          prop: 'userName',
          label: '学部',
          search: true
        }, {
          prop: 'orgName',
          label: '年级',
          search: true
        }, {
          prop: 'checkTime',
          label: '班级',
        }, {
          prop: 'rate',
          label: '出勤率',
        }, {
          prop: 'rate1',
          label: '应出勤(人)',
          width: 100
        }, {
          prop: 'rate2',
          label: '实际出勤(人)',
          width: 100
        }, {
          prop: 'rate3',
          label: '上学迟到(人)',
          width: 100
        }, {
          prop: 'rate4',
          label: '放学早退(人)',
          width: 100
        }, {
          prop: 'rate5',
          label: '请假(人)',
          width: 80
        }, {
          prop: 'rate6',
          label: '日期',
          width: 120
        }]
      }
    }
  },
  name: 'attendanceReoprt',
  mixins: [tableCommon, permission],
  components: {
    DateSearch
  }

}
</script>

<style lang="scss">

</style>
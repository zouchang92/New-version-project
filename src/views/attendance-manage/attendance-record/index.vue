<template>
  <div>
    <div style="margin-top: 10px;" class="table-container">
      <div class="basic-container">
          <avue-crud @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import DateSearch from '@/components/DateSearch'
import { queryAttendanceRecord } from '@/api/attendanceManageApi'
export default {
  data() {
    return {
      obj: {},
      fn: queryAttendanceRecord,
      option: {
        dateBtn: true,
        column: [{
          prop: 'userName',
          label: '姓名',
          search: true
        }, {
          prop: 'orgName',
          label: '班级',
          search: true
        }, {
          prop: 'checkTime',
          label: '记录时间',
          type: 'datetime',
          format: 'YYYY-MM-DD HH:mm:ss'
        }]
  }
    }
  },
  name: 'attendanceReoprt',
  mixins: [tableCommon],
  components: {
    DateSearch
  }

}
</script>

<style lang="scss">

</style>
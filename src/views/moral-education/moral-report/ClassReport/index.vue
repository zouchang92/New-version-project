
<template>
  <div class="student-report">
    <el-card class="search-form">
      <el-form :inline="true" size="small">
        <el-form-item label="学年">
          <el-select v-model="searchForm.year" placeholder="请选择学期"></el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="searchForm.grade" placeholder="请选择班级"></el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initList">搜索</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">打印</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <el-table :data="tableList">
        <el-table-column
          prop="objId"
          label="所在班级">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryStudentMoralList } from '@/api/studentMoralReportApi'
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryStudentMoralList,
      searchForm: {
        year: '',
        grade: ''
      }
    }
  }
}
</script>

<style lang="scss">
.student-report {
  .el-card__body {
    padding: 0;
  }
  .search-form {
    background: #ffffff;
    padding: 18px 18px 0 18px;
  }
}
</style>
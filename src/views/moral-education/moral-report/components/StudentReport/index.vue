
<template>
  <div class="student-report">
    <el-card class="search-form">
      <el-form :inline="true" size="small">
        <el-form-item label="学期">
          <el-select v-model="searchForm.user" placeholder="请选择学期"></el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="searchForm.class" placeholder="请选择班级"></el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-select v-model="searchForm.name" placeholder="请输入姓名"></el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-permission="['admin','editor']" type="primary" @click="initList">搜索</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">打印</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px;">
      <el-table :data="tableList">
        <el-table-column
          prop="orgName"
          label="所在班级">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="projectTitle"
          label="一级指标">
        </el-table-column>
        <el-table-column
          prop="projectItemTitle"
          label="二级指标">
        </el-table-column>
        <el-table-column
          prop="score"
          label="德育得分">
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
import tableCommon from '@/mixins/table-common'
import { queryStudentMoralList } from '@/api/studentMoralReportApi'

export default {
  name: 'studentMoralReport',
  mixins: [tableCommon],
  data() {
    return {
      fn: queryStudentMoralList,
      searchForm: {
        user: '',
        class: '',
        name: ''
      },
      thirdMenuName: 'studentMoralReport'
    }
  },
  mounted() {
    console.log(this)
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
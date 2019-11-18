
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
      <ve-histogram :series="classMoralData.series" height="300px" :colors="classMoralData.settings.colors" :data="classMoralData" :settings="classMoralData.settings"></ve-histogram>
      <el-table :data="tableList1">
        <el-table-column
          prop="objId"
          label="学期/班级">
        </el-table-column>
        <el-table-column
          prop="1"
          label="一(1)班">
        </el-table-column>
        <el-table-column
          prop="2"
          label="一(2)班">
        </el-table-column>
        <el-table-column
          prop="3"
          label="一(3)班">
        </el-table-column>
        <el-table-column
          prop="4"
          label="一(4)班">
        </el-table-column>
        <el-table-column
          prop="5"
          label="一(5)班">
        </el-table-column>
        <el-table-column
          prop="6"
          label="一(6)班">
        </el-table-column>
        <el-table-column
          prop="7"
          label="一(7)班">
          </el-table-column>
          <el-table-column
          prop="8"
          label="一(8)班">
        </el-table-column>
        <el-table-column
          prop="9"
          label="一(9)班">
        </el-table-column>
        <el-table-column
          prop="10"
          label="一(10)班">
        </el-table-column>
        <el-table-column
          prop="11"
          label="一(11)班">
        </el-table-column>
        <el-table-column
          prop="12"
          label="一(12)班">
        </el-table-column>
        <el-table-column
          prop="13"
          label="一(13)班">
        </el-table-column>
        <el-table-column
          prop="14"
          label="一(14)班">
        </el-table-column>
        <el-table-column
          prop="15"
          label="一(15)班">
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
            classMoralData: {
        settings: {
          itemStyle: {
            barBorderRadius: [20, 20, 20, 20]
          },
          colors: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#61A6FF' 
            }, {
              offset: 1, color: '#1B7BFE'
            }],
            global: false // 缺省为 false
          }]
        },
        columns: ['班级', '分数'],
        rows: [
          {'班级': '一年级1班', '分数': 76},
          {'班级': '一年级2班', '分数': 80},
          {'班级': '一年级3班', '分数': 81},
          {'班级': '一年级5班', '分数': 82},
          {'班级': '一年级6班', '分数': 83},
          {'班级': '一年级7班', '分数': 76},
          {'班级': '一年级8班', '分数': 76},
          {'班级': '一年级9班', '分数': 89},
          {'班级': '一年级10班', '分数': 90},
          {'班级': '一年级11班', '分数': 95},
          {'班级': '一年级12班', '分数': 76},
          {'班级': '一年级13班', '分数': 65},
          {'班级': '一年级14班', '分数': 78},
          {'班级': '一年级15班', '分数': 79},
        ]
      },
      fn: queryStudentMoralList,
      tableList1: [{
        objId: '2019学年上学期',
        "1": '72',
        "2": '76',
        "3": '78',
        "4": '76',
        "5": '90',
        "6": '88',
        "7": '79',
        "8": '83',
        "9": '81',
        "10": '88',
        "11": '88',
        "12": '76',
        "13": '74',
        "14": '69',
        "15": '84',
      }, {
        objId: '班均分',
        "1": '77',
        "2": '78',
        "3": '90',
        "4": '87',
        "5": '65',
        "6": '66',
        "7": '86',
        "8": '83',
        "9": '80',
        "10": '81',
        "11": '82',
        "12": '83',
        "13": '84',
        "14": '85',
        "15": '87',
      }, {
        objId: '平均分',
        "1": '77',
        "2": '88',
        "3": '66',
        "4": '77',
        "5": '88',
        "6": '99',
        "7": '88',
        "8": '88',
        "9": '88',
        "10": '86',
        "11": '85',
        "12": '83',
        "13": '70',
        "14": '67',
        "15": '80',
      }],
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
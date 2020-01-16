<template>
      <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>课时信息(有两门课程未设置课时)</span>
            <div style=" position:absolute;  top: 19px;  right: 35px;" @click="save">保存
            </div>
          </div>
          <div >
          <el-table  :table-loading="tableListLoading" :data="tableList">
            <el-table-column
              prop="courseName"
              label="学科名称">
            </el-table-column>
            <el-table-column
              prop="courseQty"
              label="每周课时">
                <template slot-scope="scope">
                  <el-input size="mini"
                            v-model="scope.row.courseQty"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="repeatQty"
              label="连堂次数">
                <template slot-scope="scope">
                  <el-input size="mini"
                            v-model="scope.row.repeatQty"></el-input>
              </template>
            </el-table-column>
          </el-table>
          </div>
        </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import { queryCourseNum,addCourseNum } from '@/api/classPlanManageApi'
export default {
  mixins: [tableCommon],
  data() {
     return {
      fn: queryCourseNum
    }
  },
  
  mounted() {
     this.searchForm = {
      ...this.searchForm,
      taskId: this.$route.query.taskId
    }
     this.initList()
  },
  methods: {
    async save() {
      //loading(true)
      try {

        let res = await addCourseNum(this.tableList)
        this.$message.success('设置走班教室成功')
        //loading(false)
        done()
      } catch(err) {
        //loading(false)
      }
    }
  }
}
</script>

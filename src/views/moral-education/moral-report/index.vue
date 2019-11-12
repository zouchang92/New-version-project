<template>
  <div class="moral-report">
      <el-tabs style="padding: 10px 0" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学生德育报表" name="first">
          <div class="mortal-content" style="margin:15px;">
            <student-report />
          </div>
        </el-tab-pane>
        <el-tab-pane label="班级德育报表" name="second">
          <div class="mortal-content" style="margin:15px;">
            <class-report />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import ClassReport from './ClassReport'
import StudentReport from './StudentReport'
export default {
  name: 'moralReport',
  data() {
    return {
      activeName: 'first'
    } 
  },
  methods: {
    handleClick() {

    }
  },
  components: {
    ClassReport,
    StudentReport
  }
}
</script>

<style lang="scss">
.moral-report {
  .el-tabs {
    padding-top: 0!important;
  }
  .el-tabs__header{
    background: white
  }
  .el-tabs__nav-scroll {
    padding-left: 10px;
  }
  .el-tabs__item {
    height: 50px;
    line-height: 50px;
  }
}
</style>
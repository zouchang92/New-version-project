<template>
  <div class="moral-report">
      <el-tabs style="padding: 10px 0" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学生德育报表" name="first">
          <div class="growth-academic" style="margin-top:15px;">
            <StudentReport />
          </div>
        </el-tab-pane>
        <el-tab-pane label="班级德育报表" name="second">
          <div style="margin-top:15px;">
            <ClassReport />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'moralPoint',
  data() {
    return {
    
    } 
  },
  methods: {
    handleClick() {

    }
  },
  components: {

  }
}
</script>

<style lang="scss">
.moral-report {
  .el-tabs__nav-scroll {
    padding-left: 10px;
  }
}
</style>
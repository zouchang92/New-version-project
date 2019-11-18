<template>
  <div class="date-group">
    <el-button-group >
      <el-button size="mini" type="default">今天</el-button>
      <el-button size="mini" type="default">本周</el-button>
      <el-button size="mini" type="default">上周</el-button>
      <el-button size="mini" type="default">本月</el-button>
      <el-button size="mini" type="default">上个月</el-button>
    </el-button-group>
    <div class="date-picker">
      <el-date-picker
        v-model="range"
        size="mini"
        style="width: 240px!important"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      range: []
    }
  },
}
</script>

<style scoped lang="scss">
.date-group {

}
</style>

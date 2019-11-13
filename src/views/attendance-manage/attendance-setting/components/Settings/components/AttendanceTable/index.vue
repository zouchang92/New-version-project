<template>
  <el-table :border="true" :data="tableData">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
     <el-table-column
      prop="rules"
      label="考勤时间">
    </el-table-column>
    <el-table-column
      label="操作">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>

</style>
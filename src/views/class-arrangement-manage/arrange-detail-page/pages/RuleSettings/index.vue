<template>
  <div>
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="不排课设置" name="0">
      </el-tab-pane>
      <el-tab-pane label="科目排课设置" name="1">
      </el-tab-pane>
      <el-tab-pane label="教师排课设置" name="2">
      </el-tab-pane>
      <el-tab-pane label="合班课规则" name="3">
      </el-tab-pane>
      <el-tab-pane label="互斥规则" name="4">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="less">

</style>
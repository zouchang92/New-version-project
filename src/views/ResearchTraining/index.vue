<template>
  <div class="Research-training">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的研修" name="first">
        <div><MyResearch /></div>
      </el-tab-pane>
      <el-tab-pane label="研修计划" name="second">
        <div>213</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MyResearch from './components/MyResearch'
export default {
  components: {
    MyResearch
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.Research-training .el-tabs__nav-wrap{
  background: #fff;
  padding-left: 30px;
}
.Research-training .el-tabs__item {
  padding: 0 5px;
}
</style>
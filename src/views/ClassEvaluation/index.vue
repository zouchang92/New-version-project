<template>
  <div class="ClassEvaluation">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="评课管理" name="first">
        <div><Administration /></div>
      </el-tab-pane>
      <el-tab-pane label="评课设置" name="second">
        <div>456</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Administration from './components/Administration'
export default {
  components: {
      Administration
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
.ClassEvaluation .el-tabs__nav-wrap {
  background: #fff;
  padding-left: 30px;
}
.ClassEvaluation .el-tabs__item {
  padding: 0 5px;
}
</style>
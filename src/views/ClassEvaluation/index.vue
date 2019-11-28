<template>
  <div class="ClassEvaluation">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="评课管理" name="first">
        <div>123</div>
      </el-tab-pane>
      <el-tab-pane label="评课设置" name="second">
        <div>456</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {

  }
};
</script>
<style>

</style>
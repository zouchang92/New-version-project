<template>
  <div class="Community-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="社团首页" name="first">
        <div><CommunityPage /></div>
      </el-tab-pane>
      <el-tab-pane label="社团管理" name="second">
        <div><Management /></div>
      </el-tab-pane>
      <el-tab-pane label="活动管理" name="third">
        <div>456</div>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="fourth">
        <div>789</div>
      </el-tab-pane>
      <el-tab-pane label="活动考勤">
        <div>1211</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CommunityPage from './components/CommunityPage'
import Management from './components/Management'
export default {
  components: {
    CommunityPage,
    Management
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
.Community-content .el-tabs__nav-wrap{
  background: #fff;
  padding-left: 30px;
}
</style>
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
        <div><ActivityManagement /></div>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="fourth">
        <div><PersonnelManagement /></div>
      </el-tab-pane>
      <el-tab-pane label="活动考勤">
        <div><ActivityAttendance /></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CommunityPage from './components/CommunityPage'
import Management from './components/Management'
import ActivityManagement from './components/ActivityManagement'
import ActivityAttendance from './components/ActivityAttendance'
import PersonnelManagement from './components/PersonnelManagement'
export default {
  components: {
    ActivityAttendance,
    ActivityManagement,
    CommunityPage,
    Management,
    PersonnelManagement
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
.Community-content .el-tabs__item {
  padding: 0 5px;
}
</style>
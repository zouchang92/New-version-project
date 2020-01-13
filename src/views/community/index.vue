<template>
  <div class="Community-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="社团首页" name="first">
        <div><CommunityPage ref="first" @ee='more' @Management="moreManagement" @Personnel="morePersonnel" name="CommunityPage"/></div>
      </el-tab-pane>
      <el-tab-pane label="社团管理" name="second">
        <div><Management1 name="Management1" @Personnel="morePersonnel"/></div>
      </el-tab-pane>
      <el-tab-pane label="活动管理" name="third">
        <div><ActivityManagement name="ActivityManagement"/></div>
      </el-tab-pane>
      <el-tab-pane label="人员管理" name="fourth">
        <div><PersonnelManagement name="PersonnelManagement"/></div>
      </el-tab-pane>
      <el-tab-pane label="活动考勤">
        <div><ActivityAttendance /></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CommunityPage from './components/CommunityPage'
import Management1 from './components/Management1'
import ActivityManagement from './components/ActivityManagement'
import ActivityAttendance from './components/ActivityAttendance'
import PersonnelManagement from './components/PersonnelManagement'
export default {
  components: {
    ActivityAttendance,
    ActivityManagement,
    CommunityPage,
    Management1,
    PersonnelManagement
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    more(){
      this.activeName = 'third'
    },
    moreManagement() {
      this.activeName = 'second'
    },
    morePersonnel() {
     this.activeName = 'fourth'
    }
  }
}
</script>
<style>
.Community-content .el-tabs__nav-wrap{
  background: #fff;
  padding-left: 30px;
}
.Community-content .el-tabs__item {
 font-size: 12px;
}
</style>

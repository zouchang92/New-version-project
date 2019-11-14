<template>
  <div class="attendance-setting">
    <el-tabs style="padding: 10px 0" v-model="activeName">
      <el-tab-pane label="新增规则" name="first">
        <div class="attendance-content" style="margin:15px;">
          <settings />
        </div>
      </el-tab-pane>
      <el-tab-pane label="展示规则" name="second">
        <div class="attendance-content" style="margin:15px;">
          <show-rules />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Settings from './components/Settings'
import ShowRules from './components/ShowRules'
export default {
  data() {
    return {
      activeName: 'second'
    }
  },
  components: {
    Settings,
    ShowRules
  }
}
</script>

<style lang="scss">
.attendance-setting {
  .el-tabs {
    padding-top: 0!important;
  }
  .el-tabs__header{
    background: white
  }
  .el-tabs__nav-scroll {
    padding-left: 10px;
  }
  .el-tabs__item {
    height: 50px;
    line-height: 50px;
  }
}
</style>
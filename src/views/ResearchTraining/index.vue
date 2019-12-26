<template>
  <div class="Research-training">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="研训首页" name="first">
        <div>
          <ResearchPage />
        </div>
      </el-tab-pane>
      <el-tab-pane label="研训计划" name="second">
        <div>
          <ResearchPlay1 />
        </div>
      </el-tab-pane>
      <el-tab-pane label="研训成果" name="Three">
        <div>
          <AchievementsPage />
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的研训" name="Four">
        <div>
          <MyResearch />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MyResearch from './components/MyResearch'
import ResearchPage from './components/ResearchPage'
import ResearchPlay1 from './components/ResearchPlay'
import AchievementsPage from './components/AchievementsPage'
export default {
  components: {
    ResearchPage,
    MyResearch,
    ResearchPlay1,
    AchievementsPage
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style>
.Research-training .el-tabs__nav-wrap {
  background: #fff;
  padding-left: 30px;
}
.Research-training .el-tabs__item {
font-size: 12px;
}
</style>

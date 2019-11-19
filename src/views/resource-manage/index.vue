<template>
  <div class="resource">
      <el-tabs style="padding: 10px 0" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的资源" name="first">
          <div class="mortal-content" style="margin: 0 15px;">
            <student-report />
          </div>
        </el-tab-pane>
        <el-tab-pane label="分享给我的" name="second">
          <div class="mortal-content" style="margin: 0 15px;">
            <class-report />
          </div>
        </el-tab-pane>
        <el-tab-pane label="公共资源" name="second">
          <div class="mortal-content" style="margin: 0 15px;">
            <class-report />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'moralReport',
  data() {
    return {
      activeName: 'first'
    } 
  },
  methods: {
    handleClick() {

    }
  },
  components: {
  }
}
</script>

<style lang="scss">
.resource {
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
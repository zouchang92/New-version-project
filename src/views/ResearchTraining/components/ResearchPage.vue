<template>
  <div class="homePage">
    <div class="home-search">
      <div class="search-title">
        学期:
        <el-input v-model="input" style="width:224px;" placeholder="请输入学期" />
        <el-button style="margin-left:31px;" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button icon="el-icon-refresh" type="success">刷新</el-button>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
          style="padding-left:18px;padding-right:13px;"
        >
          <div class="Teaching-resources">
            <div class="resources-title">
              <p class="u-line" />
              <p class="title-text">师资分析</p>
              <!-- <p class="title-More">
                更多
                <i class="el-icon-d-arrow-right" />
              </p> -->
            </div>
            <div class="resources-content">
              <RaddarChart />
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding-right: 17px;">
          <div class="Achievements">
            <div class="Achievements-title">
              <p class="u-line" />
              <p class="title-text">研训成果</p>
              <!-- <p class="title-More">
                更多
                <i class="el-icon-d-arrow-right" />
              </p> -->
            </div>
            <div class="Achievements-content">
              <pie-chard />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:20px;">
        <el-col
          :xs="16"
          :sm="16"
          :md="16"
          :lg="16"
          :xl="16"
          style="padding-left:18px;padding-right:13px;"
        >
          <div class="Number-trainees">
            <div class="trainees-title">
              <p class="u-line" />
              <p class="title-text">参训人数</p>
              <!-- <p class="title-More">
                更多
                <i class="el-icon-d-arrow-right" />
              </p> -->
            </div>
            <div class="trainees-content" style="margin-top:-50px;">
              <Histogram />
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" style="padding-right: 17px;">
          <div class="School-statistics">
            <div class="statistics-title">
              <p class="u-line" />
              <p class="title-text">校本研修统计</p>
              <p style="position:absolute;top:10px;left:158px;font-size:15px;color:#bbb;">(现状统计)</p>
              <!-- <p class="title-More">
                更多
                <i class="el-icon-d-arrow-right" />
              </p> -->
            </div>
            <div class="statistics-content">
              <CurrentSituation />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import RaddarChart from './RaddarChart'
import PieChard from './PieChard'
import Histogram from './Histogram'
import CurrentSituation from './CurrentSituation'
export default {
  components: {
    RaddarChart,
    PieChard,
    Histogram,
    CurrentSituation
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.homePage {
  height: 1200px;
  background: #eee;
  .home-search {
    margin-left: 29px;
    margin-right: 28px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    .search-title {
      padding: 24px;
    }
  }
  .content {
    margin: 15px;
    .u-line {
      display: block;
      width: 5px;
      height: 16px;
      background: rgba(1, 142, 237, 1);
      position: absolute;
      left: 15px;
      top: 8px;
    }
    .title-text {
      margin: 0px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #111;
      line-height: 64px;
      padding-left: 28px;
    }
    .title-More {
      position: absolute;
      top: 5px;
      right: 37px;
      font-size: 19px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
    }
    .Teaching-resources {
      height: 320px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      .resources-content {
        margin-top: -49px;
      }
    }
    .Achievements {
      height: 320px;
      background: rgba(255, 255, 255, 1);
      position: relative;
    }
    .Number-trainees {
      height: 513px;
      background: rgba(255, 255, 255, 1);
      position: relative;
    }
    .School-statistics {
      height: 513px;
      background: rgba(255, 255, 255, 1);
      position: relative;
    }
  }
}
</style>
<style>
.search-title .el-input__inner {
  height: 32px;
}
.search-title .el-button {
  width: 70px;
  height: 33px;
  padding: 1px;
}
</style>

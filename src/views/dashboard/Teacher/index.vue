<template>
  <div class="dashboard-teacher-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8" style="padding-right:4px;">
        <div class="Teacher-application">
          <div class="application-title">
            <p class="u-line"></p>
            <p class="title-text">我的应用</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="Teacher-timetable">
          <div class="timetable-title">
            <p class="u-line"></p>
            <p class="title-text">今日课表</p>
          </div>
          <div class="timetable-content">
            <ul v-for="(n,i) in 10" :key="i">
              <li>
                <p>08:00-08:40</p>
              </li>
              <li>
                <p>规划经济学</p>
              </li>
              <li>
                <p>王良军</p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="padding-left:4px;">
        <div class="Teacher-date" style="background:#fff;height:354px;position:relative;">
          <UCalendar></UCalendar>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="padding-right:8px;margin-bottom:30px;margin-top: -428px;"
      >
        <div class="Teacher-resources">
          <div class="resources-title">
            <p class="u-line"></p>
            <p class="title-text">教学资源</p>
          </div>
          <raddar-chart />
        </div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span:8}"
        style="margin-bottom:30px;position:absolute;top:-234px;right:-6px;padding-left:2px;padding-right:9px;"
      >
        <div class="Teacher-assignment">
          <div class="assignament-title">
            <p class="u-line"></p>
            <p class="title-text">班级作业</p>
          </div>
          <div class="radar-title">
            <p style="position: absolute;left: 49px;top: 45px;">作文</p>
            <p style="position: absolute;left: 186px;top: 45px;">练习册</p>
            <p style="position: absolute;left: 339px;top: 45px;">抄写</p>
          </div>
          <pie-chard />
        </div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 16}"
        :xl="{span: 16}"
        style="padding-left:4px;padding-right:8px;margin-top:-9px;margin-right:444px;"
      >
        <div class="Teacher-achievement">
          <div class="achievement-title">
            <p class="u-line"></p>
            <p class="title-text">考试成绩</p>
          </div>
          <line-chart />
        </div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="padding-left: 7px;padding-right: 4px;position: absolute;right: -2px;top: 89px;"
      >
        <div class="Teacher-notice">
          <div class="notice-title">
            <p class="u-line"></p>
            <p class="title-text">学校通知</p>
          </div>
          <div class="notice-content">
            <ul>
              <li v-for="(n,i) in 6" :key="i">
                <p class="content-title">此处填写公告信息</p>
                <p class="notice-date">2018-10-09</p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GithubCorner from "@/components/GithubCorner";
import UCalendar from "@/components/Calendar/UCalendar";
import PieChard from "./components/PieChard";
import RaddarChart from "./components/RaddarChart";
import LineChart from './components/LineChart'

export default {
  name: "DashboardAdmin",
  components: {
    ...mapGetters(["name", "avatar", "roles"]),
    GithubCorner,
    UCalendar,
    PieChard,
    RaddarChart,
    LineChart
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-teacher-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .Teacher-application {
    background: #fff;
    height: 154px;
    padding: 10px;
    position: relative;
  }
  .title-text {
    padding-left: 20px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #111;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .u-line {
    display: block;
    width: 5px;
    height: 16px;
    background: rgba(1, 142, 237, 1);
    position: absolute;
    left: 15px;
    top: 8px;
  }
  .Teacher-timetable {
    background: #fff;
    height: 602px;
    padding: 10px;
    position: relative;
    .timetable-title {
      border-bottom: 1px solid #eff0f5;
      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: rgba(1, 142, 237, 1);
        position: absolute;
        left: 15px;
        top: 8px;
      }
    }
    .timetable-content {
      ul {
        list-style: none;
        display: flex;
        margin: 0px;
        padding: 0px;
        justify-content: space-around;
        background: #f5f6fa;
        margin-top: 10px;
        li {
          padding-left: 20px;
          padding: 0px;
          p {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #000;
          }
        }
      }
    }
  }
  .Teacher-resources {
    height: 428px;
    background: #fff;
    padding: 10px;
    position: relative;
  }
  .Teacher-assignment {
    height: 306px;
    background: #fff;
    padding: 10px;
    position: relative;
    .radar-title {
      display: flex;
      p {
        font-size: 17px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        line-height: 37px;
      }
    }
  }
  .Teacher-achievement {
    height: 331px;
    background: #fff;
    padding: 10px;
    position: relative;
  }
  .Teacher-notice {
    height: 262px;
    background: #fff;
    padding: 10px;
    position: relative;
    .notice-title {
      border-bottom: 1px solid #eff0f5;
    }
    .notice-content {
      ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
        li {
          display: flex;
          p {
            margin: 0px;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: rgba(17, 17, 17, 1);
            line-height: 33px;
            padding-left: 10px;
          }
          .notice-date {
            position: absolute;
            right: 20px;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

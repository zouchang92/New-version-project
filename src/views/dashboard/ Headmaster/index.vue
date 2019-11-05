<template>
  <div class="dashboard-master-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8" style="padding-right:4px;">
        <div class="Teacher-application">
          <div class="application-title">
            <p class="u-line"></p>
            <p class="title-text">我的应用</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="padding-right:4px;">
        <div class="Examination-score">
          <div class="score-title">
            <p class="u-line"></p>
            <p class="title-text">考评得分</p>
          </div>
          <pie-chard />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
        style="padding-left:4px;position: absolute;top: 0px;right: -14px;"
      >
        <div class="Teacher-date" style="background:#fff;height:354px;position:relative;">
          <UCalendar></UCalendar>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="5" style="padding-right:4px;margin-top:-59px;">
        <div class="Master-Resources">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">教学资源</p>
          </div>
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="3" style="padding-right:4px;margin-top:-59px;">
        <div class="Master-duty">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">值日生</p>
          </div>
          <div class="duty-content">
            <ul>
              <li>
                <div>
                  <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572950072901&di=9d23e0395265c7a0427f2c9436d03c52&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201410%2F05%2F20141005103722_uYVM8.jpeg"
                    alt
                  />
                  <P>张家辉</P>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
        style="padding-left: 12px;padding-right: 5px;margin-top: 20px;margin-left: 3px;"
      >
        <div class="Master-table">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">今日课表</p>
          </div>
          <Timetable />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
        style="padding-left:4px;position: absolute;top: 140px;right: -14px;margin-left: 16px;"
      >
        <div class="Teacher-date" style="background:#fff;position:relative;">
          <div class="Master-mail">
            <div class="Master-title">
              <p class="u-line"></p>
              <p class="title-text">班级通讯录</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="padding-right:8px;margin-bottom:30px;margin-top: -503px;"
      >
        <div class="Teacher-resources">
          <div class="resources-title">
            <p class="u-line"></p>
            <p class="title-text">教学资源</p>
          </div>
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
            <p style="position: absolute;left: 49px;top: 30px;">作文</p>
            <p style="position: absolute;left: 186px;top: 30px;">练习册</p>
            <p style="position: absolute;left: 339px;top: 30px;">抄写</p>
          </div>
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
    </el-row>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GithubCorner from "@/components/GithubCorner";
import UCalendar from "@/components/Calendar/UCalendar";
import Timetable from "@/components/Timetable/Timetable";
import PieChard from "./components/PieChard";
import RaddarChart from "./components/RaddarChart";

export default {
  name: "DashboardAdmin",
  components: {
    ...mapGetters(["name", "avatar", "roles"]),
    GithubCorner,
    UCalendar,
    Timetable,
    PieChard,
    RaddarChart
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
@mixin ds() {
  padding: 10px;
  position: relative;
  background: #fff;
}
.dashboard-master-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .Teacher-application {
    @include ds;
    height: 154px;
  }
  .Examination-score {
    @include ds;
    height: 234px;
  }
  .Master-Resources {
    @include ds;
    height: 428px;
  }
  .Master-duty {
    @include ds;
    height: 428px;
    .Master-title {
      border-bottom: 1px solid #eff0f5;
    }
    .duty-content {
      ul {
        list-style: none;
        padding: 0px;
        li {
          div {
            display: flex;
            img {
              height: 40px;
              border: 1px solid #000;
              border-radius: 50%;
            }
            p {
              font-size: 15px;
              font-family: Source Han Sans CN;
              font-weight: 300;
              color: rgba(0, 0, 0, 1);
              line-height: 22px;
            }
          }
        }
      }
    }
  }
  .Master-table {
    @include ds;
    height: 322px;
    overflow: hidden;
    .Master-title {
      border-bottom: 1px solid #eff0f5;
    }
  }
  .Master-mail {
    @include ds;
    height: 310px;
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
  .Teacher-resources {
    height: 428px;
    @include ds;
  }
  .Teacher-assignment {
    height: 306px;
    @include ds;
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
    @include ds;
  }
  .Teacher-notice {
    height: 262px;
    @include ds;
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

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
            <p class="title-text">课堂表现</p>
          </div>
          <PieChart />
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
            <p class="title-text">学习资源</p>
          </div>
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="3" style="padding-right:0px;margin-top:-59px;padding-left:10px;">
        <div class="Master-duty">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">兴趣爱好</p>
          </div>
          <div class="duty-content" style="margin-top: 20px">
            <el-checkbox-group v-model="checkboxGroup2" size="small">
              <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
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
            <p class="title-text">我的课表</p>
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
              <p class="title-text">教师通讯录</p>
            </div>
            <div class="mail-content">
              <ul v-for="(n,i) in 4" :key="i">
                <li>
                  <img
                    src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                    alt
                  />
                  <p>张家辉</p>
                  <p>
                    <i class="el-icon-phone" />13333333333
                  </p>
                  <p>
                    <i class="el-icon-location-outline" />某省某市某区某村
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 12}"
        :xl="{span:12}"
        style="margin-top:22px;"
      >
        <div class="Master-tsk">
          <div class="Master-title">
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
        :lg="{span: 4}"
        :xl="{span: 4}"
        style="padding-right:8px;margin-top:22px;margin-left:8px"
      >
        <div class="Master-attendance">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">我的作业</p>
          </div>
          <div class="timeline" style="margin-left:20px;margin-top:20px;">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >{{activity.content}}</el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="padding-left: 7px;padding-right: 4px;position:absolute;top:125px;right:-14px;"
      >
        <div class="Master-notice">
          <div class="Master-title">
            <p class="u-line"></p>
            <p class="title-text">班级通知</p>
          </div>
          <div class="notice-content">
            <ul>
              <li v-for="(n,i) in 2" :key="i">
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
import Timetable from "@/components/Timetable/Timetable";
import RaddarChart from "../Headmaster/components/RaddarChart";
import LineChart from "../Teacher/components/LineChart";

const cityOptions = [
  "篮球",
  "足球",
  "听音也",
  "羽毛球",
  "跑步",
  "兵乓球",
  "游戏",
  "看电影",
  "绘画",
  "看书",
  "拼图",
  "弹吉他",
  "钢琴",
  "折纸",
  "剪纸"
];
export default {
  name: "DashboardAdmin",
  components: {
    ...mapGetters(["name", "avatar", "roles"]),
    GithubCorner,
    UCalendar,
    Timetable,
    RaddarChart,
    LineChart
  },
  data() {
    return {
      activities: [
        {
          content: "把《司马光砸缸》抄写一篇 背诵《窗前明月光》",
          timestamp: "语文",
          color: "#018EED"
        },
        {
          content: "背诵乘法口诀 修改其中试卷",
          timestamp: "数学",
          color: "#018EED"
        },
        {
          content: "抄写p22单词，每个5遍",
          timestamp: "英语",
          color: "#018EED"
        },
        {
          content: "预习下一章节",
          timestamp: "生物",
          color: "#018EED"
        }
      ],
      checkboxGroup2: ["篮球", "听音也", "弹吉他"],
      cities: cityOptions
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
    height: 405px;
  }
  .Master-duty {
    @include ds;
    height: 405px;
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
            padding-left: 10px;
            padding-top: 10px;
            img {
              width: 30px;
              height: 30px;
              border: 1px solid #000;
              border-radius: 50%;
            }
            p {
              font-size: 15px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #000;
              line-height: 22px;
              padding-left: 15px;
              padding-top: 10px;
              margin: 0px;
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
    .mail-content {
      ul {
        list-style: none;
        padding: 0px;
        background: #f5f6fa;
        li {
          display: flex;
          padding-left: 10px;
          padding-top: 10px;
          img {
            width: 30px;
            height: 30px;
            border: 1px solid #000;
            border-radius: 50%;
          }
          p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: rgba(52, 52, 52, 1);
            line-height: 22px;
            padding-left: 15px;
            padding-top: 3px;
            margin: 0px;
          }
        }
      }
    }
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
  .Master-tsk {
    @include ds;
    height: 355px;
  }
  .Master-attendance {
    @include ds;
    height: 355px;
    .Master-title {
      border-bottom: 1px solid #eff0f5;
    }
  }
  .Master-notice {
    height: 251px;
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
<style>
.Master-attendance .el-timeline-item__content {
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 300;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
}
.Master-duty .el-checkbox-group {
  margin-top: -13px;
    margin-left: -8px;
}
.Master-duty .el-checkbox-button {
  margin-left: 10px;
  margin-top: 10px;
}
.Master-duty .el-checkbox-button--small .el-checkbox-button__inner {
  width: 53px;
  height: 27px;
  padding: 8px 10px;
  font-size: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 30px;
}
</style>

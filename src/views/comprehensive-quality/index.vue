<template>
  <div class="Comprehensive">
    <div class="title">
      <div class="title-cl">
        <p>班级:</p>
        <el-select v-model="value" placeholder="请选择班级">
          <el-option v-for="item in cities" :key="item.id" :label="item.label" :value="item.label">
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="title-bn">
        <span>姓名:</span>
        <el-input placeholder="请输入姓名" v-model="input" clearable></el-input>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:26px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-upload" size="small">导出</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">打印</el-button>
      </div>
    </div>
    <div class="content">
      <div class="content-top">
        <el-row :gutter="30">
          <el-col
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            style="padding-right:0px;padding-left:0px;position:relative"
          >
            <div style="background:#fff;height:316px;margin-left:31px;">
              <div class="personal">
                <div class="back"></div>
                <div class="bacg"></div>
                <div class="personal">
                  <img
                    src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                    alt
                  />
                  <p class="personal-name">姓名:张大伟</p>
                  <p class="personal-sex">性别:男</p>
                  <p class="personal-id">学号:20198308408</p>
                  <p class="personal-class">班级:高一(3)班</p>
                </div>
              </div>
            </div>
          </el-col>
          <el-col
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            style="padding-right:0px;padding-left:0px;"
          >
            <div class="quality">
              <div class="quality-title">
                <p class="title-icon">
                  <i class="el-icon-document-copy"></i>
                </p>
                <p class="title-c">综合素质</p>
                <span class="title-data">2019-10-19</span>
              </div>
              <div class="quality-content">
                  <Dashboard />
              </div>
            </div>
          </el-col>
          <el-col
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            style="padding-right:0px;padding-left:0px;"
          >
            <div class="Quality-Radar">
              <div class="Radar-title">
                <p class="title-icon">
                  <i class="el-icon-s-data"></i>
                </p>
                <p class="title-c">综合素质雷达图</p>
              </div>
              <div class="Radar-content">
                  <RaddarChart />
              </div>
            </div>
          </el-col>
          <el-col
            :xs="6"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            style="padding-right:31px;padding-left:0px"
          >
            <div class="Serving">
              <div class="Serving-title">
                <p class="title-icon">
                  <i class="el-icon-s-custom"></i>
                </p>
                <p class="title-c">任职情况</p>
              </div>
              <div class="Serving-content">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :type="activity.type"
                    :color="activity.color"
                    :timestamp="activity.timestamp"
                  >{{activity.content}}</el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="content-bottom" style="margin-top:20px;">
        <el-row :gutter="30">
          <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
            <div class="Personal-synthesis">
              <div class="synthesis-title">
                <p class="title-icon">
                  <i class="el-icon-s-custom"></i>
                </p>
                <p class="title-c">个人奖惩综合情况展示</p>
              </div>
              <div class="syncthesis-content">
                  <LineChart />
              </div>
            </div>
          </el-col>
          <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
            <div class="Statistics">
              <div class="Statistics-title">
                <p class="title-icon">
                  <i class="el-icon-s-custom"></i>
                </p>
                <p class="title-c">历史期末评分统计</p>
              </div>
              <div class="Statistics-content">
                <div class="Serving-content">
                  <el-timeline>
                    <el-timeline-item
                      v-for="(activity, index) in list"
                      :key="index"
                      :type="activity.type"
                      :color="activity.color"
                      :timestamp="activity.timestamp"
                    >{{activity.content}}</el-timeline-item>
                  </el-timeline>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Dashboard from "./components/Dashboard";
import RaddarChart from './components/RaddarChart'
import LineChart from './components/LineChart'
export default {
  components: {
    Dashboard,
    RaddarChart,
    LineChart
  },
  data() {
    return {
      cities: [
        {
          label: "三年二班"
        },
        {
          label: "三年五班"
        }
      ],
      value: "",
      input: "",
      list: [
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        },
        {
          content: "评分等级：A+ 老师：刘大大",
          timestamp: "2018-04-03",
          color: "#1890FF"
        }
      ],
      activities: [
        {
          content: "任职班长",
          timestamp: "2018-04-03",
          color: "#A48FFF"
        },
        {
          content: "参加足球校队",
          timestamp: "2018-04-03",
          color: "#A48FFF"
        },
        {
          content: "任职学习委员",
          timestamp: "2018-04-03",
          color: "#A48FFF"
        },
        {
          content: "参加书法社团",
          timestamp: "2018-04-03",
          color: "#A48FFF"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.Comprehensive {
  height: 1200px;
  background: #eee;
  .title {
    background: #fff;
    height: 84px;
    margin: 17px;
    display: flex;
    .title-cl {
      display: flex;
      padding-left: 26px;
      padding-top: 20px;
      p {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
        margin-top: 12px;
      }
    }
    .title-bn {
      margin-left: 36px;
      display: flex;
      span {
        width: 100px;
        height: 16px;
        padding-top: 31px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }
    }
  }
  .content-top {
    .personal {
      .back {
        width: 198px;
        height: 105px;
        background: #71d9ae;
        opacity: 0.9;
        border-radius: 0% 26% 85% 0%;
        z-index: 2;
      }
      .bacg {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 176px;
        height: 104px;
        background: #71d9ae;
        opacity: 0.65;
        z-index: 1;
        border-radius: 0px 0px 0px 175px;
      }
      .personal {
        position: absolute;
        top: 42px;
        left: 129px;
        z-index: 3;
        img {
          width: 108px;
          height: 108px;
          background: rgba(71, 146, 188, 1);
          border: 2px solid;
          border-image: linear-gradient(
              0deg,
              rgba(133, 221, 177, 1),
              rgba(0, 191, 154, 1)
            )
            10 10;
          border-radius: 50%;
          z-index: 3;
        }
        p {
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 45px;
        }
        .personal-name {
          width: 100px;
          position: absolute;
          top: 114px;
          left: -60px;
        }
        .personal-sex {
          width: 100px;
          position: absolute;
          top: 114px;
          left: 91px;
        }
        .personal-id {
          width: 160px;
          position: absolute;
          top: 154px;
          left: -60px;
        }
        .personal-class {
          width: 160px;
          position: absolute;
          top: 193px;
          left: -60px;
        }
      }
    }
    .quality {
      background: #fff;
      height: 316px;
      margin-left: 21px;
      position: relative;
      .quality-title {
        .title-data {
          float: right;
          margin-top: -82px;
          margin-right: 15px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(145, 145, 145, 1);
          line-height: 90px;
        }
      }
    }
    .Quality-Radar {
      background: #fff;
      height: 316px;
      margin-left: 21px;
      position: relative;
    }
    .Serving {
      background: #fff;
      height: 316px;
      margin-left: 21px;
      position: relative;
    }
  }
  .content-bottom {
    .Personal-synthesis {
      background: #fff;
      height: 561px;
      margin-left: 18px;
      position: relative;
    }
    .Statistics {
      background: #fff;
      height: 561px;
      margin-left: -9px;
      margin-right: 16px;
      position: relative;
    }
  }
  .title-icon {
    position: absolute;
    top: 14px;
    left: 32px;
    width: 29px;
    height: 29px;
    background: rgba(242, 242, 242, 1);
    border-radius: 50%;
    i {
      position: absolute;
      top: 7px;
      left: 6px;
    }
  }
  .title-c {
    margin: 0px;
    padding-top: 8px;
    padding-left: 71px;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 75px;
  }
}
</style>
<style>
.Comprehensive .title-cl .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 10px;
}
.Comprehensive .title-cl .el-input__suffix {
  right: 5px;
  top: 5px;
}
.Comprehensive .title-bn .el-input {
  width: 224px;
  margin-left: -58px;
}
.Comprehensive .title-bn .el-input__inner {
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 26px;
}
</style>
<style>
.Serving-content .el-timeline {
  margin-left: 81px;
}
.Serving-content .el-timeline-item__timestamp {
  position: absolute;
  top: -5px;
  left: -84px;
}
</style>
<template>
  <div class="Performance">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="height:370px;background:#fff;border-radius:1px;padding:15px;"
      >
        <div class="Performance-top">
          <div class="top-title">
            <span>2019学年上学期课堂表现</span>
          </div>
          <div class="top-content">
            <div class="top-photo">
              <img
                src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                alt
              />
              <span class="top-name">姓名：张家辉</span>
              <span class="top-numb">学号：20170828291</span>
            </div>
            <div class="top-Average">
              <span>表现平均分：</span>
              <h3>86.3</h3>
            </div>
            <div class="top-right">
              <div style="position: absolute;top: 34px;left: -227px;">
                <el-rate value='5' disabled text-color="#ff9900"></el-rate>
                <el-rate value='4' disabled text-color="#ff9900" style="margin-top:31px;"></el-rate>
                <el-rate value='3' disabled text-color="#ff9900" style="margin-top:31px;"></el-rate>
                <el-rate value='2' disabled text-color="#ff9900" style="margin-top:31px;"></el-rate>
                <el-rate value='1' disabled text-color="#ff9900" style="margin-top:31px;"></el-rate>
              </div>
              <span>语文、数学</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="100"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>物理</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="80"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>英语</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="60"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>化学</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="40"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>音乐</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="20"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="height:295px;background:#fff;margin-top:20px;border-radius:1px;"
      >123</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 5,
      customColor: "#F2BB46"
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.Performance {
  .Performance-top {
    position: relative;
    .top-title {
      border-bottom: 1px solid hsl(230, 23%, 95%);
      padding-bottom: 12px;
      padding-left: 13px;
    }
    .top-content {
      display: flex;
      .top-photo {
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: absolute;
          top: 73px;
          left: 64px;
        }
        .top-name {
          position: absolute;
          top: 198px;
          left: 55px;
        }
        .top-numb {
          position: absolute;
          top: 232px;
          left: 55px;
        }
      }
      .top-Average {
        position: absolute;
        top: 73px;
        left: 320px;
        span {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(43, 50, 54, 1);
        }
        h3 {
          font-size: 50px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(240, 151, 24, 1);
          margin: 0px;
          margin-top: 20px;
          margin-left: 10px;
        }
      }
      .top-right {
        position: absolute;
        left: 750px;
        width: 40%;
        span {
          position: relative;
          top: 35px;
          left: -102px;
        }
      }
    }
  }
}
</style>
<style >
.el-progress__text {
  display: none;
}
</style>
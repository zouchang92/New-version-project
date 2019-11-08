<template>
  <div class="growth-achives">
    <div class="growth-title">
      <div class="title-cl">
        <p>班级:</p>
        <el-select v-model="value" placeholder="请选择班级">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="title-bn">
        <span>姓名/学号:</span>
        <el-input placeholder="请输入姓名或学号" v-model="input" clearable></el-input>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:26px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-upload" size="small">导出</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">打印</el-button>
      </div>
    </div>
    <div class="growth-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学习成绩" name="first">
          <div class="growth-academic" style="margin-top:15px;">
            <Academic />
          </div>
        </el-tab-pane>
        <el-tab-pane label="课堂表现" name="second">
          <div style="margin-top:15px;">
            <Performance />
          </div>
        </el-tab-pane>
        <el-tab-pane label="奖惩处罚" name="third">
          <div style="margin-top:15px;">
            <RewardPunishment />
           </div>
        </el-tab-pane>
        <el-tab-pane label="任职情况" name="fourth">
          <div style="margin-top:15px;">
             <Serving />
          </div>
        </el-tab-pane>
        <el-tab-pane label="社团活动情况">
          <div style="margin-top:15px;"><ClubActivities /></div>
        </el-tab-pane>
        <el-tab-pane label="身心健康登记">
          <div style="margin-top:15px;"><Health /></div>
        </el-tab-pane>
        <el-tab-pane label="期末评语">
          <div style="margin-top:15px;">期末评语</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Academic from "./components/Academic";
import Performance from './components/Performance';
import RewardPunishment from './components/RewardPunishment';
import Serving from './components/Serving';
import ClubActivities from './components/ClubActivities';
import Health from './components/Healthy'

export default {
  components: {
    Academic,
    Performance,
    RewardPunishment,
    Serving,
    ClubActivities,
    Health
  },
  data() {
    return {
      cities: [
        {
          label: "三年级二班"
        },
        {
          label: "三年级五班"
        }
      ],
      value: "三年级二班",
      input: "",
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.growth-achives {
  height: 1200px;
  margin-bottom: 30px;
  .growth-title {
    background: #fff;
    height: 84px;
    border-radius: 2px;
    margin: 15px;
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
  .growth-content {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    padding-top: 13px;
    margin: 15px;
    .growth-academic {
      margin-top: 15px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      margin-bottom: 30px;
    }
  }
}
</style>
<style>
.title-cl .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 10px;
}
.title-cl .el-input__suffix {
  right: 5px;
  top: 5px;
}
.title-bn .el-input {
  width: 224px;
  margin-left: -22px;
}
.title-bn .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 26px;
}
.growth-content .el-tabs__nav-scroll {
  padding-left: 24px;
  height: 60px;
}
.growth-content .el-tabs__nav-wrap {
  height: 49px;
}
</style>
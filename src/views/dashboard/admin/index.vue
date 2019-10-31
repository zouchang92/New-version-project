<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="32" style="height:300px;position:relative">
      <el-col :xs="8" :sm="8" :md='8' :lg='8' :xl='8' style="position: absolute;top: -190px;padding-left:26px;">
        <div class="chart-wrapper">
          <p class="u-line"></p>
          <span>校本资源</span>
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md='8' :lg='8' :xl='8' class="f-reported-l" style="padding:0px">
        <div class="f-reported">
          <p class="u-line"></p>
          <span>待上报</span>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md='8' :lg='8' :xl='8' class="f-association-l">
        <div class="f-association">
          <p class="u-line"></p>
          <span>学校社团</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8" style="height:310px">
      <el-col
        :xs="{span: 8}"
        :sm="{span: 8}"
        :md="{span: 8}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        class="f-Teacher-attendance"
        style="padding-left:14px;padding-right:19px;"
      >
        <div class="Teacher-attendance">
          <p class="u-line"></p>
          <span>教师考勤状况</span>
        </div>
      </el-col>
       <el-col
        :xs="{span: 8}"
        :sm="{span: 8}"
        :md="{span: 8}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        class="f-Students-attendance"
      >
        <div class="Students-attendance">
          <p class="u-line"></p>
          <span>学生考勤状况</span>
        </div>
      </el-col>
     <el-col
        :xs="{span: 8}"
        :sm="{span: 8}"
        :md="{span: 8}"
        :lg="{span: 8}"
        :xl="{span: 8}"
        style="padding-left:19px;"
        class="f-Information-bulletin"
      >
        <div class="Information-bulletin">
          <p class="u-line"></p>
          <span>信息公告</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import BarChart from "./components/BarChart";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "DashboardAdmin",
  components: {
    PanelGroup,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 15px 14px 0px 14px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    height: 372px;

    .u-line {
      display: block;
      width: 5px;
      height: 16px;
      background: #018eed;
      position: absolute;
      left: 42px;
      top: 1px;
    }
  }

  span {
    padding-left: 15px;
    line-height: 18px;
    font-size: 18px;
    color: #666;
    font-weight: bold;
  }
  .f-reported-l {
    padding: 0px;
    position: absolute;
    top: -12px;
    left: 459px;

    .f-reported {
      background: #fff;
      height: 194px;
      padding: 16px 16px 0;

      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 18px;
        top: 1px;
      }
    }
  }
  .f-association-l {
    padding-left: 20px;
    padding-right: 20px;
    top: 17px;
    position: absolute;
    right: -3px;
    .f-association {
      background: #fff;
      height: 252px;
      padding: 16px 16px 0;
    }
      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 32px;
        top: 3px;
      }
  }
  .f-Teacher-attendance
  {
    position: absolute;
    top: -100px;

    .Teacher-attendance{
    height:385px;
    background:#fff;
    padding: 16px 16px 0;
    }
    .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 29px;
        top: 1px;
      }
  }
    .f-Students-attendance
  {
    position: absolute;
    top: -100px;
    left:445px;
    width: 465px;

    .Students-attendance{
    height:385px;
    background:#fff;
    padding: 16px 16px 0;
    }
    .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 24px;
        top: 2px;
      }
  }
   .f-Information-bulletin
  {
    position: absolute;
    top: -15px;
    right: -5px;

    .Information-bulletin{
    height:300px;
    background:#fff;
    padding: 16px 16px 0;
    }
    .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 35px;
        top: 2px;
      }
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

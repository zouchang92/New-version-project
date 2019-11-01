<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="32" style="height:300px;position:relative">
      <el-col
        :xs="8"
        :sm="8"
        :md="8"
        :lg="8"
        :xl="8"
        style="position: absolute;top: -190px;padding-left:26px;"
      >
        <div class="chart-wrapper">
          <p class="u-line"></p>
          <span>校本资源</span>
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="f-reported-l" style="padding:0px">
        <div class="f-reported">
          <div class="reported-title">
            <p class="u-line"></p>
            <el-badge :value="4">
              <span>待上报</span>
            </el-badge>
            <div style="float:right">
              <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
          </div>
          <div class="u-reported-content">
            <ul class="u-content">
              <li v-for="city in cities" :key="city">
                <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
                  style="padding-top:5px;padding-left:5px"
                >
                  <el-checkbox :label="city">
                    <p>{{city}}</p>
                  </el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="f-association-l">
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
const cityOptions = ["等待消息上报11", "等待消息上报1", "等待消息上报2"];
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
      checkAll: false,
      cities: cityOptions,
      checkedCities:[],
      isIndeterminate: true
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      console.log(checkedCount);
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
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

      .reported-title {
        height: 35px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 0px 1px;
      }

      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 18px;
        top: 3px;
      }

      .u-content {
        list-style: none;
        margin: 0px;
        padding: 0px;
        overflow: hidden;
        li {
          padding-top: 10px;
          p {
            margin: 0px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1; //设置行数，1超出一行...，2超出两行...
            -webkit-box-orient: vertical;
          }
        }
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
  .f-Teacher-attendance {
    position: absolute;
    top: -100px;

    .Teacher-attendance {
      height: 385px;
      background: #fff;
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
  .f-Students-attendance {
    position: absolute;
    top: -100px;
    left: 445px;
    width: 465px;

    .Students-attendance {
      height: 385px;
      background: #fff;
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
  .f-Information-bulletin {
    position: absolute;
    top: -15px;
    right: -5px;

    .Information-bulletin {
      height: 300px;
      background: #fff;
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
<style >
  .el-checkbox span{
    margin-top: -8px;
  }
</style>

<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="32" style="height:300px;position:relative">
      <el-col
        :xs="8"
        :sm="8"
        :lg="8"
        :xl="8"
        style="margin-top: -189px;padding-left:25px;position:relative;"
      >
        <div class="chart-wrapper">
          <p class="u-line" />
          <span>校本资源</span>
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="f-reported-l" style="padding:0px">
        <div class="f-reported">
          <div class="reported-title">
            <p class="u-line" />
            <el-badge :value="4">
              <span>待上报</span>
            </el-badge>
            <div class="reported-election">
              <el-tooltip class="item" effect="light" content="批量上报" placement="bottom">
                <el-checkbox v-model="checkAll" class="Batch-pass" @change="handleCheckAllChange">
                  <i style="font-size: 20px;" class="el-icon-document-copy" />
                </el-checkbox>
              </el-tooltip>
              <el-button type="text" class="repoted-more" @click="showmore()">
                更多
                <i class="more-icon">>></i>
              </el-button>
            </div>
          </div>
          <div class="u-reported-content">
            <ul class="u-content">
              <li v-for="(city,inedx) in cities" :key="inedx">
                <el-checkbox-group
                  v-model="checkedCities"
                  style="padding-top:5px;padding-left:5px"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox :label="city">
                    <p class="u-content-p">{{ city.content }}</p>
                    <p class="u-content-date" style="float:right">{{ city.date }}</p>
                  </el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="f-association-l">
        <div class="f-association">
          <div class="association-title">
            <p class="u-line" />
            <span>学校社团</span>
          </div>
          <div v-for="(item,index) in list" :key="index" class="assocition-content">
            <div class="content-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="content-name">
              <span>{{ item.name }}</span>
            </div>
            <div class="content-state">
              <span :style="{'color':color(item)}">{{ item.state }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8" style="height:310px">
      <el-col
        :xs="8"
        :sm="8"
        :lg="8"
        :xl="8"
        class="f-Teacher-attendance"
        style="padding-left:14px;padding-right:19px;"
      >
        <div class="Teacher-attendance">
          <p class="u-line" />
          <span>教师考勤状况</span>
          <APieChart />
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="f-Students-attendance" style="padding:0px;">
        <div class="Students-attendance">
          <p class="u-line" />
          <span>学生考勤状况</span>
          <box-card />
        </div>
      </el-col>
      <el-col
        :xs="8"
        :sm="8"
        :lg="8"
        :xl="8"
        style="padding-left:19px;"
        class="f-Information-bulletin"
      >
        <div class="Information-bulletin">
          <div class="Information-title">
            <p class="u-line" />
            <span>信息公告</span>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane name="first" label="活动通知">
                <div class="Information-content">
                  <ul class="bulletin-content">
                    <li v-for="(city,index) in cities" :key="index">
                      <p class="Information-content-p">{{ city.content }}</p>
                      <p class="Information-content-date">{{ city.date }}</p>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="安全预警">
                <div class="Information-content">
                  <ul class="bulletin-content">
                    <li v-for="(city,index) in data" :key="index">
                      <p class="Information-content-p">{{ city.content }}</p>
                      <p class="Information-content-date">{{ city.date }}</p>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="待上报" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div>
        <div class="u-reported-content">
          <ul class="u-content">
            <li v-for="(city,inedx) in cities" :key="inedx">
              <el-checkbox-group
                v-model="checkedCities"
                style="padding-top:5px;padding-left:5px"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox :label="city">
                  <p class="u-content-p">{{ city.content }}</p>
                  <p class="u-content-date" style="float:right">{{ city.date }}</p>
                </el-checkbox>
              </el-checkbox-group>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import APieChart from './components/APieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import RaddarChart from './components/RaddarChart'
const cityOptions = [
  {
    content: '2019年元旦晚会节目清单',
    date: '2019-09-01'
  },
  {
    content: '2019年教育工作调研报告',
    date: '2019-09-08'
  },
  {
    content: '谋求大发展,铸就新辉煌',
    date: '2019-09-14'
  },
  {
    content: '2019年年度教学总结',
    date: '2019-09-29'
  }
]
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    // eslint-disable-next-line vue/no-unused-components
    BarChart,
    // eslint-disable-next-line vue/no-unused-components
    TodoList,
    BoxCard,
    APieChart,
    RaddarChart
  },
  data() {
    return {
      checkAll: false,
      dialogVisible: false,
      cities: cityOptions,
      data: [{ content: '火灾预警', date: '2019-12-11' }],
      checkedCities: [],
      isIndeterminate: true,
      list: [
        { title: '01 计算机协会', name: '李华', state: '进行中' },
        { title: '02 口语协会', name: '李华', state: '进行中' },
        { title: '03 计算机协会', name: '李华', state: '进行中' },
        { title: '04 电子应用与计算机协会', name: '李华', state: '未开始' }
      ],
      activeName: 'first'
    }
  },
  methods: {
    handleSetLineChartData(type) {
      // eslint-disable-next-line no-undef
      this.lineChartData = lineChartData[type]
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      console.log(checkedCount)
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    showmore() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    color(col) {
      // eslint-disable-next-line eqeqeq
      if (col.state == '进行中') return '#42BC9F'
      // eslint-disable-next-line eqeqeq
      if (col.state == '未开始') return '#000'
    }
  }
}
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
    margin-top: -12px;
    position: relative;

    .f-reported {
      background: #fff;
      height: 194px;
      padding: 16px 16px 0;

      .reported-title {
        height: 35px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 0px 1px;
      }
      .Batch-pass {
        position: absolute;
        top: 17px;
        right: 124px;
        color: red;
      }
      .more {
        position: absolute;
        top: -2px;
        right: 2px;
        /* color: #000; */
        font-size: 17px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 38px;
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
      .repoted-more {
        position: absolute;
        top: 8px;
        right: 50px;
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #000;
        .more-icon {
          position: absolute;
          top: 10px;
          right: -22px;
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
      .association-title {
        height: 35px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 0px 1px;
        span {
          margin-bottom: 11px;
          display: block;
        }
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

      .assocition-content {
        display: flex;
        height: 30px;
        justify-content: space-between;
        background: #f5f6fa;
        margin-top: 10px;
        span {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000;
        }
      }
    }
  }
  .f-Teacher-attendance {
    margin-top: -100px;

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
      left: 15px;
      top: 1px;
    }
    span {
      padding-left: 14px;
      line-height: 18px;
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
  }
  .f-Students-attendance {
    margin-top: -100px;

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
      .Information-title {
        height: 35px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 0px 1px;
      }
      .bulletin-content {
        list-style: none;
        margin: 0px;
        padding: 0px;
        height: 240px;
        li {
          height: 34px;
          padding-top: 10px;
          .Information-content-p {
            display: inline-block;
            width: 250px;
            height: 20px;
            margin: 0px;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .Information-content-date {
            position: relative;
            top: -41px;
            left: 290px;
            font-size: 14px;
          }
        }
      }
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
  .u-content {
    list-style: none;
    margin: 0px;
    padding: 0px;
    li {
      padding-top: 10px;
      .u-content-p {
        display: inline-block;
        width: 250px;
        height: 20px;
        margin: 0px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .u-content-date {
        position: absolute;
        top: -20px;
        left: 315px;
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
<style >
.u-reported-content .el-checkbox span {
  margin-top: -5px;
  display: inline-block;
}
.reported-title .el-checkbox__input {
  display: none;
}
.reported-election .el-checkbox {
  position: absolute;
  top: 19px;
  right: 85px;
}
.Information-bulletin .el-tabs__nav-scroll {
  float: right;
}
.Information-bulletin .el-tabs__nav-wrap {
  position: absolute;
  top: -48px;
  right: 10px;
}
.Information-bulletin .el-tabs__nav is-top::before {
  height: 0px;
}
</style>

<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="32" style="height:300px;position:relative">
      <el-col :xs="24" :sm="12" :lg="8" style="position: absolute;top: -190px;padding-left:26px;">
        <div class="chart-wrapper">
          <p class="u-line"></p>
          <span>校本资源</span>
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="f-reported-l" style="padding:0px">
        <div class="f-reported">
          <p class="u-line"></p>
          <span>待上报</span>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

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
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
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
    height:372px;

    .u-line{
    display: block;
    width: 5px;
    height: 16px;
    background: #018eed;
    position: absolute;
    left: 42px;
    top: 1px;}

  }
     
    span{
    padding-left: 15px;
    line-height: 18px;
    font-size: 18px;
    color:#666;
    font-weight: bold;
    }
    .f-reported-l{
      padding:0px;
      position:absolute;
      top:-12px;
      left:459px;

    .f-reported{
      background: #fff;
      height:194px;
      padding: 16px 16px 0;

    .u-line{
    display: block;
    width: 5px;
    height: 16px;
    background: #018eed;
    position: absolute;
    left: 18px;
    top: 1px;}
    }
   } 
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

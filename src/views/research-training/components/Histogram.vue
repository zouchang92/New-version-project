<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
const data = [
  { genre: "新教师", sold: 63 },
  { genre: "班主任", sold: 46 },
  { genre: "管理干部", sold: 41 },
  { genre: "老年教师", sold: 59 },
  { genre: "骨干教师", sold: 83 }
];
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    }
  },
  data() {
    return {
      chart: null,
      option: {
        color: ["#1890FF", "#2FC25B", "#FBD437"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000"
            }
          },
          axisLine: {
            //axisLine决定是否显示坐标刻度
            show: false
          },
          axisLabel: {
            //决定是否显示数据
            show: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000"
            }
          },
          data: ["外派", "网上自学", "现场授课"]
        },
        series: [
          {
            name: "参训人数",
            type: "bar",
            stack: "总量",
            barWidth: "20%",
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
            data: [30, 60, 78]
          },
          {
            name: "为参训人数",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
            data: [86, 43, 25]
          },
          {
            name: "未报名人数",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
            data: [57, 20, 40]
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption(this.option);
    }
  }
};
</script>

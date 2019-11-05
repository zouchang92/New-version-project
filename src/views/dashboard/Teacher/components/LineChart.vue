<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 3000;

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
      default: "270px"
    }
  },
  data() {
    return {
      chart: null,
      data: [
        "一单元",
        "二单元",
        "月考",
        "三单元",
        "四单元",
        "其中",
        "一单元",
        "五单元",
        "六单元",
        "月考",
        "期末"
      ],
      list: ["2019年下学期成绩分析图"]
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
      this.chart.setOption({
        title: {
          text: this.list,
          right: "4%",
          textStyle: {
            color: "#000",
            fontSize: 13,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          left: "4%",
          data: [{ name: "班级平均分" }, { name: "语文平均分" }]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#272729" //x轴的颜色
            }
          },
          splitLine: { show: true },
          data: [
            "一单元",
            "二单元",
            "月考",
            "三单元",
            "四单元",
            "其中",
            "一单元",
            "五单元",
            "六单元",
            "月考",
            "期末"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#272729" //x轴的颜色
            }
          }
        },
        series: [
          {
            name: "班级平均分",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [90, 86, 89, 87, 90, 79, 99, 95, 87, 99, 89],
            lineStyle: {
              normal: {
                color: "#3AA1FF",
                lineStyle: {
                  color: "#3AA1FF" //折线的颜色
                }
              }
            }
          },
          {
            name: "语文平均分",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [80, 97, 92, 88, 90, 89, 100, 75, 80, 79, 80],
            lineStyle: {
              normal: {
                color: "#FBD437",
                lineStyle: {
                  color: "#FBD437" //折线的颜色
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>


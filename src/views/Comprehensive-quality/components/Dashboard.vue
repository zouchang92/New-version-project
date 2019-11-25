
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

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
      default: "240px"
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        title: [
          {
            x: "30%",
            y: "79%",
            text: "综合素质极高",
            textStyle: {
              fontWeight: "normal",
              fontSize: 20,
              color: "#000"
            }
          }
        ],
        series: [
          {
            name: "综合素质评分",
            type: "gauge",
            radius: "90%",
            center: ["50%", "45%"],
            detail: { formatter: "{value}分" },
            axisLine: {
              lineStyle: {
                color: [["1", "#61A6FF"]],
                width: 15,
                fontSize: 20.0,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            },
            axisTick: {
              length: 8,
              lineStyle: {
                width: 1,
                color:'#fff'
              },
              alignWithLabel: false
            },
            axisLabel: {
              textStyle: {
                color: "#000",
                fontSize: 10.0
              },
              distance: 5
            },
            splitLine: {
              lineStyle: {
                width: 1,
                color:'#fff'
              },
              length: 10
            },
            data: [{ value: 79.4 }]
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
      var dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 0,
          shadowColor: "#203665"
        }
      };
      this.chart.setOption(this.option);
    }
  }
};
</script>

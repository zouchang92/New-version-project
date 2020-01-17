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
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic: {
          //图形中间文字
          type: "text",
          left: "center",
          top: "30%",
          style: {
            text: "校本研修",
            textAlign: "center",
            fill: "#000",
            fontSize: 20
          }
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "bottom",
          data: [
            "课程教学有效性",
            "精准教学类培训",
            "薄弱教师培训",
            "班主任培训",
            "学科带头人培训"
          ]
        },
        series: [
          {
            name: "校本研修",
            type: "pie",
            radius: ["27%", "40%"],
            center: ["50%", "30%"],
            color: ["#1890FF", "#F04864", "#FBD437", "#2FC25B", "#13C2C2"],
            label: {
              normal: {
                formatter: "{b|{b}}\n{c}  {per|({d}%)}  ",
                rich: {
                  a: {
                    color: "#000",
                    lineHeight: 22,
                    align: "center"
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 33
                  },
                  per: {
                    color: "#000"
                  }
                }
              }
            },
            data: [
              { value: 46, name: "课程教学有效性" },
              { value: 35, name: "精准教学类培训" },
              { value: 35, name: "薄弱教师培训" },
              { value: 30, name: "班主任培训" },
              { value: 10, name: "学科带头人培训" }
            ]
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

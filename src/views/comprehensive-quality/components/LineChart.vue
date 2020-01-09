<template>
  <div ref="myEchart" :class="className" :style="{height:height,width:width}" />
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
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      option: {
        legend: {
          data: ["奖励", "处罚"],
          align: "right"
        },
        tooltip: {},
        xAxis: {
          data: [
            "10-11",
            "10-12",
            "10-13",
            "10-14",
            "10-15",
            "10-16",
            "10-17",
            "10-18",
            "10-19"
          ],
          name: "",
          silent: false,
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false }
        },
        yAxis: {
          inverse: false,
          splitArea: { show: false }
        },
        grid: {
          left: 100
        },
        visualMap: {
          type: "continuous",
          dimension: 1,
          text: ["低", "高"],
          orient: "horizontal",
          inverse: true,
          itemHeight: 200,
          calculable: true,
          min: -2,
          max: 2,
          bottom: 0,
          left: 50,
          inRange: {
            colorLightness: [0.3, 0.8]
          },
          outOfRange: {
            color: "#BAE7FF"
          },
          controller: {
            inRange: {
              color: "#0050B3"
            }
          }
        },
        series: [
          {
            name: "处罚",
            type: "bar",
            stack: "one",
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 1,
                color: "#1B7BFE"
              },
              {
                offset: 0,
                color: "#61A6FF"
              }
            ]),
            data: [-0.5, -1.0, -1.5, -2.0, -1.5, -1.0, -1.0, -0.5, -1.0]
          },
          {
            name: "奖励",
            type: "bar",
            stack: "one",
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: "#D285FF"
              },
              {
                offset: 1,
                color: "#A990FF"
              }
            ]),
            data: [0.5, 1.0, 1.5, 2.0, 1.5, 1.0, 1.0, 0.5, 1.0]
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.init();
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
    },

    init() {
      const self = this; //因为箭头函数会改变this指向，指向windows。所以先把this保存
      setTimeout(() => {
        window.onresize = function() {
          self.chart = echarts.init(self.$refs.myEchart);
          self.chart.resize();
        };
      }, 20);
    }
  }
};
</script>

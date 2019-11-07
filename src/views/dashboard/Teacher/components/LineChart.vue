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
    },
    data:{
      type:Object
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
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener(
        "resize",
        _.throttle(() => {
          this.myEcharts.resize();
          console.log("---");
        }, 500)
      );
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
      this.chart.setOption(this.data);
    },
  }
};
</script>


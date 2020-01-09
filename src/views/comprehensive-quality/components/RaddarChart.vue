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
      default: "300px"
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {},
        legend: {
          //图例组件
          orient: "vertical", //图例列表的布局朝向
          right: 17.8, //距右边的距离
          formatter: "{name}",
          bottom: 120, //距下边的距离
          textStyle: {
            //图例的公用文本样式。
            color: "#2f4554"
          },
          padding: 0
        },

        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: 70,
          center: ["50%", "40%"], //中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          splitArea: {
            show: true,

            areaStyle: {
              color: ["#fff"] // 图表背景网格的颜色
            }
          },

          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: true
            // lineStyle: {
            //   color: ["rgba(238, 238, 238, 0.5)"]
            // }
          },
          indicator: [
            {
              name: "学习成绩",
              max: 150
            },
            {
              name: "期末评语",
              max: 150
            },
            {
              name: "身心健康",
              max: 150
            },
            {
              name: "社团活动",
              max: 150
            },
            {
              name: "任职情况",
              max: 150
            },
            {
              name: "奖励处罚",
              max: 150
            },
            {
              name: "课堂表现",
              max: 150
            }
          ]
        },
        series: [
          {
            name: "教学资源",
            type: "radar",
            // areaStyle: {normal: {}},
            itemStyle: {
              //图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
              normal: {
                color: ["#1890FF"] //雷达线的颜色
              }
            },
            data: [
              {
                value: [110, 100, 130, 100, 120, 110, 100, 120],
                areaStyle: {
                  normal: {
                    opacity: 0.3,
                    color: "#46CEF3"
                  }
                },
                label: {
                  normal: {
                    show: false,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              }
            ]
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

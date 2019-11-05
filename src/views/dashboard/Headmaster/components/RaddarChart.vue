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
      default: "330px"
    }
  },
  data() {
    return {
      chart: null,
      data: [
        { value: 37, name: "校本",icon: 'circle', },
        { value: 28, name: "个人" ,icon: 'circle',},
        { value: 17, name: "关注" ,icon: 'circle',}
      ]
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
      this.chart.setOption({
        tooltip: {},
        data: this.data,
        legend: {
          //图例组件
          orient: "horizontal", //图例列表的布局朝向
          formatter: "{name}",
          bottom: 1, //距下边的距离
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
          center: ["48%", "50%"], //中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          splitArea: {
            show: true,

            areaStyle: {
              color: ["#fff"] // 图表背景网格的颜色
            }
          },

          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: false
            // lineStyle: {
            //   color: ["rgba(238, 238, 238, 0.5)"]
            // }
          },
          indicator: [
            {
              name: "图片",
              max: 500
            },
            {
              name: "视频",
              max: 500
            },
            {
              name: "文档",
              max: 500
            },
            {
              name: "音频",
              max: 500
            },
            {
              name: "课件",
              max: 500
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
                value: [282, 100, 170, 260, 120],
                name: "校本",
                label: {
                  normal: {
                    show: false,
                    formatter: function(params) {
                      return params.value;
                    }
                  }
                }
              },
              {
                value: [100, 300, 270, 160, 220],
                name: "个人",
                itemStyle: {
                  //图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                  normal: {
                    color: ["#FACC14"] //雷达线的颜色
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
              },
              {
                value: [242, 400, 370, 210, 160],
                name: "关注",
                itemStyle: {
                  //图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
                  normal: {
                    color: ["#2FC25B"] //雷达线的颜色
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
      });
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

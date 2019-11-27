
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
      chart: null
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
      let options = {
        series: [
          {
            name: "第一个圆环",
            type: "pie",
            clockWise: false,
            radius: [50, 60],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["15%", "50%"],
            data: [
              {
                value: 98,
                label: {
                  normal: {
                    rich: {
                      a: {
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#000",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{b|研训课件}\n\n" + "{a|" + params.value + "}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#eee"
                  },
                  emphasis: {
                    color: "#eee"
                  }
                }
              },
              {
                value: 30,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#1890FF"
                  },
                  emphasis: {
                    color: "#1890FF"
                  }
                }
              }
            ]
          },
          {
            name: "第二个圆环",
            type: "pie",
            clockWise: false,
            radius: [50, 60],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: 152,
                label: {
                  normal: {
                    rich: {
                      a: {
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#000",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{b|研训照片}\n\n" + "{a|" + params.value + "}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#eee",
                    shadowColor: "#000",
                    shadowBlur: 0
                  },
                  emphasis: {
                    color: "#eee"
                  }
                }
              },
              {
                value: 50,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#2FC25B"
                  },
                  emphasis: {
                    color: "#2FC25B"
                  }
                }
              }
            ]
          },
          {
            name: "第三个圆环",
            type: "pie",
            clockWise: false,
            radius: [50, 60],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["85%", "50%"],
            data: [
              {
                value: 70,
                label: {
                  normal: {
                    rich: {
                      a: {
                        align: "center",
                        fontSize: 20,
                        fontWeight: "bold"
                      },
                      b: {
                        color: "#000",
                        align: "center",
                        fontSize: 16
                      }
                    },
                    formatter: function(params) {
                      return "{b|研训报告}\n\n" + "{a|" + params.value + "}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#fff"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#eee",
                    shadowColor: "#000",
                    shadowBlur: 0
                  },
                  emphasis: {
                    color: "#eee"
                  }
                }
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#FACC14"
                  },
                  emphasis: {
                    color: "#FACC14"
                  }
                }
              }
            ]
          }
        ]
      };
      this.chart.setOption(options);
    }
  }
};
</script>

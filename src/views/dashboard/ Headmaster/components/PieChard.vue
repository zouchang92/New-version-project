
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
      this.chart.setOption({
        series: [
          {
            name: "第一个圆环",
            type: "pie",
            clockWise: false,
            radius: [50, 60],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["15%", "35%"],
            data: [
              {
                value: 90,
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
                      return (
                        "{b|文明}\n\n" +"{a|" +params.value +"分}"
                      );
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "14",
                      fontWeight: "normal",
                      color: "#000"
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#3AA1FF",
                    shadowColor: "#000",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 10,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#F0F2F5"
                  },
                  emphasis: {
                    color: "#000"
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
            center: ["50%", "35%"],
            data: [
              {
                value: 89,
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
                      return (
                        "{b|守纪}\n\n" +"{a|" +params.value +"分}"
                      );
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
                    color: "#4ECB73",
                    shadowColor: "#F0F2F5",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 11,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#F0F2F5"
                  },
                  emphasis: {
                    color: "#412a4e"
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
            center: ["85%", "35%"],
            data: [
              {
                value: 90,
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
                      return ("{b|卫生}\n\n" +"{a|" +params.value +"分}"
                      );
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
                    color: "#FBD437",
                    shadowColor: "#613fd1",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 10,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#F0F2F5"
                  },
                  emphasis: {
                    color: "#F0F2F5"
                  }
                }
              }
            ]
          }
        ]
      });
    }
  }
};
</script>

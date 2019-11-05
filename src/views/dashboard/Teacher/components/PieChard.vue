
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
            center: ["15%", "50%"],
            data: [
              {
                value: 25,
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
                        "{b|已提交}\n\n" +"{a|" +params.value +"人}"
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
                    color: "#2c6cc4",
                    shadowColor: "#2c6cc4",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 75,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#24375c"
                  },
                  emphasis: {
                    color: "#24375c"
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
                value: 50,
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
                        "{b|已提交}\n\n" +"{a|" +params.value +"人}"
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
                    color: "#ef45ac",
                    shadowColor: "#ef45ac",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 50,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#412a4e"
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
            center: ["85%", "50%"],
            data: [
              {
                value: 75,
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
                      return ("{b|已提交}\n\n" +"{a|" +params.value +"人}"
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
                    color: "#613fd1",
                    shadowColor: "#613fd1",
                    shadowBlur: 0
                  }
                }
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#453284"
                  },
                  emphasis: {
                    color: "#453284"
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

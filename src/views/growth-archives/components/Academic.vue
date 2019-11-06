<template>
  <div class="Academic">
    <el-select  v-model="value" placeholder="请选择学期">
      <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.label">
        <span style="float: left">{{ item.label }}</span>
      </el-option>
    </el-select>
    <line-chart :style="{height:height}" :data="options1"></line-chart>
  </div>
</template>
<script>
import LineChart from "../../dashboard/Teacher/components/LineChart";
import isValidOption from "@/utils/isValidOption.js";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      height: "330px",
      cities: [
        {
          label: "2019年下学期"
        },
        {
          label: "2019年上学期"
        }
      ],
      value: "",
      options1: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          left: "4%",
          top: "13%",
          data: [{ name: "蔡启超" }, { name: "班级平均分" }]
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
          top: "30%",
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
            name: "蔡启超",
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
            name: "班级平均分",
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
      }
    };
  },
  watch: {
    options(options) {
      this.checkAndSetOption();
    }
  },
  methods: {
    checkAndSetOption() {
      let options = this.options;
      if (isValidOption(options)) {
        this.myEcharts.setOption(options);
        this.isOptionAbnormal = false;
      } else {
        this.isOptionAbnormal = true;
      }
    }
  }
};
</script>
<style lang="scss">
.Academic {
  height: 750px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
}
</style>
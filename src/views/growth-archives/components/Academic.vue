<template>
  <div class="Academic">
    <div class="Acadmic-Semester">
      <el-select v-model="value" placeholder="请选择学期">
        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.label">
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="Acadmic-Subject">
      <el-select v-model="value1" placeholder="请选择科目">
        <el-option
          v-for="item in subject"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
      <line-chart :style="{height:height}" :data="options1"></line-chart>
    </div>
    <div class="Acadmic-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="(item,i) in list" :key="i" :prop="item.prop" :label="item.label"></el-table-column>
      </el-table>
    </div>
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
      list: [
        { prop: "name", label: "名称" },
        { prop: "Chinese", label: "语文" },
        { prop: "Mathematics", label: "数学" },
        { prop: "English", label: "英语" },
        { prop: "Physics", label: "物理" },
        { prop: "Chemistry", label: "化学" },
        { prop: "History", label: "历史" },
        { prop: "Geography", label: "地理" },
        { prop: "Biology", label: "生物" },
        { prop: "Morality", label: "道德与法" },
        { prop: "score", label: "个人总分" },
        { prop: "class", label: "班级均分" }
      ],
      height: "570px",
      cities: [
        {
          label: "2019年下学期"
        },
        {
          label: "2019年上学期"
        }
      ],
      subject: [{ label: "语文" }, { label: "数学" }],
      value: "2019年下学期",
      value1: "语文",
      tableData: [
        {
          name: "一月考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        },
        {
          name: "二月考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        },
        {
          name: "期中考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        },
        {
          name: "三月考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        },
        {
          name: "四月考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        },
        {
          name: "期末考",
          Chinese: 55,
          Mathematics: 66,
          English: 39,
          Physics: 57,
          Chemistry: 60,
          History: 90,
          Geography: 99,
          Biology: 70,
          Morality: 77,
          score: 600,
          class: 500
        }
      ],
      options1: {
        title: {
          text: "2019年下学期蔡启超成绩分析图",
          left: "4%",
          top: "10%",
          textStyle: {
            color: "#000",
            fontSize: 18,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          left: "35%",
          bottom: "9%",
          data: [
            { name: "一月考" },
            { name: "二月考" },
            { name: "期中" },
            { name: "三月考" },
            { name: "四月考" },
            { name: "期末" }
          ]
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
            "语文",
            "数学",
            "英语",
            "物理",
            "化学",
            "历史",
            "地理",
            "生物",
            "道德与法"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "20%",
          top: "20%",
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
            name: "一月考",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [55, 66, 39, 57, 60, 90, 99, 70, 77],
            itemStyle: {
              normal: {
                color: "#1890FF",
                lineStyle: {
                  color: "#1890FF" //折线的颜色
                }
              }
            }
          },
          {
            name: "二月考",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [73, 57, 62, 46, 89, 69, 100, 30, 50],
            itemStyle: {
              normal: {
                color: "#8E9CF0",
                lineStyle: {
                  color: "#8E9CF0" //折线的颜色
                }
              }
            }
          },
          {
            name: "期中",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [80, 97, 92, 88, 90, 89, 100, 75, 80],
            itemStyle: {
              normal: {
                color: "#F09718",
                lineStyle: {
                  color: "#F09718" //折线的颜色
                }
              }
            }
          },
          {
            name: "三月考",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [20, 57, 62, 78, 90, 89, 89, 78, 92],
            itemStyle: {
              normal: {
                color: "#51B26F",
                lineStyle: {
                  color: "#51B26F" //折线的颜色
                }
              }
            }
          },
          {
            name: "四月考",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [50, 37, 52, 68, 80, 99, 60, 75, 80],
            itemStyle: {
              normal: {
                color: "#8FC31F",
                lineStyle: {
                  color: "#8FC31F" //折线的颜色
                }
              }
            }
          },
          {
            name: "期末",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [70, 91, 99, 92, 98, 100, 100, 85, 95],
            itemStyle: {
              normal: {
                color: "#FF3761",
                lineStyle: {
                  color: "#FF3761" //折线的颜色
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
<style lang="scss" scoped>
.Academic {
  height: 1000px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  position: relative;
  margin-bottom: 30px;
  .Acadmic-Subject {
    margin-top: -36px;
  }
  .Acadmic-table {
    margin: 0px 49px;
  }
}
</style>
<style >
.Acadmic-Semester .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 8px;
}
.Acadmic-Semester .el-input__suffix {
  right: 5px;
  top: 5px;
}
.Acadmic-Semester .el-select {
  margin-left: 800px;
  top: 46px;
  z-index: 100;
}
.Acadmic-Subject .el-input__inner {
  width: 130px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
.Acadmic-Subject .el-input__suffix {
  right: 5px;
  top: 5px;
}
.Acadmic-Subject .el-select {
  margin-left: 1062px;
  top: 50px;
  z-index: 100;
}
</style>
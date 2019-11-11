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
      <el-button class="Subject-button" type="primary" @click="dialogFormVisible = true">选择考试批次</el-button>

      <el-dialog title="选择考试批次" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学年:">
            <el-select v-model="form.region" placeholder="请选择学年">
              <el-option label="2019年上学期" value="shanghai"></el-option>
              <el-option label="2019年下学期" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <line-chart :style="{height:height}" :data="options1"></line-chart>
    </div>
    <div style="height:30px;background:rgb(235,236,243)"></div>
    <div class="Acadmic-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="(item,i) in list" :key="i" :prop="item.prop" :label="item.label"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
const Semester = ["期中", "期末"];
import LineChart from "../../dashboard/Teacher/components/LineChart";
import isValidOption from "@/utils/isValidOption.js";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      cities: Semester,
      dialogFormVisible: false,
      form: {
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
            { name: "语文" },
            { name: "数学" },
            { name: "英语" },
            { name: "物理" },
            { name: "化学" },
            { name: "历史" },
            { name: "地理" },
            { name: "生物" },
            { name: "道德与法" }
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
          data: ["一月考", "二月考", "期中", "三月考", "四月考", "期末"]
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
            name: "语文",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [55, 66, 39, 57, 60, 90],
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
            name: "数学",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [73, 57, 62, 46, 89, 69],
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
            name: "英语",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [80, 97, 92, 88, 90, 89],
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
            name: "物理",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [20, 57, 62, 78, 90, 89],
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
            name: "化学",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [50, 37, 52, 68, 80, 99],
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
            name: "历史",
            type: "line",
            smooth: false,
            symbol: "circle", //折线点设置为实心点
            symbolSize: 4, //折线点的大小
            data: [70, 91, 99, 92, 98, 100],
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
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
<style lang="scss" scoped>
.Academic {
  // height: 1000px;
  // background: rgba(255, 255, 255, 1);
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
.Acadmic-Subject .el-dialog__header {
  border-bottom: 1px solid #dbdbdb;
}
.Acadmic-Subject .Subject-button {
  position: absolute;
  top: 50px;
  left: 1039px;
  z-index: 100;
}
</style>
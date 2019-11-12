<template>
  <div class="student-performance-chart">
    <canvas id="student-performance-chart" style="width: 100%" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  data() {
    return {
      instance: '',
    }
  },
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    chartData: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.initChart()
    //this.setChartData(this.chartData)
  },
  methods: {
    initChart() {

    },
  },
  watch: {
    chartData: {
      handler: function(val) {
        if (!this.instance) {
          this.initChart()
        }
        this.instance.source(val)
      },
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <canvas id="mountNode" width="400" height="260" />
</template>

<script>
import F2 from '@antv/f2/lib/index-all'

export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.line()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    line() {
      var data = [
        {
          amount: 20,
          ratio: 0.1,
          memo: '请假',
          const: 'const'
        },
        {
          amount: 91,
          ratio: 0.5,
          memo: '剩余人数',
          const: 'const'
        },
        {
          amount: 24,
          ratio: 0.3,
          memo: '缺勤',
          const: 'const'
        }
      ]

      var chart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(data)
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.75
      })
      chart.axis(false)
      chart.legend({
        position: 'bottom',
        align: 'center'
      })
      chart.tooltip(false)
      chart.guide().html({
        position: ['50%', '50%'],
        html:
          '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"><div style="font-size:37px;font-family:Source Han Sans CN;font-weight:500;margin-top:-13px;">145</div><div style="font-size:16px;font-family:Source Han Sans CN;font-weight:500;padding-top:10px;">教师总人数</div></div>'
      })
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 75,
        label1: function label1(data) {
          return {
            text: data.memo,
            fill: '#808080'
          }
        },
        label2: function label2(data) {
          return {
            fill: '#000000',
            text: data.amount + '人',
            fontWeight: 500,
            fontSize: 10
          }
        }
      })
      chart
        .interval()
        .position('const*ratio')
        .color('memo', [
          'red',
          '#36CBCB',
          '#F2637B',
          '#3AA1FF'
        ])
        .adjust('stack')
      chart.render()
    }
  }
}
</script>

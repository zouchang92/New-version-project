<template>
  <canvas id="myChart" width="400" height="329"></canvas>
</template>

<script>
import F2 from "@antv/f2";

export default {
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
      const data = [
        { genre: "案例", sold: 2750 },
        { genre: "图片", sold: 1150 },
        { genre: "文档", sold: 1200 },
        { genre: "视频", sold: 3500 },
        { genre: "课件", sold: 1500 },
        { genre: "音频", sold: 1500 }
      ];

      var chart = new F2.Chart({
        id: "myChart",
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = "¥ " + items[0].value;
        }
      });
      chart.interval().position("genre*sold");
      chart.render();
    }
  }
};
</script>

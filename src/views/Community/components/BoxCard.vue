<template>
 <canvas id="mount" width="400" height="260"></canvas>
</template>

<script>
import F2 from "@antv/f2/lib/index-all";
import { getStPayReport } from '@/api/communityApi.js'
export default {
  data() {
    return {
      list:[],
      unPayCount:'',
      PayCount:''
    };
  },
  created() {
    this.getStPayReport()
  },
  mounted() {
    var v = this;
    this.$nextTick(()=>{
      v.line();
    });
  },
  methods: {
    async getStPayReport() {
      try {
        const List = await getStPayReport()
        this.list = List.data
        this.unPayCount= this.list.unPayCount
        this.PayCount = this.list.payCount
        console.log(this.unPayCount, this.list.payCount)
      } catch (err) {
        console.log(err)
      }
    },
    line() {
      var data = [
        {
          amount: 0,
          ratio: 0.1,
          memo: "未缴",
          const: "const"
        },
        {
          amount: 2,
          ratio: 0.5,
          memo: "已缴",
          const: "const"
        }
      ];
      console.log(data)
      var chart = new F2.Chart({
        id: "mount",
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data);
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.8,
        radius: 0.75
      });
      chart.axis(false);
      chart.legend({
        position: "bottom",
        align: "center"
      });
      chart.tooltip(false);
      chart.guide().html({
        position: ["50%", "50%"],
        html:
          '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="Content"><div style="font-size:37px;font-family:Source Han Sans CN;font-weight:500;margin-top:-13px;">2</div><div style="font-size:16px;font-family:Source Han Sans CN;font-weight:500;padding-top:10px;">社团总人数</div></div>'
      });
      // 配置文本饼图
      chart.pieLabel({
        sidePadding: 75,
        label1: function label1(data) {
          return {
            text: data.memo,
            fill: "#808080"
          };
        },
        label2: function label2(data) {
          return {
            fill: "#000000",
            text:data.amount+'人',
            fontWeight: 500,
            fontSize: 10
          };
        }
      });
      chart
        .interval()
        .position("const*ratio")
        .color("memo", [
          "#F2637B",
          "#3AA1FF"
        ])
        .adjust("stack");
      chart.render();
    }
  }
};
</script>


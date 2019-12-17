<template>
  <div style="position:relative">
    <div class="timeline-date">
      <div>
        <p class="timeline-left" @click="weekPre ()">
          <i class="el-icon-caret-left" />
        </p>
        <h1>{{ currentYear }}年{{ currentMonth }}月</h1>
        <p class="timeline-right" @click="weekNext ()">
          <i class="el-icon-caret-right" />
        </p>
      </div>
      <table class="timeline-day" align="center" cellspacing="0" cellpadding="3">
        <tbody>
          <tr class="day-p" align="center">
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
            <td>日</td>
          </tr>
          <tr class="days" align="center">
            <td @click="pick(day)" v-for="(day, index) in days" :key="index">
              <!--本月-->
              <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
              <span v-else>
                <!--今天-->
                <span
                  v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"
                  class="active"
                >{{ day.getDate() }}</span>
                <span v-else>{{ day.getDate() }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="timeline">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
export default {
  name: "date",

  data() {
    return {
      isShow: false,
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      reverse: true,
      activities: [
        {
          content: "校干部研讨会",
          timestamp: "14:00"
        },
        {
          content: "组织学校总结大会",
          timestamp: "16:00"
        },
        {
          content: "奖励大会",
          timestamp: "18:00"
        }
      ]
    };
  },

  mounted() {},

  created() {
    this.initData(null);
  },

  methods: {
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },

    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0   // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 今日日期 年-月-日
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i);
        // console.log(y:" + d.getDate())
        this.days.push(d);
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },

    //  上个星期
    weekPre() {
      const d = this.days[0]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7);
      this.initData(d);
    },

    //  下个星期
    weekNext() {
      const d = this.days[6]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7);
      this.initData(d);
    },

    // 上一個月   传入当前年份和月份
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 下一個月   传入当前年份和月份
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 当前选择日期
    pick(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    }
  }
};
</script>
<style lang="scss">
// @import "~base";

.timeline-date {
  height: 217px;
  border-bottom: 1px solid #ccc;
  .timeline-left {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 380px;
  }
  h1 {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: rgba(17, 17, 17, 1);
    line-height: 38px;
    position: absolute;
    top: 6px;
    right: 149px;
  }

  .timeline-right {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 56px;
  }
  .timeline-day {
    tr {
      margin: 0px;
      td {
        width: 50px;
        position: relative;
        top: 80px;
        left: 4px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(117, 117, 117, 1);
        line-height: 38px;
      }
    }
    .days {
      td {
        font-size: 24px;
        .active {
          text-align: center;
          display: inline-block;
          width: 35px;
          height: 35px;
          color: #fff;
          border-radius: 50%;
          background-color: #7c9de6;
        }

        .other-month {
          color: #e4393c;
        }
      }
    }
  }
}
.timeline {
  margin-left: 47px;
  margin-top: 20px;
}
</style>
<style >
.timeline .el-timeline-item__timestamp.is-bottom {
  position: absolute;
  top: -5px;
  left: -47px;
}
@media (min-width: 1200) {
  .timeline-left {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 331px;
  }
  h1 {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: rgba(17, 17, 17, 1);
    line-height: 38px;
    position: absolute;
    top: 6px;
    right: 115px;
  }

  .timeline-right {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 22px;
  }
}
@media (min-width: 1580) {
  .timeline-left {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 417px;
  }
  h1 {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: rgba(17, 17, 17, 1);
    line-height: 38px;
    position: absolute;
    top: 6px;
    right: 149px;
  }

  .timeline-right {
    font-size: 20px;
    position: absolute;
    top: 14px;
    right: 104px;
  }
}
</style>
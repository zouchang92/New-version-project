<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>新增考勤规则</span>
      </div>
      <rule-detail ref="rule" :ruleData="model" />
      <div class="btn-row" style="text-align: center">
        <el-button @click="addRules" :loading="loading" type="primary">添加</el-button>
        <el-button type="default">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import RuleDetail from '../RuleDetail'
import { addAttendanceRule } from '@/api/attendanceManageApi'
export default {
  data() {
    return {
      model: {
        id: '',
        title: '',
        orgIds: [],
        type: '1',
        attenDay: [],
        timeTable: [],
        isSingle: true,
        specDate: [],
        skipDate: [],
        ruleDate: [{
          date: '星期一',
          rules: [],
        }, {
          date: '星期二',
          rules: [],
        },{
          date: '星期三',
          rules: [],
        },{
          date: '星期四',
          rules: [],
        },{
          date: '星期五',
          rules: [],
        },{
          date: '星期六',
          rules: [],
        },{
          date: '星期天',
          rules: [],
        }]
      },
      timeModel: [],
      operation: '',
      loading: false
    }
  },
  methods: {
    async addRules() {
      this.loading = true
      const {data, staticCombineData} = this.$refs.rule.getData()
      if (data.type === '0') {
        data.ruleDate = staticCombineData
      }
      try {
        let res = await addAttendanceRule(data)
        this.loading = false
        this.$message.success('添加成功')
        this.model = this.$data.model
      } catch(err) {
        this.loading = false
      }
    },
  },
  components: {
    RuleDetail
  }
  
}
</script>

<style lang="scss" scoped>
.soild-attendance {
  width: 90%;
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #dcdcdc;
  .set-time {
    margin-top: 10px;
  }
}
.time-wrap {
  display: flex;
  margin-top: 10px;
  .time-list {
    width: 120px;
    background: #f9f9f9;
    text-align: center;
    padding-bottom: 7px;
    border-radius: 4px;
    margin-right: 8px;
    div {
      font-size: 12px;
      color: #888;
      border-bottom: 1px solid #e2e2e2;
      margin: 0 9px 7px;
      padding: 5px 0 3px;
    }
    p {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 2px;
      margin-top: 1px;
      img {
        width: 15px;
        margin-right: 4px;
      }
    }
  }
}
</style>
<template>
  <div>
      <Container :loading="tableListLoading" :empty="tableList.length === 0">
        <div slot="child-slot">
          <el-card v-for="(item, i) in tableList" :key="i">
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
              <el-button @click="editRules(item)" style="float: right; padding: 3px 0" type="text">修改</el-button>
            </div>
            <div class="rule-list-wrapper">
              <div class="rule-list-item">
                <el-form>
                  <el-form-item label="考勤对象">
                    {{item.realName}}
                  </el-form-item>
                  <el-form-item label="考勤规则">
                    <attendance-table :canEdit="false" v-model="item.ruleDate" />
                  </el-form-item>
                  <el-form-item label="考勤特殊日期">
                    <attendance-table :canEdit="false" v-model="item.specDate" />
                  </el-form-item>
                  <el-form-item label="无需考勤日期">
                    <el-tag style="margin-left: 10px;" v-for="(item, i) in item.skipDate" :key="i">{{item}}</el-tag>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-card>
        </div>
      </Container>
      <el-dialog :modal-append-to-body='false' width="80%" title="编辑" :visible.sync="dialogVisible">
        <rule-detail :ruleData="ruleData" />
      </el-dialog>
  </div>
</template>

<script>
import { getAttendanceRules } from '@/api/attendanceManageApi'
import tableCommon from '@/mixins/table-common'
import Container from '@/components/Container'
import RuleDetail from '../RuleDetail'
import AttendanceTable from '../Settings/components/AttendanceTable'
import { getDictById } from '@/utils'
import _ from 'lodash'

const attenRoles = getDictById('YPTGDVWMMAZSUKDFHBWZYFIQFXALNDOX')

export default {
  data() {
    return {
      dialogVisible: false,
      fn: getAttendanceRules,
      ruleData: {
        title: '',
        isSingle: '',
        roleType: '',
        type: '1',
        attenDay: [],
        timeTable: [{
          in: '8:00',
          out: '12:00'
        }],
        specDate: [],
        skipDate: [],
        ruleDate: [{
          date: '星期一',
          rules: [{in: '7:00', out: '12:00'}, {in: '12:00', out: '14:00'}, {in: '14:00', out: '15:00'}],
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
      }
    }
  },
  methods: {
    processData(data) {
      let proData = _.map(data, n => {
        if (n.type === '0') {
          return {
            ...n,
            realName: _.find(attenRoles, c => c.value === n.roleType).label,
            attenDay: _.reduce(n.ruleDate, (result, value, key) => {
              if (value.rules.length) {
                result.push(value.date)
              }
              return result
            }, []),
            timeTable: []
          }
        }
      })
      console.log(proData)
      return proData
    },
    editRules(item) {
      this.dialogVisible = true
      this.ruleData = item
    }
  },
  components: {
    Container,
    RuleDetail,
    AttendanceTable
  },
  mixins: [tableCommon],
}
</script>

<style lang="scss" scoped>
.rule-list-wrapper {

}
</style>
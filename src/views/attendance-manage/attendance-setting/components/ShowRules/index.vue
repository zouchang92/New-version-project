<template>
  <div class="show-rules">
      <Container :loading="tableListLoading" :empty="tableList.length === 0">
        <div slot="child-slot">
          <el-card style="margin-top: 20px;" v-for="(item, i) in tableList" :key="i">
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
              <el-switch @change="e => triggerRules(e, item, i)" style="float: right; padding: 3px 6px;margin-right: 3px" :value="item.isEnabled"></el-switch>
              <el-button @click="singleDel(item)" style="float: right; padding: 3px 6px" icon="el-icon-delete" type="danger">删除</el-button>
              <el-button @click="editRules(item)" style="float: right; padding: 3px 6px;margin-right: 3px" icon="el-icon-edit" type="primary">修改</el-button>
              
            </div>
            <div class="rule-list-wrapper">
              <div class="rule-list-item">
                <el-form>
                  <el-form-item label="考勤机构">
                    <el-tree-select :disabled="true" ref="treeSelect" :treeParams="treeParams" v-model="item.orgIds"/>
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
      <member-select v-model="memberSelect.visible" :memberSelected="memberSelect.memberSelected" />
      <el-dialog :modal-append-to-body='false' width="80%" title="编辑" :visible.sync="dialogVisible">
        <rule-detail ref="ruleDetail" :ruleData="ruleData" />
        <span slot="footer" class="dialog-footer">
          <el-button :loading="saveLoading" type="primary" @click="saveSetting">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getAttendanceRules, updateAttendanceRule, deleteAttendanceRule, enableAttendace } from '@/api/attendanceManageApi'
import tableCommon from '@/mixins/table-common'
import Container from '@/components/Container'
import RuleDetail from '../RuleDetail'
import AttendanceTable from '../Settings/components/AttendanceTable'
import { getDictById, getOrgan } from '@/utils'
import MemberSelect from '@/components/MemberSelect'
import _ from 'lodash'

const attenRoles = getDictById('YPTGDVWMMAZSUKDFHBWZYFIQFXALNDOX')
const attenTypes = []

export default {
  data() {
    return {
      memberSelect: {
        visible: false,
        memberSelected: [{
          value: 'HSYRZWJEKDJAHIDGDTOKMWKWQAHKZVRX',
          label: '老师1'
        }]
      },
      treeParams: {
        props: {
          label: 'orgName',
          value: 'id',
        },
        data: getOrgan()
      },
      dialogVisible: false,
      saveLoading: false,
      fn: getAttendanceRules,
      singleDelFn: deleteAttendanceRule,
      ruleData: {
        id: '',
        title: '',
        isSingle: true,
        roleType: '',
        type: '1',
        attenDay: [],
        timeTable: [],
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
      }
    }
  },
  methods: {
    async saveSetting() {
      this.loading = true
      const {data, staticCombineData} = this.$refs.ruleDetail.getData()
      if (data.type === '0') {
        data.ruleDate = staticCombineData
      }
      try {
        let res = await updateAttendanceRule(data)
        this.$message.success('修改成功')
        this.loading = false
        await this.initList()
        this.dialogVisible = false
      } catch(err) {
        this.loading = false
      }
    },
    async triggerRules(e, item, i) {
      try {
        let res = await enableAttendace({
          id: item.id,
          isEnabled: e
        })
        this.$message.success(e ? '启用成功' : '禁用成功')
        this.$set(this.tableList[i], 'isEnabled', e)
        //await this.initList()
      } catch(err) {

      }
    },
    processData(data) {
      let proData = _.map(data, n => {
        let attenRoleName = _.find(attenRoles, c => c.value === n.roleType)
        if (n.type === '0') {
          return {
            ...n,
            realName: attenRoleName ? attenRoleName.label : '无',
            attenDay: _.reduce(n.ruleDate, (result, value, key) => {
              if (value.rules.length) {
                result.push(value.date)
              }
              return result
            }, []),
            timeTable: []
          }
        } else {
          return {
            ...n,
            realName: attenRoleName ? attenRoleName.label : '无',
          }
        }
      })
      return proData
    },
    editRules(item) {
      this.dialogVisible = true
      if (!item.orgIds) {
        item.orgIds = []
      }
      if(item.type === '0') {
        item.ruleDate.forEach(n => {
          if (n.rules.length) {
            item.attenDay.push(n.date)
            item.timeTable = n.rules
          }
        })
      }
      this.ruleData = item
    }
  },
  components: {
    Container,
    RuleDetail,
    AttendanceTable,
    MemberSelect
  },
  mixins: [tableCommon],
}
</script>

<style lang="scss">
.show-rules {
  .rule-list-wrapper {

  }
  .el-tree-select {
    width: 100%;
    .el-select {
      width: 100%!important;
    }
  }
}

</style>
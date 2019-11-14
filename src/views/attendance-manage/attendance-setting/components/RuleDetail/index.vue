<template>
  <div>
    <div>

      <div>
        <el-form size="small" v-model="model">
          <el-form-item label="考勤规则名称" prop="title">
            <el-input style="width: 200px" v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="考勤角色" prop="roleType">
            <el-radio-group v-model="model.roleType">
              <el-radio label="指定学生"></el-radio>
              <el-radio label="指定教师"></el-radio>
              <el-radio label="全校学生"></el-radio>
              <el-radio label="全校教师"></el-radio>
              <el-radio label="全校师生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考勤类型">
            <el-select v-model="model.type">
              <el-option label="固定考勤日期" value="0"></el-option>
              <el-option label="每月灵活时间" value="1"></el-option>
            </el-select>
            <div v-if="model.type === '1'" style="width: 90%;margin: 10px auto">
              <attendance-table v-model="model.ruleDate" />
            </div>
            <div v-if="model.type === '0'" class="soild-attendance">
              考勤日期
              <el-checkbox-group v-model="model.attenDay">
                <el-checkbox label="星期一" key="星期一">星期一</el-checkbox>
                <el-checkbox label="星期二" key="星期二">星期二</el-checkbox>
                <el-checkbox label="星期三" key="星期三">星期三</el-checkbox>
                <el-checkbox label="星期四" key="星期四">星期四</el-checkbox>
                <el-checkbox label="星期五" key="星期五">星期五</el-checkbox>
                <el-checkbox label="星期六" key="星期六">星期六</el-checkbox>
                <el-checkbox label="星期日" key="星期日">星期日</el-checkbox>
              </el-checkbox-group>
              <div class="set-time" v-if="model.timeTable.length === 0">
                <el-button @click="editTime" type="primary">设置时间</el-button>
              </div>
              <div v-else>
                <div class="time-wrap">
                  <div class="time-list" v-for="(item, i) in model.timeTable">
                    <div>第{{i+1}}次</div>
                    <p><img src="@/assets/attendance/in.svg" />{{item.in}}到校</p>
                    <p><img src="@/assets/attendance/out.svg" />{{item.out}}离校</p>
                  </div>
                  <div @click="editTime" class="edit-time">
                    修改
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="特殊考勤日期">
            <div class="edit-special">
              <attendance-table :needDate="true" v-if="model.specDate.length !== 0" v-model="model.specDate" />
              <div>
                <el-button @click="addSpecialTime" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="无需考勤日期">
            <div class="no-attendance-list" v-if="model.skipDate.length">
              <el-tag closable @close="deleteNoTime(i)" style="margin-left:10px;" v-for="(item, i) in model.skipDate" :key="i">{{item}}</el-tag>
            </div>
            <div @click="addNoTime">
              <el-button @click="addNoTime" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
            </div>
            
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="时间设置" :modal-append-to-body='false' :visible.sync="dialogVisible">
     <div>
       <time-setting :date="date" :needDate="needDate" ref="timeSetting" :timeData="timeModel"  />
     </div>
     <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveSetting">保存</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
  <el-dialog :modal-append-to-body='false' title="设置无需考勤日期" :visible.sync="dialogVisible1">
     <div>
       日期:<el-date-picker
        v-model="noDate"
        type="date"
        size="small"
        placeholder="选择日期">
      </el-date-picker>
     </div>
     <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveNoTime">保存</el-button>
      <el-button @click="dialogVisible1 = false">取消</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import AttendanceTable from '../Settings/components/AttendanceTable'
import TimeSetting from '../Settings/components/TimeSetting'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      needDate: false,
      noDate: '',
      date: '',
      model: _.cloneDeep(this.ruleData),
      timeModel: [],
      operation: ''
    }
  },
  props: {
    ruleData: {
      type: Object,
      default: {}
    }
  },
  watch: {
    ruleData(value) {
      this.model = _.cloneDeep(value)
    }
  },
  methods: {
    deleteNoTime(index) {
      this.model.skipDate.splice(index, 1)
    },
    saveSetting() {
      const { operation } = this
      const { date, data } = this.$refs.timeSetting.getData()
      switch(operation) {
        case 'staticSetting':
          this.model.timeTable = data
        break;
        case 'specialSetting':
          this.model.specDate.push({
            date,
            rules: data
          })
      }
      this.clearSetting()
    },
    saveNoTime() {
      this.model.skipDate.push(moment(this.noDate).format('YYYY-MM-DD'))
    },
    addNoTime() {
      this.dialogVisible1 = true
    },
    initEdit({ needDate = false, timeModel, operation }) {
      this.needDate = needDate
      this.timeModel = timeModel
      this.operation = operation
      this.dialogVisible = true
    },
    clearSetting() {
      this.timeModel = []
      this.dialogVisible = false
      this.operation = ''
    },
    editTime() {
      this.initEdit({
        needDate: false,
        timeModel: this.model.timeTable,
        operation: 'staticSetting'
      })
    },
    addSpecialTime() {
      this.initEdit({
        needDate: true,
        timeModel: this.model.specDate,
        operation: 'specialSetting'
      })
    },
    editSpecial() {
      this.dialogVisible = true
      this.needDate = true
    }
  },
  computed: {
    staticCombineData() {
      return _.map(attenDay, n => {
        return {
          date: n,
          rules: this.timeTable
        }
      })
    }
  },
  components: {
    AttendanceTable,
    TimeSetting,
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
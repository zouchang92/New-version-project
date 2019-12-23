<template>
  <div class="growth-achives">
    <div class="growth-title">
      <div class="title-cl">
        <p>班级:</p>
        <el-select v-model="value" placeholder="请选择班级">
          <el-option
            v-for="item in cities"
            :key="item.id"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="title-bn">
        <span>姓名/学号:</span>
        <el-input v-model="input" placeholder="请输入姓名或学号" clearable />
      </div>
      <div style="height:32px;margin-left:23px;margin-top:26px;">
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        <el-button v-show="isShow" type="primary" icon="el-icon-plus" size="small" @click="add">新建</el-button>
        <el-button v-show="isShow" type="warning" icon="el-icon-upload" size="small">导入</el-button>
        <el-button v-show="show" type="success" icon="el-icon-upload" size="small" @click="Stuexport">导出</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small" @click="stu">打印</el-button>
      </div>
    </div>
    <div class="growth-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="学习成绩" name="first">
          <div v-if="activeName==='first'" class="growth-academic">
            <Academic ref="academic" :input="input" :value="value" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="课堂表现" name="second">
          <div v-if="activeName==='second'">
            <Performance ref="performance" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="奖惩处罚" name="third">
          <div v-if="activeName==='third'">
            <RewardPunishment ref="child" :input="input" :value="value" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="任职情况" name="fourth">
          <div v-if="activeName==='fourth'">
            <Serving ref="fourth" />
          </div>
        </el-tab-pane>
        <el-tab-pane name="fifth" label="社团活动情况">
          <div v-if="activeName==='fifth'"><ClubActivities ref="getClubQueryAll" /></div>
        </el-tab-pane>
        <el-tab-pane name="sixth" label="身心健康登记">
          <div v-if="activeName==='sixth'"><Health ref="health" /></div>
        </el-tab-pane>
        <el-tab-pane name="seventh" label="期末评语">
          <div v-if="activeName==='seventh'"><Comment /></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="新建社团活动" :visible.sync="dialogTableVisible1">
      <el-form :model="formas">
        <el-form-item label="姓名" label-width="120">
          <el-input v-model="formas.studentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="社团名称" label-width="120">
          <el-input v-model="formas.clubName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动内容" label-width="120">
          <el-input v-model="formas.activityName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="社团类型" label-width="120">
          <el-input v-model="formas.orgName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参加日期" label-width="120">
          <el-date-picker v-model="formas.activityTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="备注" label-width="120">
          <el-input v-model="formas.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="Submit1()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建任职情况" :visible.sync="dialogTableVisible2">
      <el-form :model="formSer">
        <el-form-item label="姓名" label-width="120" required>
          <el-input v-model="formSer.studentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所在职务" label-width="120" required>
          <el-input v-model="formSer.duty" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工作内容" label-width="120" required>
          <el-input v-model="formSer.dutyContext" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="工作表现"
          label-width="120"
          required
          :rules="{
            required: true, message: '请输入工作表现', trigger: 'blur'
          }"
        >
          <el-input v-model="formSer.dutyComment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开始时间" label-width="120" required>
          <el-date-picker v-model="formSer.startTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="结束时间" label-width="120" required>
          <el-date-picker v-model="formSer.endTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="备注" label-width="120" required>
          <el-input v-model="formSer.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="Submit2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建身心健康" :visible.sync="dialogTableVisible3">
      <el-form :model="formH">
        <el-form-item label="姓名" label-width="120" required>
          <el-input v-model="formH.studentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身高" label-width="120" required>
          <el-input v-model="formH.height" autocomplete="off" />
        </el-form-item>
        <el-form-item label="体重" label-width="120" required>
          <el-input v-model="formH.weight" autocomplete="off" />
        </el-form-item>
        <el-form-item label="视力" label-width="120" required>
          <el-input v-model="formH.sight" autocomplete="off" />
        </el-form-item>
        <el-form-item label="重大疾病" label-width="120" required>
          <el-input v-model="formH.zdjb" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参加日期" label-width="120">
          <el-date-picker v-model="formH.checkTime" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="Submit3()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listStu, stuexport, stuLessonexport, addclub, adduty, addHealth } from '@/api/growthArchivesApi'
import Academic from './components/Academic'
import Performance from './components/Performance'
import RewardPunishment from './components/RewardPunishment'
import Serving from './components/Serving'
import ClubActivities from './components/ClubActivities'
import Health from './components/Healthy'
import Comment from './components/Comment'
// eslint-disable-next-line no-unused-vars
import { async } from 'q'

export default {
  components: {
    Academic,
    Performance,
    RewardPunishment,
    Serving,
    ClubActivities,
    Health,
    Comment
  },
  data() {
    return {
      fn: listStu,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      formLabelWidth: 120,
      cities: [
        {
          label: '三年二班' },
        {
          label: '三年五班' }
      ],
      value: '三年二班',
      input: '张三',
      a: '',
      activeName: 'first',
      isShow: false,
      show: true,
      form: {
        studentNum: '',
        itemName: '',
        level: '',
        score: '',
        createTime: '',
        classType: '',
        place: '',
        classTime: '',
        reason: ''
      },
      formas: {},
      formSer: {},
      formH: {}
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line eqeqeq
      if (tab.index == 3 || tab.index == 4 || tab.index == 5) {
        this.isShow = true
        this.show = false
      } else {
        this.isShow = false
        this.show = true
      }
    },
    search() {
      this.$refs.academic.get()
      this.$refs.child.get()
      this.$refs.getClubQueryAll.getClubQueryAll()
      //  this.$refs.health.getHealth()
    },
    async add() {
      try {
        if (this.activeName === 'fifth') {
          this.dialogTableVisible1 = true
        }
        if (this.activeName === 'fourth') {
          this.dialogTableVisible2 = true
        }
        if (this.activeName === 'sixth') {
          this.dialogTableVisible3 = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async Stuexport() {
      try {
        if (this.activeName === 'first') {
          await stuexport()
        }
        if (this.activeName === 'second') {
          await stuLessonexport()
        }
        if (this.activeName === 'third') {
          console.log(555)
        }
        if (this.activeName === 'fourth') {
          console.log(444)
        }
        if (this.activeName === 'fifth') {
          console.log(333)
        }
        if (this.activeName === 'sixth') {
          console.log(222)
        }
        if (this.activeName === 'seventh') {
          console.log(111)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async stu() {
      try {
        if (this.activeName === 'first') {
          console.log(123)
        }
        if (this.activeName === 'second') {
          console.log(666)
        }
        if (this.activeName === 'third') {
          console.log(555)
        }
        if (this.activeName === 'fourth') {
          console.log(444)
        }
        if (this.activeName === 'fifth') {
          console.log(333)
        }
        if (this.activeName === 'sixth') {
          console.log(222)
        }
        if (this.activeName === 'seventh') {
          console.log(111)
        }
      } catch (err) {
        console.log(err)
      }
    },
    Submit() {
      console.log(this.form)
    },
    async Submit1() {
      try {
        const studentName = JSON.parse(JSON.stringify(this.formas.studentName))
        const clubName = JSON.parse(JSON.stringify(this.formas.clubName))
        const activityName = JSON.parse(JSON.stringify(this.formas.activityName))
        const orgName = JSON.parse(JSON.stringify(this.formas.orgName))
        const activityTime = JSON.parse(JSON.stringify(this.formas.activityTime))
        const description = JSON.parse(JSON.stringify(this.formas.description))
        await addclub({ studentName, clubName, activityName, orgName, activityTime, description })
        this.dialogTableVisible1 = false
        this.$refs.getClubQueryAll.getClubQueryAll()
      } catch (err) {
        console.log(err)
      }
    },
    async Submit2() {
      try {
        const semesterName = '2019年上学期'
        const orgName = '三年级二班'
        const studentNum = '10001'
        const studentName = JSON.parse(JSON.stringify(this.formSer.studentName))
        const duty = JSON.parse(JSON.stringify(this.formSer.duty))
        const dutyContext = JSON.parse(JSON.stringify(this.formSer.dutyContext))
        const dutyComment = JSON.parse(JSON.stringify(this.formSer.dutyComment))
        const startTime = JSON.parse(JSON.stringify(this.formSer.startTime))
        const endTime = JSON.parse(JSON.stringify(this.formSer.endTime))
        const description = JSON.parse(JSON.stringify(this.formSer.description))
        this.dialogTableVisible2 = false
        // eslint-disable-next-line eqeqeq
        await adduty({ semesterName, orgName, studentNum, studentName, duty, dutyComment, dutyContext, startTime, endTime, description })
        this.$refs.fourth.get()
      } catch (err) {
        console.log(err)
      }
    },
    async Submit3() {
      try {
        const semesterName = '2019年上学期'
        const orgName = '三年级二班'
        const studentNum = '10001'
        const studentName = JSON.parse(JSON.stringify(this.formH.studentName))
        const checkTime = JSON.parse(JSON.stringify(this.formH.checkTime))
        const items = [
          { item: '身高',
            itemValue: this.formH.height
          },
          {
            item: '体重',
            itemValue: this.formH.weight
          },
          {
            item: '视力',
            itemValue: this.formH.height
          },
          {
            item: '重大疾病',
            itemValue: this.formH.zdjb
          }
        ]
        this.dialogTableVisible3 = false
        console.log(this.formH)
        console.log(semesterName, orgName, studentNum, studentName, items, checkTime)
        // eslint-disable-next-line eqeqeq
        await addHealth({ semesterName, orgName, studentNum, studentName, items, checkTime })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.growth-achives {
  height: 1200px;
  background: rgb(235,236,243);
  margin-bottom: 30px;
  .growth-title {
    background: #fff;
    height: 84px;
    border-radius: 2px;
    margin: 15px;
    display: flex;
    .title-cl {
      display: flex;
      padding-left: 26px;
      padding-top: 20px;
      p {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
        margin-top: 12px;
      }
    }
    .title-bn {
      margin-left: 36px;
      display: flex;
      span {
        width: 100px;
        height: 16px;
        padding-top: 31px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }
    }
  }
  .growth-content {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    padding-top: 13px;
    margin: 15px;
    .growth-academic {
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      margin-bottom: 30px;
    }
  }
}
</style>
<style>
.title-cl .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 10px;
}
.title-cl .el-input__suffix {
  right: 5px;
  top: 5px;
}
.title-bn .el-input {
  width: 224px;
  margin-left: -22px;
}
.title-bn .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 26px;
}
.growth-content .el-tabs__nav-scroll {
  padding-left: 24px;
  height: 60px;
}
.growth-content .el-tabs__nav-wrap {
  height: 49px;
}
</style>

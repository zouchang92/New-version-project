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
        <el-button v-show="isShow" type="primary" icon="el-icon-upload" size="small" @click="add">新建</el-button>
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
            <Serving />
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
    <el-dialog title="新建奖惩" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.studentNum" autocomplete="off" />
        </el-form-item>
        <el-form-item label="奖励名称" :label-width="formLabelWidth">
          <el-input v-model="form.itemName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="奖励级别" :label-width="formLabelWidth">
          <el-input v-model="form.level" autocomplete="off" />
        </el-form-item>
        <el-form-item label="获奖名次" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off" />
        </el-form-item>
        <el-form-item label="颁奖单位" :label-width="formLabelWidth">
          <el-input v-model="form.createUserId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="奖励照片" :label-width="formLabelWidth">
          <el-input v-model="form.classTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.reason" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Submit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建社团活动" :visible.sync="dialogTableVisible1">
      <el-form :model="formas">
        <el-form-item label="姓名" label-width="120">
          <el-input v-model="formas.studentNum" autocomplete="off" />
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
          <el-input v-model="formas.createTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" label-width="120">
          <el-input v-model="formas.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Submit1()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listStu, stuexport, stuLessonexport, addclub } from '@/api/growthArchivesApi'
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
      dialogTableVisible: false,
      dialogTableVisible1: false,
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
      formas: {
        studentNum: '',
        clubName: '',
        activityName: '',
        orgName: '',
        createUserId: '',
        description: ''
      }
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line eqeqeq
      if (tab.index == 2 || tab.index == 3 || tab.index == 4) {
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
        if (this.activeName === 'third') {
          this.dialogTableVisible = true
        }
        if (this.activeName === 'fifth') {
          this.dialogTableVisible1 = true
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
        const row = JSON.stringify(this.formas)
        const studentNum = JSON.stringify(this.formas.studentNum)
        console.log(studentNum, row)
        await addclub({ studentNum })
        this.$refs.getClubQueryAll.getClubQueryAll()
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

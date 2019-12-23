<template>
  <div class="Comment">
    <el-row :gutter="20">
      <el-col :span="8" style="height:575px;background:#fff">
        <div class="Comment-left" style="padding:15px;">
          <div class="left-title">
            <p class="line" />
            <span style="margin:0px;">选择学年学期</span>
          </div>
          <el-tree
            :data="data"
            :props="defaultProps"
            default-expand-all
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }">
              <i :class="data.icon" />
              <span style="padding-left: 4px;">{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="15" style="margin-left:20px;height:575px;background:#fff">
        <div class="Comment-right" style="margin-top:39px;">
          <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="评价老师" prop="name" style="width: 725px">
              <el-input v-model="ruleForm.commentTeacher" />
            </el-form-item>
            <el-form-item label="评价等级" prop="name" style="width: 725px">
              <el-input v-model="ruleForm.commentLeval" />
            </el-form-item>
            <el-form-item label="老师寄语" prop="desc" style="width: 725px;">
              <el-input v-model="ruleForm.commentOpinion" type="textarea" :autosize="{ minRows: 8, maxRows: 10 }" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button>保存</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { addStuComment } from '@/api/growthArchivesApi'
const menus = [
  {
    menuId: 100,
    menuName: '2019学年',
    icon: 'el-icon-folder-opened',
    children: [
      {
        menuId: 1000,
        menuName: '2019年上学期',
        icon: 'el-icon-tickets'
      },
      {
        menuId: 1001,
        menuName: '2019年下学期',
        icon: 'el-icon-tickets'
      }
    ]
  },
  {
    menuId: 101,
    menuName: '2018学年',
    icon: 'el-icon-folder-opened',
    children: [
      {
        menuId: 1006,
        menuName: '2018年上学期',
        icon: 'el-icon-tickets'
      },
      {
        menuId: 1007,
        menuName: '2018年下学期',
        icon: 'el-icon-tickets'
      }
    ]
  },
  {
    menuId: 201,
    menuName: '2018学年',
    icon: 'el-icon-folder-opened',
    children: [
      {
        menuId: 2006,
        menuName: '2018年上学期',
        icon: 'el-icon-tickets'
      },
      {
        menuId: 2007,
        menuName: '2018年下学期',
        icon: 'el-icon-tickets'
      }
    ]
  }
]
export default {
  data() {
    return {
      obj0: {},
      ruleForm: {},
      a: '',
      data: menus,
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(JSON.stringify(data.menuName))
      this.a = JSON.parse(JSON.stringify(data.menuName))
    },
    handleEmpty() {
      this.$refs.form.resetForm()
    },
    handleSubmit(data) {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.$message.success(JSON.stringify(this.obj0))
        }
        console.log(JSON.stringify(this.obj0))
      })
    },
    async submitForm() {
      try {
        const commentTeacher = JSON.parse(JSON.stringify(this.ruleForm.commentTeacher))
        const commentLeval = JSON.parse(JSON.stringify(this.ruleForm.commentLeval))
        const commentOpinion = JSON.parse(JSON.stringify(this.ruleForm.commentOpinion))
        const semesterName = (this.a)
        console.log(semesterName)
        await addStuComment({ semesterName, commentTeacher, commentLeval, commentOpinion })
      } catch (err) {
        console.log(err)
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.Comment-left {
  .left-title {
    border-bottom: 1px solid hsl(230, 23%, 95%);
    margin-top: -4px;
    padding-bottom: 10px;
    padding-left: 11px;
    span {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
      line-height: 26px;
    }
    .line {
      display: block;
      width: 5px;
      height: 16px;
      background: #018eed;
      position: absolute;
      left: 22px;
      top: 1px;
    }
  }
}
</style>
<style >
.Comment-right .avue-form__menu--center {
  text-align: left;
  padding-left: 30px;
}
</style>

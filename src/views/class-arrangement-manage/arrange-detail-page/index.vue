<template>
  <div style="margin: 15px;" >
    <el-card>
      <el-steps :active="activeStep" align-center>
        <el-step title="排课设置"></el-step>
        <el-step title="规则设置"></el-step>
        <el-step title="预先安排固定课程"></el-step>
        <el-step title="自动排课"></el-step>
      </el-steps>
      <div style=" margin-top: 15px;">
        <class-settings v-if="activeStep === 0" />
        <course-settings v-if="activeStep === 1" />
        <rule-settings v-if="activeStep === 2" />
        <auto-arrange v-if="activeStep === 3" />
      </div>
      <div style="text-align: right;margin-top: 10px">
        <el-button v-if="activeStep !== 0" @click="activeStep-=1" size="small" type="primary">
          上一步
        </el-button>
        <el-button v-if="activeStep !== 3" @click="activeStep+=1" size="small" type="primary">
          下一步
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { AutoArrange, ClassSettings, CourseSettings, RuleSettings } from './pages'
export default {

  data() {
    return {
      activeStep: 0,
    }
  },
  components: {
    AutoArrange, 
    ClassSettings, 
    CourseSettings, 
    RuleSettings
  }
}
</script>

<style lang="less" scoped>

</style>
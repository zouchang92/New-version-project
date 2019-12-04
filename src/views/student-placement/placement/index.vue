<template>
  <div class="student-placement">
    <el-card style="margin: 15px">
      <el-steps :active="activeStep" align-center>
        <el-step title="步骤1" description="上传学生信息"></el-step>
        <el-step title="步骤2" description="设置分班策略"></el-step>
        <el-step title="步骤3" description="自动分班"></el-step>
      </el-steps>
      <div v-show="activeStep === 1" class="">
        <p>1、需要按照指定模板。下载模板，请点击下载。</p>
        <div>2、上传学生信息</div>
        <input @change="onFileChange" type="file" />
      </div>
      <div class="confirm-btn">
        <el-button @click="toNextStep()" size="small" type="primary">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { uploadFiles } from '@/api/systemApi'
import { uploadStudentInfo } from '@/api/studentPlaceMentApi'
export default {
  name: 'placementHome',
  data() {
    return {
      activeStep: 1,
      fileBlob: ''
    }
  },
  methods: {
    onFileChange(e) {
      this.fileBlob = e.target.files[0]
    },
    toNextStep() {
      switch(this.activeStep) {
        case 1:
          this.uploadStudentInfo()
        break;
        case 2: 
        break;
        case 3:
        break
      }
    },
    async uploadStudentInfo() {
      let formData = new FormData()
      console.log(this.fileBlob)
      formData.append('file', this.fileBlob)
      console.log(formData)
      try {
        let filePath = await uploadFiles(formData)
      } catch(err) {

      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .student-placement {
    .confirm-btn {
      text-align: center;
    }
  }
</style>
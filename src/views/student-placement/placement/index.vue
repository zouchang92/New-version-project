<template>
  <div style="margin: 15px" class="student-placement">
    <el-card>
      <el-steps :active="activeStep" align-center>
        <el-step title="步骤1" description="上传学生信息"></el-step>
        <el-step title="步骤2" description="设置分班策略"></el-step>
        <el-step title="步骤3" description="自动分班"></el-step>
      </el-steps>
    </el-card>
    <el-card style="margin-top: 15px">
      <div v-show="activeStep === 1" class="">
        <p>1、需要按照指定模板。下载模板，请点击下载。</p>
        <div>2、上传学生信息</div>
        <input @change="onFileChange" type="file" />
      </div>
      <div v-show="activeStep === 2" class="">
        <el-form style="width: 400px;margin: auto" size="small" ref="form" :model="form" label-width="120px">
          <el-form-item label="年级" prop="orgId" :rules="[
            { required: true, message: '年级不能为空'},
          ]">
            <el-tree-select v-model="form.orgId" :treeParams="treeParams" />
          </el-form-item>
          <el-form-item label="班级总数" prop="classQty" :rules="[
            { required: true, message: '班级总数不能为空'},
            { type: 'number', message: '班级总数必须为数字值'}
          ]">
            <el-input type='number' v-model.number="form.classQty" />
          </el-form-item>
          <el-form-item prop="avgSex" label="男女均衡">
            <el-switch
              v-model="form.avgSex"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item prop="avgScore" label="成绩均衡">
            <el-switch
              v-model="form.avgScore"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item prop="avgLiveInDorm" label="走读住读均衡">
            <el-switch
              v-model="form.avgLiveInDorm"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item prop="isSetClass" label="预设班级">
            <el-switch
              v-model="form.isSetClass"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="activeStep === 3" class="">
        <el-alert
          title="分班成功"
          type="success"
          description=""
          style="margin-bottom: 15px;"
          show-icon>
        </el-alert>
      </div>
      <div class="confirm-btn">
        <el-button :loading="nextLoading" @click="toNextStep()" size="small" type="primary">{{activeStep === 3 ? '查看结果' : '下一步'}}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { uploadStudentInfo, autoSetClass } from '@/api/studentPlaceMentApi'
import { getOrgan } from '@/utils'
export default {
  name: 'placementHome',
  data() {
    return {
      activeStep: 1,
      fileBlob: '',
      nextLoading: false,
      form: {
        orgId: '',
        classQty: '',
        avgScore: 0,
        avgSex: 0,
        avgLiveInDorm: 0,
        isSetClass: 0,
      },
      excelData: {
        data: [],
        path: ''
      },
      treeParams: {
        data: getOrgan(),
        props: {
          label: 'orgName',
          value: 'id',
        },
      }
    }
  },
  methods: {
    onFileChange(e) {
      this.fileBlob = e.target.files[0]
    },
    toNextStep() {
      this.nextLoading = true
      switch(this.activeStep) {
        case 1:
          this.uploadStudentInfo().then(res => {
            this.nextLoading = false
            this.activeStep += 1
          })
        break;
        case 2: 
          this.submitPlacementData().then(res => {
            this.nextLoading = false
            this.activeStep += 1
          })
        break;
        case 3:
          this.navigateToResult()
        break
      }
    },
    navigateToResult() {
      this.$router.push({
        name: 'placementResult'
      })
    },
    async submitPlacementData() {
      try {
        let res = await autoSetClass({
          ...this.form,
          excelPath: this.excelData.path
        })
        return true
      } catch(err) {
        console.log(err)
      }
    },
    async uploadStudentInfo() {
      if (!this.fileBlob) {
        this.nextLoading = false
        throw new Error()
      }
      let formData = new FormData()
      formData.append('file', this.fileBlob)
      this.nextLoading = true
      try {
        let result = await uploadStudentInfo(formData)
        this.excelData = {
          data: result.data,
          path: result.excelPath
        }
        return true
      } catch(err) {
        this.nextLoading = false
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
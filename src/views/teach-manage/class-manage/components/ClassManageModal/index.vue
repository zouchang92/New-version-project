<template>
<div>
  <el-dialog @close="handleClose" :visible="value.modalVisible">
    <el-form label-width="100px" :model="form" size="medium">
      <el-form-item label="所属班级">
        <el-cascader
          v-model="value.formValue.classId"
          :options="organData"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="所在教室">
        <el-input
          v-model="value.formValue.classRoomId"
          ></el-input>
      </el-form-item>
      <el-form-item label="班级logo">
        <el-upload
          action="`${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`"
          :file-list="value.formValue.classlogo"
          list-type="picture-card"
          :limit="1"
          ><i class="el-icon-plus"></i></el-upload>
      </el-form-item>
      <el-form-item label="班级口号">
        <el-input
          v-model="value.formValue.classMotto"
          ></el-input>
        </el-form-item>
        <el-form-item class="add-duty-person" label="班级负责人">
          <span></span>
          <i @click="showTeacherModal" class="el-icon-plus"></i>
        </el-form-item>
        <el-form-item class="add-duty-person" label="班级任课老师">
          <span></span>
          <i @click="showTeacherModal" class="el-icon-plus"></i>
        </el-form-item>
      </el-form>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
  <member-select v-model="teacherSelect.visible" />
</div>
</template>

<script>
import { getOrgan } from '@/utils'
import MemberSelect from '@/components/MemberSelect'
export default {
  props: ['value'],
  data() {
    return {
      organData: getOrgan(),
      form: {
        
      },
      teacherSelect: {
        visible: false,
        teacherInfo: []
      }
    }
  },
  components: {
    MemberSelect
  },
  methods: {
    showTeacherModal() {
      this.teacherSelect.visible = true
    },
    handleClose() {
      this.$emit('input', {
        ...this.value,
        modalVisible: false
      })
    },
    handleSave() {
      this.handleClose()
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
.add-duty-person .el-icon-plus {
  
}
</style>
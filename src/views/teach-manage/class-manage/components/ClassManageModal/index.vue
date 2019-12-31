<template>
<div>
  <el-dialog @close="handleClose" :visible="value">
    <el-form :rules="rules" ref="ruleForm" label-width="110px" :model="info" size="medium">
      <el-form-item label="班级名称" prop="orgName">
        <el-input v-model="info.orgName"/>
      </el-form-item>
      <el-form-item label="所属年级" prop="parentId">
          <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="organData" v-model="info.parentId"/>
      </el-form-item>
      <el-form-item label="所在教室" prop="classroomId">
        <el-select
          v-model="info.classroomId"
          >
          <el-option v-for="(item, i) in classRoomInfo" :value="item.id" :key="item.id" :label="item.roomNo" />
          </el-select>
      </el-form-item>
      <el-form-item label="班级logo" prop="logo">
        <el-upload
          :action="`${baseUrl}/zhxyx/upload/publicUpload`"
          :file-list="info.logo"
          list-type="picture-card"
          :limit="1"
          ><i class="el-icon-plus"></i></el-upload>
      </el-form-item>
      <el-form-item label="班级口号" prop="motto">
        <el-input
          v-model="info.motto"
          ></el-input>
        </el-form-item>
        <el-form-item class="add-duty-person" prop="orgLeaders" label="班级负责人">
          <div v-if="info && info.orgLeaders.length">
            <el-tag style="margin-right: 5px;" v-for="(item, i) in info.orgLeaders" >{{item.userName || '未知'}}</el-tag>
          </div>
          <i @click="showTeacherModal('duty')" class="el-icon-plus"></i>
        </el-form-item>
        <el-form-item class="add-duty-person" prop="orgTeachers" label="班级任课老师">
          <div v-if="info && info.orgTeachers.length">
            <el-tag style="margin-right: 5px;" v-for="(item, i) in info.orgTeachers" >{{item.userName || '未知'}}</el-tag>
          </div>
          <i @click="showTeacherModal('teacher')" class="el-icon-plus"></i>
        </el-form-item>
      </el-form>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
      <el-button size="medium" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
  <member-select @save="saveTeacher" :memberSelected="teacherSelect.selected" v-model="teacherSelect.visible" />
</div>
</template>

<script>
import { getOrgan, getDictById } from '@/utils'
import MemberSelect from '@/components/MemberSelect'
import { querySthClassroom } from '@/api/schClassroomApi'
import _ from 'lodash'

export default {
  props: ['classInfo', 'value'],
  data() {
    return {
      info: _.cloneDeep(this.classInfo),
      organData: getOrgan(),
      rules: {
        orgName: [{
          required: true,
          message: '班级名称是必填项'
        }],
        parentId: [{
          required: true,
          message: '所属年级是必填项'
        }],
        classroomId: [{
          required: true,
          message: '所在教室是必填项'
        }],
        orgLeaders: [{
          type: 'array',
          required: true,
          message: '负责人是必填项'
        }],
        orgTeachers: [{
          type: 'array',
          required: true,
          message: '任课老师是必填项'
        }]
      },
      treeParams: {
        props: {
          label: 'orgName',
          value: 'id',
        },
        data: getOrgan()
      },
      teacherSelect: {
        mode: '',
        visible: false,
        selected: [],
      },
      classRoomInfo: [],
      baseUrl: process.env.VUE_APP_BASE_API,
    }
  },
  components: {
    MemberSelect
  },
  mounted() {
    querySthClassroom({
      page: 1,
      rows: 10000
    }).then(res => {
      this.classRoomInfo = res.data.list
    })
  },
  watch: {
    classInfo(val) {
      this.info = _.cloneDeep(val)
    }
  },
  methods: {
    saveTeacher(data) {
      const key = (this.teacherSelect.mode === 'teacher') ? 'orgTeachers' : 'orgLeaders'
      this.info = {
        ...this.info,
        [key]: data.data.map(n => {
          return {
            userName: n.label,
            userId: n.value
          }
        })
      }
    },
    showTeacherModal(mode) {
      const key = (mode === 'teacher') ? 'orgTeachers' : 'orgLeaders'
      this.teacherSelect = {
        ...this.teacherSelect,
        mode,
        visible: true,
        selected: this.info[key].map(n => ({
          label: n.userName,
          value: n.userId
        }))
      }
    },
    handleClose() {
      this.$emit('input', false)
    },
    handleSave() {
      this.$refs.ruleForm.validate((success, param) => {
        if (success) {
          this.$emit('submit', this.info)
        }
      })
      
    }
  }
}
</script>

<style scoped>
.add-duty-person .el-icon-plus {
  
}
</style>
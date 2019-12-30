<template>
<div>
  <el-dialog @close="handleClose" :visible="value">
    <el-form label-width="100px" :model="form" size="medium">
      <el-form-item label="所属年级">
          <el-tree-select ref="treeSelect" :treeParams="treeParams" :data="organData" v-model="info.parentId"/>
      </el-form-item>
      <el-form-item label="所在教室">
        <el-select
          v-model="info.classRoomId"
          >
          <el-option v-for="(item, i) in classRoomInfo" :value="item.id" :key="item.id" :label="item.roomNo" />
          </el-select>
      </el-form-item>
      <el-form-item label="班级logo">
        <el-upload
          :action="`${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`"
          :file-list="info.classlogo"
          list-type="picture-card"
          :limit="1"
          ><i class="el-icon-plus"></i></el-upload>
      </el-form-item>
      <el-form-item label="班级口号">
        <el-input
          v-model="info.classMotto"
          ></el-input>
        </el-form-item>
        <el-form-item class="add-duty-person" label="班级负责人">
          <div v-if="info && info.orgLeaders.length">
            <el-tag v-for="(item, i) in info.orgLeaders" >{{item.userName}}</el-tag>
          </div>
          <i @click="showTeacherModal('duty')" class="el-icon-plus"></i>
        </el-form-item>
        <el-form-item class="add-duty-person" label="班级任课老师">
          <div v-if="info && info.orgTeachers.length">
            <el-tag v-for="(item, i) in info.orgTeachers" >{{item.userName}}</el-tag>
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
      form: {
        
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
      classRoomInfo: []
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
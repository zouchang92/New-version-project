<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          v-model="obj"
          :permission="permission"
          row-key="id"
          :table-loading="tableListLoading"
          :page="page"
          :data="tableList"
          :option="option"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
        >
          <template slot="searchMenu">
            <el-button v-if="permission.addBtn" type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
            <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button type="text" icon="el-icon-user" size="small" @click="setTeacher(scope)">设置任课老师</el-button>
          </template>
        </avue-crud>
      </div>
    </div>
    <member-select v-model="teacherModal.visible" :member-selected="teacherModal.selectedTeacher" search-type="teacher" @save="setCourseTeacher" />
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import MemberSelect from '@/components/MemberSelect'
import { queryCourses, addCourse, updateCourse, deleteCourse, deleteCourses, queryTeacherByCourseId, insertCourseTeacher } from '@/api/courseManageApi'
export default {
  name: 'TeacherManage',
  components: {
    MemberSelect
  },
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      teacherModal: {
        visible: false,
        loading: false,
        selectedTeacher: [],
        scope: {}
      },
      fn: queryCourses,
      delFn: deleteCourses,
      singleDelFn: deleteCourse,
      data: [],
      option: {

        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '科目名称',
            prop: 'name',
            rules: {
              required: true,
              message: '科目名称是必填项'
            },
            search: true,
            span: 24
          },
          {
            label: '科目代码',
            prop: 'code',
            rules: {
              required: true,
              message: '科目代码是必填项'
            },
            search: true,
            span: 24
          }
        ]
      },
      obj: {}
    }
  },
  methods: {
    async setCourseTeacher(data) {
      try {
        const res = await insertCourseTeacher({
          courseId: this.teacherModal.scope.id,
          teacherIds: data.value
        })
        this.$message.success('设置成功')
        this.teacherModal = {
          ...this.teacherModal,
          selectedTeacher: []
        }
      // eslint-disable-next-line no-empty
      } catch (err) {

      }
    },
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async setTeacher(data) {
      this.teacherModal = {
        ...this.teacherModal,
        visible: true,
        loading: true,
        scope: data.row
      }
      try {
        const res = await queryTeacherByCourseId({
          courseId: data.row.id,
          page: 1,
          rows: 10000
        })
        this.teacherModal.selectedTeacher = res.data.list.map(n => {
          return {
            value: n.teacherId,
            label: n.teacherName
          }
        })
      } catch (err) {

      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await updateCourse(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        const result = await addCourse(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    }
  }
}
</script>

<style scoped>

</style>

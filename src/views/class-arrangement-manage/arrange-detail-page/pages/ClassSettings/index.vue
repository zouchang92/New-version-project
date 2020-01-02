<template>
  <div>
    <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="{}" :data="tableList" :option="option" v-model="obj">
      <template slot="orgTeacher" slot-scope="scope">
        <div v-if="scope.row.orgTeacher && scope.row.orgTeacher.length">
          {{scope.row.orgTeacher.map(n => n.userName).join(',')}}
        </div>
        <div v-else>
          <p style="color: red">未设置</p>
        </div>
      </template>
      <template slot="orgLeader" slot-scope="scope">
        <div v-if="scope.row.orgLeader && scope.row.orgLeader.length">
          {{scope.row.orgLeader.map(n => n.userName).join(',')}}
        </div>
        <div v-else>
          <p style="color: red">未设置</p>
        </div>
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button @click="editCell(scope)" v-if="!scope.row.orgLeader.length || !scope.row.orgTeacher.length" type="text">设置</el-button>
      </template>
    </avue-crud>
    <class-manage-modal @submit="formSubmit" v-model="modalParam.modalVisible" :classInfo="modalParam.formValue" />
  </div>
</template>

<script>
import { queryOrgClass } from '@/api/classPlanManageApi'
import { updatePerson } from '@/api/classManageApi'
import tableCommon from '@/mixins/table-common'
import { getOrgan } from '@/utils'
import ClassManageModal from './components/ClassManageModal'
export default {
  mixins: [tableCommon],
  data() {
    return {
      permission: {
        addRowBtn: false,
        editBtn: false,
        viewBtn: false,
        delBtn: false
      },
      obj: {

      },
      modalParam: {
        modalVisible: false,
        formValue: {
          id: '',
          orgLeaders: [],
          orgTeachers: [],
        }
      },
      searchForm: {
        orgId: this.$route.query.orgId
      },
      fn: queryOrgClass,
      initLoad: false,
      option: {
        column: [{
          label: '所属机构',
          prop: 'orgId',
          type: 'tree',
          dicData: getOrgan(),
          props: {
            label: 'orgName',
            value: 'id'
          },
          searchSpan: 8,
          span: 24,
          rules: {
            required: true,
            message: '所属机构是必填项'
          }
        }, {
          label: '任课教师',
          prop: 'orgTeacher',
          span: 24,
          slot: true
        }, {
          label: '班级负责人',
          prop: 'orgLeader',
          span: 24,
          slot: true
        }]
      }
    }
  },
  mounted() {
    this.searchForm = {
      ...this.searchForm,
      orgId: this.$route.query.orgId
    }
    
    this.initList()
  },
  methods: {
    editCell(scope) {
      this.modalParam = {
        ...this.modalParam,
        modalVisible: true,
        formValue: {
          ...this.modalParam.formValue,
          ...scope.row,
        }
      }
    },
    async formSubmit(data) {
      data.leaderDtos = data.orgLeaders.map(n => ({
        teacherId: n.userId,
        dutyType: "1"
      }))
      data.schOrgTeacherDTOList = data.orgTeachers.map(n => ({
        teacherId: n.userId,
        dutyType: "2"
      }))
      data.id = data.orgId
      try {
        let res = await updatePerson(data)
        this.$message.success('设置成功')
        await this.initList()
      } catch(err) {

      }
    }
  },
  components: {
    ClassManageModal
  }
}
</script>

<style lang="less">

</style>
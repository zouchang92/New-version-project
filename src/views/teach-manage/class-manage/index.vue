<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="true" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button type="text" icon="el-icon-search" size="small">查看</el-button>
              <el-button type="text" icon="el-icon-edit" size="small">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" size="small">删除</el-button>
            </template>
          </avue-crud>
      </div>
      <class-manage-modal @submit="formSubmit" v-model="modalParam" />
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import { queryClassList, addClass, editClass } from '@/api/classManageApi'
import ClassManageModal from './components/ClassManageModal'
import permission from '@/mixins/permission'
export default {
  name: 'classManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      modalParam: {
        modalVisible: false,
        formValue: {
          classId: '',
          classRoomId: '',
          classlogo: [{
            name: '111',
            url: 'http://1.jpg'
          }],
          classMotto: '111'
        }
      },
      fn: queryClassList,
      data: [],
      option: {
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'班级',
            prop:'classroomId',
            rules: {
              required: false,
            },
            width: 200,
            search: true
          },
          {
            label: '负责人',
            prop:'dutyPeople',
            rules: {
              required: false,
            },
            width: 200,
          },
          {
            label: '任课老师',
            prop:'dutyTeacher',
            rules: {
              required: false,
            },
            width: 200,
          },
          {
            label: '所在教室',
            prop: 'belongclassRoom',
            rules: {
              required: false,
            },
            width: 200
          },
          {
            label: '班级logo',
            prop: 'logo',
            rules: {
              required: false,
            },
            type: 'upload',
            width: 200
          }
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.showModal()
    },
    showModal() {
      this.modalParam.modalVisible = true
    },
    formSubmit() {
      console.log(this.modalParam.formValue)
    },
    uploadBefore(file, done) {
      alert(1)
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let result = await addrole(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await addrole(row)
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
      
    },
  },
  components: {
    ClassManageModal
  }
}
</script>

<style scoped>

</style>
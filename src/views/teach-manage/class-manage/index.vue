<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="false" :data="tableList" :option="option" v-model="obj">
            <template slot="orgLeaders" slot-scope="scope">
              <div v-if="scope.row.orgLeaders.length">
                <el-tag style="margin-right: 5px;" v-for="(item, i) in scope.row.orgLeaders" :key="i">{{item.userName || '未知'}}</el-tag>
              </div>

            </template>
            <template slot="orgTeachers" slot-scope="scope">
              <div v-if="scope.row.orgTeachers.length">
                <el-tag v-for="(item, i) in scope.row.orgTeachers" :key="i" style="margin-right: 5px;">{{item.userName || '未知'}}</el-tag>
              </div>
            </template>
            <template slot="searchMenu">
              <el-button v-if="false" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" @click="initList()" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
            <template slot-scope="scope" slot="menu">
              <div>
                 <el-button v-if="permission.viewBtn" type="text" icon="el-icon-search" size="small">查看</el-button>
                 <el-button v-if="permission.editBtn" @click="editCell(scope)" type="text" icon="el-icon-edit" size="small">编辑</el-button>
                 <el-button @click="singleDel(scope.row)" v-if="permission.delBtn" type="text" icon="el-icon-delete" size="small">删除</el-button>
              </div>
            </template>
          </avue-crud>
      </div>
      <class-manage-modal @submit="formSubmit" v-model="modalParam.modalVisible" :classInfo="modalParam.formValue" />
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryClassList, addClass, updateClass, deleteClass } from '@/api/classManageApi'
import ClassManageModal from './components/ClassManageModal'
import { getOrgan } from '@/utils'
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
          id: '',
          orgName: '',
          parentId: '',
          classRoomId: '',
          logo: [],
          orgLeaders: [],
          orgTeachers: [],
          motto: ''
        }
      },
      fn: queryClassList,
      singleDelFn: deleteClass,
      data: [],
      option: {
        viewBtn: false,
        editBtn: false,
        delBtn: false,
        treeProps: {
          children: 'child'
        },
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'班级名称',
            prop:'orgName',
            rules: [{
              required: false,
            }],
            width: 200,
            search: true
          },
          {
            label:'所属年级',
            prop:'parentId',
            type: 'tree',
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            width: 200,
            search: true
          },
          {
            label: '负责人',
            prop:'orgLeaders',
            rules: [{
              required: false,
            }],
            width: 200,
            slot: true
          },
          {
            label: '任课老师',
            prop:'orgTeachers',
            rules: [{
              required: false,
            }],
            slot: true
          },
          {
            label: '备注',
            prop: 'description',
            type: 'text',
            width: 200
          }
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.modalParam.formValue = this.$options.data().modalParam.formValue
      this.showModal()
    },
    showModal() {
      this.modalParam = this.$data.modalParam
      this.modalParam.modalVisible = true
    },
    editCell(scope) {
      this.modalParam = {
        ...this.modalParam,
        modalVisible: true,
        formValue: {
          ...this.modalParam.formValue,
          ...scope.row,
          logo: [{url: scope.row.logo}]
        }
      }
    },
    async formSubmit(data) {
      try {
        let leaderDtos = data.orgTeachers.map(n => ({
          teacherId: n.userId,
          dutyType: "1"
        }))
        let schOrgTeacherDTOList = data.orgLeaders.map(n => ({
          teacherId: n.userId,
          dutyType: "2"
        }))
        if (!data.id) {
          await addClass({
            ...data,
            leaderDtos,
            logo: data.logo ? '' : data.logo[0].url,
            schOrgTeacherDTOList
          })
          this.$message.success('添加成功')
        } else {
          await updateClass({
            ...data,
            leaderDtos,
            logo: data.logo ? '' : data.logo[0].url,
            schOrgTeacherDTOList
          })
          this.$message.success('修改成功')
        }
        this.modalParam.modalVisible = false
        await this.initList()
      } catch(err) {
        console.log(err)
      }
      
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
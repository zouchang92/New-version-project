<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { getOrgan, getDictById } from '@/utils'
import permission from '@/mixins/permission'
import { queryTeacher, addTeacher, updateTeacher, deleteTeacher, deleteTeachers } from '@/api/teacherManageApi'
const genderDict = getDictById('gender')
export default {
  name: 'teacherManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      fn: queryTeacher,
      delFn: deleteTeachers,
      singleDelFn: deleteTeacher,
      data: [],
      option: {
        
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'姓名',
            prop:'userName',
            rules: {
              required: true,
            },
            search: true,
            span: 12,
          },
          {
            label: '性别',
            prop: 'gender',
            span: 12,
            type: 'radio',
            rules: {
              required: true,
              message: '性别是必填项'
            },
            dicData: genderDict
          },
          {
            label:'所属机构',
            prop:'organId',
            rules: {
              required: true,
              message: '所属机构'
            },
            type: 'tree',
            search: true,
            span: 12,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
          },
          {
            label: "进校时间",
            prop: "entryTime",
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            width: 150,
            rules: {
              required: true,
              message: '进校时间为必填项'
            }
          },
          {
            label: '职务',
            prop: 'duties',
            rules: {
              required: true,
              message: '职务为必填项'
            }
          },
          {
            label: '职称',
            prop: 'titles',
            rules: {
              required: true,
              message: '职称为必填项'
            }
          },
          {
            label:'照片',
            prop:'facePicFile',
            type: 'upload',
            listType: 'picture-card',
            span: 24,
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            propsHttp: {
              res: '0'
            },
            limit: 1,
          },
          {
            label:'在校状态',
            prop:'curStatus',
            rules: {
              required: false,
            },
            search: true,
            span: 12,
            type: 'select',
            hide: true
          },
          
          {
            label: "证件类型",
            prop: "credType",
            type: 'select',
            hide: true
          },
          {
            label: "证件号码",
            prop: "credNum",
            hide: true
          },
          {
            label: "证件正面",
            prop: "credPhotoObve",
            type: 'upload',
            listType: 'picture-card',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            span: 24,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            hide: true
          },
          {
            label: "证件反面",
            prop: "credPhotoRever",
            type: 'upload',
            listType: 'picture-card',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            limit: 1,
            span: 24,
            propsHttp: {
              res: '0'
            },
            hide: true
          },
          {
            label: "籍贯",
            prop: "nativeLand",
            type: "select",
            hide: true
          },
          {
            label: "民族",
            prop: "volk",
            type: "select",
            hide: true
          },
          {
            label: "政治面貌",
            prop: "politstatus",
            type: "select",
            hide: true
          },
          {
            label: "家庭住址",
            prop: "homeAddr",
            hide: true
          },
          {
            label: "健康状况",
            prop: "health",
            hide: true
          },
          {
            label: "参加工作时间",
            prop: "inworkDate",
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            width: 150,
            hide: true
          },
          {
            label: "毕业院校",
            prop: "academy",
            hide: true
          },
          {
            label: '最高学历',
            prop: 'education',
            hide: true
          },
        ]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
      row.credPhotoRever = row.credPhotoRever&&row.credPhotoRever.length ? row.credPhotoRever[0].value : ''
      row.credPhotoObve = row.credPhotoRever&&row.credPhotoObve.length ? row.credPhotoObve[0].value : ''
      loading(true)
      try {
        let result = await updateTeacher(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      row.facePicFile = row.facePicFile.length ? row.facePicFile[0].value : ''
      row.credPhotoRever = row.credPhotoRever.length ? row.credPhotoRever[0].value : ''
      row.credPhotoObve = row.credPhotoObve.length ? row.credPhotoObve[0].value : ''
      console.log(row)
      loading(true)
      try {
        let result = await addTeacher(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
      
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { getOrgan } from '@/utils'
import { queryTeacher, addTeacher, updateTeacher, deleteTeacher, deleteTeachers } from '@/api/teacherManageApi'
export default {
  name: 'teacherManage',
  mixins: [tableCommon],
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
            label:'所属机构',
            prop:'organId',
            rules: {
              required: true,
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
            label:'在校状态',
            prop:'curStatus',
            rules: {
              required: false,
            },
            search: true,
            span: 12,
            type: 'select'
          },
          {
            label:'照片',
            prop:'facePicFile',
            type: 'upload',
            listType: 'picture-card',
            span: 24,
            action: "http://192.168.1.125:8998/zhxyx/upload/file",
            propsHttp: {
              res: '0'
            },
            limit: 1,
          },
          {
            label: "证件类型",
            prop: "credType",
            type: 'select',
          },
          {
            label: "证件号码",
            prop: "credNum",
          },
          {
            label: "证件正面",
            prop: "credPhotoObve",
            type: 'upload',
            listType: 'picture-card',
            action: "http://192.168.1.125:8998/zhxyx/upload/file",
            span: 24,
            limit: 1,
            propsHttp: {
              res: '0'
            },
          },
          {
            label: "证件反面",
            prop: "credPhotoRever",
            type: 'upload',
            listType: 'picture-card',
            action: "http://192.168.1.125:8998/zhxyx/upload/file",
            limit: 1,
            span: 24,
            propsHttp: {
              res: '0'
            },
          },
          {
            label: "籍贯",
            prop: "nativeLand",
            type: "select"
          },
          {
            label: "民族",
            prop: "volk",
            type: "select"
          },
          {
            label: "政治面貌",
            prop: "politstatus",
            type: "select"
          },
          {
            label: "家庭住址",
            prop: "homeAddr",
          },
          {
            label: "健康状况",
            prop: "health",
          },
          {
            label: "参加工作时间",
            prop: "inworkDate",
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            width: 150
          },
          {
            label: "进校时间",
            prop: "entryTime",
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            width: 150
          },
          {
            label: "毕业院校",
            prop: "academy",
          },
          {
            label: '最高学历',
            prop: 'education'
          },
          {
            label: '最高学历',
            prop: 'duties'
          },
          {
            label: '职务',
            prop: 'titles'
          }
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
    async rowUpdate(row, done, loading) {
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
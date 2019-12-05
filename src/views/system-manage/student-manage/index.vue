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
import { queryStudent, addStudent, delStudent, delStudents, updateStudent } from '@/api/studentManageApi'
import { getOrgan, getDictById } from '@/utils'
const genderDict = getDictById('gender')
const curStatusDict = getDictById('curStatus')
export default {
  name: 'studentManage',
  mixins: [tableCommon],
  data() {
    return {
      searchForm: {

      },
      fn: queryStudent,
      delFn: delStudents,
      singleDelFn: delStudent,
      data: [],
      option: {
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: '所在班级',
            prop: 'organId',
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            rules: {
              required: true,
              message: '所在班级是必填项'
            },
            searchSpan: 8,
          },
          {
            label: '姓名',
            prop: 'userName',
            rules: {
              required: true,
              message: '姓名是必填项'
            },
          },
          {
            label: '学号',
            prop: 'loginName',
            width: 150,
            rules: {
              required: true,
              message: '学号是必填项'
            },
          },
          {
            label: '性别',
            prop: 'gender',
            type: 'radio',
            dicData: genderDict,
            rules: {
              required: true,
              message: '性别是必填项'
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
            type: 'select',
            dicData: curStatusDict,
            rules: {
              required: true,
              message: '在校状态是必填项'
            },
          },
          {
            label:'全国学籍号',
            prop:'nationNum',
            rules: {
              required: false,
            },
            width: 200,
            hide: true
          },
          {
            label:'入学时间',
            prop:'initDtm',
            type: 'datetime',
            hide: true
          },
          {
            label:'入学序号',
            prop:'initNum',
            hide: true
          },
          {
            label:'监护人姓名',
            prop:'guarder',
            width: 150,
            hide: true
          },
          {
            label:'监护人关系',
            prop:'guarderRelation',
            type: 'select',
            width: 150,
            hide: true
          },
          {
            label:'监护人电话',
            prop:'guarderTel',
            width: 150,
            hide: true
          },
          {
            label:'入学信息备注',
            prop:'inMemo',
            width: 150,
            hide: true
          },
          {
            label:'照片',
            prop:'facePicFile',
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 24,
          },
          {
            label: "证件类型",
            prop: "credType",
            type: 'select',
            width: 150,
            hide: true
          },
          {
            label: "证件号码",
            prop: "credNum",
            width: 200,
            hide: true
          },
          {
            label: "证件正面",
            prop: "credPhotoObve",
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            limit: 1,
            propsHttp: {
              res: '0',
            },
            listType: 'picture-card',
            span: 24,
            hide: true
          },
          {
            label: "证件反面",
            prop: "credPhotoRever",
            type: 'upload',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
            propsHttp: {
              res: '0',
            },
            listType: 'picture-card',
            span: 24,
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
            label: "来源",
            prop: "comefromType",
            hide: true
          },
          {
            label: "录取分数",
            prop: "score",
            hide: true
          },
          {
            label: "插班标注",
            prop: "inClassType",
            hide: true
          },
          {
            label: "生源类别",
            prop: "stuType",
            hide: true
          },
          {
            label: "就读方式",
            prop: "schoolType",
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
      loading(true)
      row.credPhotoObve.length ? row.credPhotoObve = row.credPhotoObve[0].value : row.credPhotoObve = ''
      row.credPhotoRever.length ? row.credPhotoRever = row.credPhotoRever[0].value : row.credPhotoRever = ''
      row.facePicFile.length ? row.facePicFile = row.facePicFile[0].value : row.facePicFile = ''
      try {
        let result = await updateStudent(row)
        await this.resetList()
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      row.credPhotoObve.length ? row.credPhotoObve = row.credPhotoObve[0].value : row.credPhotoObve = ''
      row.credPhotoRever.length ? row.credPhotoRever = row.credPhotoRever[0].value : row.credPhotoRever = ''
      row.facePicFile.length ? row.facePicFile = row.facePicFile[0].value : row.facePicFile = ''
      try {
        let result = await addStudent(row)
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
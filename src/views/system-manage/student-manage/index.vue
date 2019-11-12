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
import { queryStudent, addStudent, delStudent, delStudents } from '@/api/studentManageApi'
import { getOrgan } from '@/utils'
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
            editDisplay: false
          },
          {
            label: '所在班级',
            prop: 'orgId',
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            searchSpan: 8,
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
            type: 'datetime'
          },
          {
            label:'入学序号',
            prop:'initNum'
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
            label:'监护人姓名',
            prop:'guarder',
            width: 150
          },
          {
            label:'监护人关系',
            prop:'guarderRelation',
            type: 'select',
            width: 150
          },
          {
            label:'监护人电话',
            prop:'guarderTel',
            width: 150
          },
          {
            label:'入学信息备注',
            prop:'inMemo',
            width: 150
          },
          {
            label:'照片',
            prop:'facePicFile',
            type: 'upload',
            action: "http://192.168.1.125:8999/zhxyx/upload/file",
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
            width: 150
          },
          {
            label: "证件号码",
            prop: "credNum",
            width: 200
          },
          {
            label: "证件正面",
            prop: "credPhotoObve",
            type: 'upload',
            action: "http://192.168.1.125:8999/zhxyx/upload/file",
            limit: 1,
            propsHttp: {
              res: '0',
            },
            listType: 'picture-card',
            span: 24,
          },
          {
            label: "证件反面",
            prop: "credPhotoRever",
            type: 'upload',
            action: "http://192.168.1.125:8999/zhxyx/upload/file",
            propsHttp: {
              res: '0',
            },
            listType: 'picture-card',
            span: 24,
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
            label: "来源",
            prop: "comefromType",
          },
          {
            label: "录取分数",
            prop: "score",
          },
          {
            label: "插班标注",
            prop: "inClassType",
          },
          {
            label: "生源类别",
            prop: "stuType",
          },
          {
            label: "就读方式",
            prop: "schoolType",
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
    uploadBefore(file, done) {
      alert(1)
    },
    rowUpdate(row, done, loading) {
      console.log(row)
    },
    async rowSave(row, done, loading) {
      loading(true)
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
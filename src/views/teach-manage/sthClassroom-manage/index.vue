<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="resetList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { getDictById } from '@/utils'
import { querySthClassroom, insertSthClassroom, updateSthClassroom, deleteSthClassroom } from '@/api/schClassroomApi'
const roomStatusDict = getDictById('classroomStatus')
const roomTypeDict = getDictById('classroomType')
export default {
  name: 'sthClassroomManage',
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      fn: querySthClassroom,
      singleDelFn: deleteSthClassroom,
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
            label:'教室名称',
            prop:'roomNo',
            rules: {
              required: true,
              message: '教室名称是必填项'
            },
            search: true,
            searchSpan: 6,
            span: 24,
          },
          {
            label:'教室地址',
            prop:'address',
            rules: {
              required: true,
              message: '教室地址是必填项'
            },
            searchSpan: 6,
            span: 24,
          },
          {
            label:'教室类型',
            prop:'roomType',
            type: 'select',
            rules: {
              required: true,
              message: '教室类型是必填项'
            },
            dicData: roomTypeDict,
            search: true,
            searchSpan: 6,
            span: 24,
          },
          {
            label:'状态',
            prop:'status',
            type: 'select',
            rules: {
              required: true,
              message: '教室状态是必填项'
            },
            dicData: roomStatusDict,
            search: true,
            searchSpan: 6,
            span: 24,
          },
          {
            label:'楼编号',
            prop:'buildingNo',
            span: 24,
          },
          {
            label:'楼层号',
            prop:'floorNo',
            span: 24,
          },
          {
            label:'容纳人数(人)',
            prop:'studentQty',
            span: 24,
          },
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let result = await updateSthClassroom(row)
        await this.resetList()
        this.$message.success('修改成功')
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let result = await insertSthClassroom(row)
        await this.resetList()
        this.$message.success('添加成功')
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
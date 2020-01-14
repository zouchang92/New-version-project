<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
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
import { queryBuilding, addBuilding, updateBuilding, deleteBuilding } from '@/api/buildingManageApi'
const buildingTypeDict = getDictById('buildingType')
export default {
  name: 'buildingManage',
  data() {
    return {
      fn: queryBuilding,
      singleDelFn: deleteBuilding,
      option: {
        column: [{
          label:'id',
          prop:'id',
          hide: true,
          addDisplay: false,
          editDisplay: false,
          viewDisplay: false
        }, {
          label: '楼栋名称',
          prop: 'buildingName',
          rules: [{
            required: true,
            message: '楼栋名称为必填项'
          }],
          search: true
        }, {
          label: '楼栋编号',
          prop: 'buildingNo',
          rules: [{
            required: true,
            message: '楼栋编号为必填项'
          }],
          search: true
        }, {
          label: '楼栋类型',
          prop: 'buildingType',
          type: 'select',
          rules: [{
            required: true,
            message: '楼栋类型为必填项'
          }],
          dicData: buildingTypeDict,
          search: true
        }]
      },
      obj: {}
    }
  },
  mixins: [tableCommon, permission],
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        let res = await updateBuilding(row)
        await this.resetList()
        this.$message.success('更新成功')
        loading(false)
        done()
      } catch(err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        let res = await addBuilding(row)
        await this.resetList()
        this.$message.success('添加成功')
        loading(false)
        done()
      } catch(err) {
        loading(false)
      }
    }
  }
}
</script>

<style>

</style>
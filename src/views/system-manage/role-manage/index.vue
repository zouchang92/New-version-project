<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <el-card class="box-card">
          <avue-crud rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="page" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
         </el-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryRoles, addRole } from '@/api/roleManageApi'
export default {
  name: 'roleManage',
  mixins: [tableCommon],
  data() {
    return {
      searchForm: {

      },
      fn: queryRoles,
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
            label:'角色名称',
            prop:'roleName',
            rules: {
              required: false,
            },
            width: 200,
            search: true
          },
          {
            label: '创建时间',
            prop: 'createTime',
            rules: {
              required: false,
            },
            type: 'datetime',
            format: 'yyyy-MM-DD HH:mm:ss',
            width: 200,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: '备注',
            prop: 'description',
            rules: {
              required: false,
            },
            width: 200
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
    async rowUpdate(row, done, loading) {
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
  }
}
</script>

<style scoped>

</style>
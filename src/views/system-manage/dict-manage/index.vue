<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <el-card class="box-card">
          <el-container>
            <el-aside width="200px">
              <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick"></avue-tree>
            </el-aside>
            <el-main>
            <avue-crud rowKey="id" @upload-after="uploadBefore" @size-change="pageSizeChange" @current-change="currentPageChange" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" @search-change="searchChange" :page="page" :data="tableList" :option="option" v-model="obj">
              <template slot="searchMenu">
                <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
                <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
                <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
              </template>
             </avue-crud>
           </el-main>
          </el-container>
          
         </el-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import { queryDictList, searchDictById } from '@/api/dictManageApi'
export default {
  name: 'roleManage',
  mixins: [tableCommon],
  data() {
    return {
      searchForm: {
        id: ''
      },
      treeData: [],
      treeOption: {
        props: {
          label: 'name',
          value: 'id',
          id: 'id'
        }
      },
      
      fn: searchDictById,
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
            label:'字典名称',
            prop:'name',
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
            width: 200
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
    this.getDictTree()
  },
  methods: {
    nodeClick(e) {
      this.searchForm = {
        ...this.searchForm,
        id: e.id
      }
      this.resetList()
    },
    getDictTree() {
      queryDictList().then(res => {
        this.treeData = res.data
      })
    },
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
<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <el-card class="box-card">
          <avue-crud ref="crud" @search-change="searchChange" :page="page" :data="data" :option="option" v-model="obj">
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
export default {
  name: 'parentManage',
  data() {
    return {
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      data: [{
        name:'张三',
        sex:'男',
        date:'1994-02-23 00:00:00'
      }, {
        name:'李四',
        sex:'女',
        date:'1994-02-23 00:00:00'
      }, {
        name:'王五',
        sex:'女',
        date:'1994-02-23 00:00:00'
      }, {
        name:'赵六',
        sex:'男',
        date:'1994-02-23 00:00:00'
      }],
      option: {
        addBtn: false,
        title: '',
        page: true,
        viewBtn: true,
        selection: true,
        stripe: false,
        height: 700,
        selectClearBtn: false,
        searchResetBtn: false,
        header: false,
        tip: false,
        column: [
          {
            label:'姓名',
            prop:'name',
            search: true,
            rules: {
              required: true,
              message: '姓名是必填项'
            }
          },
          {
            label:'性别',
            prop:'sex',
            search: true
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          }
        ]
      },
      obj: {}
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    searchChange(params) {
      console.log(params)
    }
  }
}
</script>

<style scoped>

</style>
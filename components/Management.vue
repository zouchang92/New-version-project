<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        @search-change="searchChange"
        :page="page"
        @selection-change="selectionChange"
        ref="crud"
      >
        <template slot="searchMenu">
          <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
          <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
        </template>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";

export default {
  mixins: [tableCommon],
  data() {
    return {
      page: {
        pageSize: 20
      },
      searchForm: {},
      data: [
        {
          stardata: "2019下学期",
          name: "篮球",
          person: "李安",
          orgIds: "三、四年级",
          class: "无",
          namelist: "无"
        }
      ],
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "学期",
            prop: "stardata",
            search: true,
            rules: [{
              required: true,
            }]
          },
          {
            label: "社团名称",
            prop: "name",
            search: true,
            rules: [{
              required: true,
            }]
          },
          {
            label: "社团负责人",
            prop: "person",
            rules: [{
              required: true,
            }]
          },
          {
            label: "适用年级",
            prop: "orgIds",
            rules: [{
              required: true,
            }]
          },
          {
            label: "社团课表",
            prop: "class",      
          },
          {
            label: "人员名单",
            prop: "namelist",
            type: 'upload'
          }
        ]
      }
    };
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    onLoad(page) {
      this.$message.success("分页信息:" + JSON.stringify(page));
      this.page.total = 20;
    },
    selectionChange(list) {
      this.$message.success("选中的数据" + JSON.stringify(list));
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 3) {
        return {
          overflow: "hidden"
        };
      }
    }
  }
};
</script>
<style lang="">
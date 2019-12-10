<template>
  <div class="Management">
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          rowKey="id"
          :data="tableList"
          :option="option"
          @search-change="searchChange"
          :page="page"
          @selection-change="selectionChange"
          @row-del="batchDel"
          @row-save="rowSave"
          ref="crud"
        >
          >
          <template slot="classMethod" slot-scope="scope">
            <el-button type="text" @click="dialogTableVisible = true">点击查看</el-button>
            <el-dialog title="社团课表" :visible.sync="dialogTableVisible">
              <span>123</span>
            </el-dialog>
          </template>
          <template slot="classType" slot-scope="scope">
            <el-button type="text" @click="dialogTableVisible1 = true">点击查看</el-button>
            <el-dialog title="社团课表" :visible.sync="dialogTableVisible1">
              <span>123</span>
            </el-dialog>
          </template>
          <template slot="searchMenu">
            <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
            <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { queryClub, addClub, delClub, getIdClub } from "@/api/CommunityApi.js";

export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryClub,
      batchDel: delClub,
      dialogTableVisible: false,
      dialogTableVisible1: false,
      option: {
        selection: true,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: "学期",
            prop: "name",
            type: "select",
            search: true,
            rules: {
              required: true,
              message: "学期"
            }
          },
          {
            label: "社团名称",
            prop: "name",
            hide: true,
            search: true,
            rules: {
              required: true,
              message: "社团名称"
            }
          },
          {
            label: "负责人",
            prop: "person",
            rules: {
              required: true,
              message: "负责人"
            }
          },
          {
            label: "适用年级",
            prop: "orgIds",
            rules: {
              required: true,
              message: "适用年级"
            }
          },
          {
            label: "社团课表",
            type: "upload",
            prop: "classMethod",
            slot: true
          },
          {
            label: "人员名单",
            type: "upload",
            prop: "classType",
            slot: true
          }
        ]
      },
      data: [],
      handleSee: false,
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [],
      form: {}
    };
  },
  created() {
    this.get();
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    async get() {
      try {
        let page = 1;
        let rows = 10000;
        let List = await queryClub({ page, rows });
        this.tableData = List.data.list;
        console.log(this.tableData);
      } catch (err) {
        console.log(err);
      }
    },
    async handleDelete(row) {
      try {
        let ids = row.id;
        console.log(ids)
        await delClub({ ids });
        this.get();
      } catch (err) {
        console.log(err);
      }
    },
    async rowSave(form, done, loading) {
      loading(true);
      try {
        let result = await addClub(form);
        await this.resetList();
        done();
      } catch (err) {
        console.log(123);
        loading(false);
      }
    }
  }
};
</script>
<style lang='scss' scpoed>
.Management {
  .title {
    margin: 15px;
    margin-top: 0px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    display: flex;
    .Nature,
    .type,
    .name {
      padding-top: 25px;
      padding-left: 40px;
    }
    .name {
      width: 270px;
      display: flex;
      p {
        margin: 0px;
        display: block;
        width: 120px;
        margin-top: 6px;
      }
    }
  }
  .content {
    margin: 15px;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
    }
  }
}
</style>
<style>
.Management .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.Management .title .el-input__suffix {
  top: 4px;
}
</style>
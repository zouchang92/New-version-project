<template>
  <div class="Management">
    <div class="title">
      <div class="Nature">
        社团:
        <el-select v-model="value" placeholder="请选社团">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="name">
        <p>编号/名称:</p>
        <el-input v-model="input" placeholder="请输入编号/名称"></el-input>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:24px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          size="small"
          @click="dialogFormVisible = true"
        >新建</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">导入</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
      </div>
    </div>
    <el-dialog title="新建社团" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学期" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社团名称" :label-width="formLabelWidth">
          <el-input v-model="form.presenter" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="form.classMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用年级" :label-width="formLabelWidth">
          <el-input v-model="form.classType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="社团课表" :label-width="formLabelWidth">
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="学期" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社团名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="160">
          <template slot-scope="scope">
            <span v-if="!showEdit[$index]">{{ scope.row.person }}</span>
            <input class="edit-cell" v-if="showEdit[$index]" v-model="scope.row.person">
          </template>
        </el-table-column>
        <el-table-column label="适用年级">
          <template slot-scope="scope">
            <span>{{ scope.row.orgIds }}</span>
          </template>
        </el-table-column>
        <el-table-column label="社团课表">
          <template slot-scope="scope">
            <span>{{ scope.row.classMethod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人员名单">
          <template slot-scope="scope">
            <span>{{ scope.row.classType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSee()">
              <span style="color:#1890FF;font-size:13px;font-weight:400;">查看</span>
            </el-button>
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click.native="handleEdit($index, row)"  v-if="!showBtn[$index]"
            >编辑</span>
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="handleDelete(scope.row)"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
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
      options: [
        {
          value: "选项1",
          label: "2019学年上学期"
        },
        {
          value: "选项2",
          label: "2019学年下学期"
        }
      ],
      value: "",
      value1: "",
      input: "",
      data: [],
      dialogFormVisible: false,
      handleSee: false,
      formLabelWidth: "120px",
      showEdit: [],
      showBtn:[],
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
    handleEdit(index, row) {
      console.log(index, row.id);
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
        await delClub({ ids });
        this.get();
      } catch (err) {
        console.log(err);
      }
    },
    handleEdit(index, row) {
      this.showEdit[index] = true;
      this.showBtn[index] = true;
      this.$set(this.showEdit, row, true);
      this.$set(this.showBtn, row, true);
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
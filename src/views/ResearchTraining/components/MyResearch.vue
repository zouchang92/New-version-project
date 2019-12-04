<template>
  <div class="MyResearch">
    <div class="title">
      <div class="Nature">
        状态:
        <el-select v-model="value" placeholder="请选择完成情况">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="type">
        类型:
        <el-select v-model="value1" placeholder="请选择类型">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="name">
        <p>名称:</p>
        <el-input v-model="input" placeholder="请输入名称"></el-input>
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
      </div>
    </div>
    <el-dialog title="新建计划" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="研训名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研训时间" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="研训性质" :label-width="formLabelWidth">
          <el-select v-model="form.classProperty" placeholder="请选择研修性质">
            <el-option label="必修" value="必修"></el-option>
            <el-option label="选修" value="选修"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="研训形式" :label-width="formLabelWidth">
          <el-input v-model="form.classMethod" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研训类型" :label-width="formLabelWidth">
          <el-input v-model="form.classType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="研训地点" :label-width="formLabelWidth">
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课时" :label-width="formLabelWidth">
          <el-input v-model="form.classTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参训名单" :label-width="formLabelWidth">
          <el-input v-model="form.memberList" autocomplete="off"></el-input>
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
        <el-table-column label="研训名称" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.classTime | formatTS}}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训性质">
          <template slot-scope="scope">
            <span>{{ scope.row.classProperty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训形式">
          <template slot-scope="scope">
            <span>{{ scope.row.classMethod }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训类型">
          <template slot-scope="scope">
            <span>{{ scope.row.classType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训地点">
          <template slot-scope="scope">
            <span>{{ scope.row.place}}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时">
          <template slot-scope="scope">
            <span>{{ scope.row.lession }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训资料" style="overflow:hidden">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogTableVisible = true"><span style="color:#1890FF">查看</span> </el-button>
            <el-dialog title="研训资料" :visible.sync="dialogTableVisible">
              <el-table :data="tableData">
                <el-table-column :property="scope.row.memberList" label="日期" width="150"></el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="完成情况">
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column label="学习报告">
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</span>
            <span style="color:#1890FF;font-size:13px;font-weight:400;">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { formatDate } from "@/api/date.js";
import { queryList } from "@/api/ResearchTrainingApi";
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryList,
      options: [
        {
          value: "选项1",
          label: "选修"
        },
        {
          value: "选项2",
          label: "必修"
        }
      ],
      options1: [
        {
          value: "选项1",
          label: "教育学培训"
        },
        {
          value: "选项2",
          label: "教育管理培训"
        }
      ],
      value: "",
      value1: "",
      input: "",
      dialogFormVisible: false,
       dialogTableVisible: false,
      formLabelWidth: "120px",
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [],
      form: {
        name: "",
        presenter: "",
        date1: "",
        date2: "",
        classProperty: "",
        classMethod: "",
        classType: "",
        place: "",
        classTime: "",
        memberList: ""
      }
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    submit() {
      console.log(this.form);
    },
    async get() {
      try {
        let page = 1;
        let rows = 10000;
        let List = await queryList({ page, rows });
        this.tableData = List.data.list;
        console.log(this.tableData);
      } catch (err) {
        console.log(err);
      }
    }
  },
  filters: {
    formatTS(timestamp) {
      let date = new Date(timestamp);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style lang='scss' scpoed>
.MyResearch {
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
        width: 50px;
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
.MyResearch .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.MyResearch .title .el-input__suffix {
  top: 4px;
}
</style>
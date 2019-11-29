<template>
  <div class="ResearchPlay">
    <div class="title">
      <div class="Nature">
        性质:
        <el-select v-model="value" placeholder="请选择课程性质">
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
        <el-select v-model="value1" placeholder="请选择课程性质">
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
        <el-form-item label="主讲人" :label-width="formLabelWidth">
          <el-input v-model="form.presenter" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="add">确 定</el-button>
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
        <el-table-column label="主讲人">
          <template slot-scope="scope">
            <span>{{ scope.row.presenter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.data }}</span>
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
            <span>{{ scope.row.classTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参训名单" width="150" style="overflow:hidden">
          <template slot-scope="scope">
            <span>{{ scope.row.memberList }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未完成人员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <p>蓝山中学/数学组/{{ scope.row.undoneList }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.undoneList }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</span>
            <span
              style="color:#1890FF;font-size:13px;font-weight:400;"
              @click="singleDel"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { queryResearch, addResearch, delResearch } from '@/api/ResearchTrainingApi'
import { get } from 'http';
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn:queryResearch,
      add:addResearch,
      singleDelFn: delResearch,
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
          date2:"",
          classProperty: "",
          classMethod: "",
          classType: "",
          place: "",
          classTime: "",
          memberList: "",
      }
    };
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
    submit(){
      console.log(this.form)
    },    
    async get() {
      try {
        let List = await queryResearch({page,rows})
        this.tableData = List.data
      } catch(err) {
        console.log(120)
      }
    }
  }
};
</script>
<style lang='scss' scpoed>
.ResearchPlay {
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
.ResearchPlay .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.ResearchPlay .title .el-input__suffix {
  top: 4px;
}
</style>
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
        <el-button type="success" icon="el-icon-plus" size="small">新建</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">导入</el-button>
      </div>
    </div>
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
            <span>{{ scope.row.Speaker }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训时间" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.data }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训性质">
          <template slot-scope="scope">
            <span>{{ scope.row.Nature }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训形式">
          <template slot-scope="scope">
            <span>{{ scope.row.mode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="研训地点">
          <template slot-scope="scope">
            <span>{{ scope.row.place}}</span>
          </template>
        </el-table-column>
        <el-table-column label="课时">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参训名单" width="150" style="overflow:hidden">
          <template slot-scope="scope">
            <span>{{ scope.row.Attendance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未完成人员">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <p>蓝山中学/数学组/{{ scope.row.NoComplete }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.NoComplete }}</span>
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
              @click="handleDelete(scope.$index, scope.row)"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";

export default {
  mixins: [tableCommon],
  data() {
    return {
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
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [
        {
          name: "教师职业道德修养",
          Speaker: "选修",
          data: "2019-9-18 10:00",
          Nature: "选修",
          mode: "培训讲座",
          type: "教育学培训",
          place: "尚德楼302室",
          time: "3小时",
          Attendance: "王林、李晓、蓝枫...",
          NoComplete: "李晓、蓝枫"
        }
      ]
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
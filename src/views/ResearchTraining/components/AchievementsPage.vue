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
          />
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
          />
        </el-select>
      </div>
      <div class="name">
        <p>名称:</p>
        <el-input v-model="input" placeholder="请输入名称" />
      </div>
      <div style="height:32px;margin-left:23px;margin-top:24px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" size="small">新建</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">导入</el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="研训名称" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label=" 研训性质">
          <template slot-scope="scope">
            <span>{{ scope.row.Nature }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主讲人" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.Speaker }}</span>
          </template>
        </el-table-column>
        <el-table-column label="次数">
          <template slot-scope="scope">
            <span>{{ scope.row.frequency }}</span>
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
        <el-table-column label="研训资料">
          <template slot-scope>
            <span style="color:#1890FF">查看</span>
          </template>
        </el-table-column>
        <el-table-column label="研训集锦">
          <template slot-scope>
            <span style="color:#1890FF">查看</span>|
            <span style="color:#1890FF">编辑</span>
          </template>
        </el-table-column>
        <el-table-column label="研训报告">
          <template slot-scope="scope">
            <span style="color:#1890FF">{{ scope.row.Presentation }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '选修'
        },
        {
          value: '选项2',
          label: '必修'
        }
      ],
      options1: [
        {
          value: '选项1',
          label: '教育学培训'
        },
        {
          value: '选项2',
          label: '教育管理培训'
        }
      ],
      value: '',
      value1: '',
      input: '',
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableData: [
        {
          name: '教师职业道德修养',
          Nature: '选修',
          Speaker: '王丹丹/校领导',
          frequency: '3',
          time: '3小时',
          Attendance: '王林、李晓、蓝枫...',
          NoComplete: '李晓、蓝枫',
          Presentation: '13份'
        }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
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

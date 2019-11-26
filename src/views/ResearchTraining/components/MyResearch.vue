<template>
  <div class="MyResearch">
    <el-card class="box-card">
      <avue-crud
        :data="data"
        :option="option"
        @search-change="searchChange"
        :page="page"
        @selection-change="selectionChange"
      >
        <template slot="searchMenu">
          <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
          <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
          <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
        </template>
        <template slot="menu">
          <el-button type="primary" size="small" plain>分配计划</el-button>
          <el-button type="primary" size="small" plain>计划明细</el-button>
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
          curriculum: "教师职业道德修养",
          time: "2019-9-18 10:00",
          place: "第一小学四年级一班",
          mode: "培训讲座",
          classtime: "3小时",
          Subject: "教育基础学",
          Number: "20",
          Organizational: "教育局"
        }
      ],
      option: {
        selection: true,
        addBtn: false,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "方式",
            prop: "",
            hide: true,
            type: "select",
            search: true
          },
          {
            label: "科目",
            prop: "",
            hide: true,
            type: "select",
            search: true
          },
          {
            label: "名称",
            prop: "",
            hide: true,
            search: true
          },
          {
            label: "研修课程",
            prop: "curriculum"
          },
          {
            label: "课程时间",
            prop: "time"
          },
          {
            label: "授课低点",
            prop: "place"
          },
          {
            label: "授课方式",
            prop: "mode"
          },
          {
            label: "课程时长",
            prop: "classtime"
          },
          {
            label: "所属科目",
            prop: "Subject"
          },
          {
            label: "培训名额",
            prop: "Number"
          },
          {
            label: "组织单位",
            prop: "Organizational"
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
<style>
.MyResearch .el-form-item__label {
  width: 0px;
}
.MyResearch .el-form-item__content {
  margin-left: 46px;
  margin-right: 42px;
}
.MyResearch .el-col {
  margin-left: -35px;
}
.MyResearch .is-plain {
  border: 0px;
  background: #fff;
}
.MyResearch .is-plain:hover{
    color:#fff;
    border:0px;
}
</style>
<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          rowKey="id"
          @search-change="searchChange"
          @selection-change="selectChange"
          ref="crud"
          :page="page"
          :data="tableList"
          :option="option"
          @row-save="rowSave"
          @row-del="singleDel"
          @row-update="rowUpdate"
        >
          <template slot="searchMenu">
            <el-button type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
            <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button @click="batchDel()" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle></el-button>
          </template>
        </avue-crud>
      </div>
    </div>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import {
  queryActivity,
  addActivity,
  delActivity,
  updateActivity
} from "@/api/CommunityApi.js";
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryActivity,
      singleDelFn: delActivity,
      page: {
        pageSize: 20
      },
      searchForm: {},
      tableList: [],
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
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false
          },
          {
            label: "学期",
            prop: "semesterId",
            search: true,
            rules: {
              required: true,
              message: "学期"
            }
          },
          {
            label: "所属社团",
            prop: "clubName",
            search: true,
            rules: {
              required: true,
              message: "所属社团"
            }
          },
          {
            label: "活动名称",
            prop: "name",
            rules: {
              required: true,
              message: "活动名称"
            }
          },
          {
            label: "活动单位",
            prop: "clubOrgId",
            rules: {
              required: true,
              message: "活动单位"
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
            label: "所在场馆",
            prop: "classroomName",
            rules: {
              required: true,
              message: "所在场馆"
            }
          },
          {
            label: "活动荣耀",
            type: "upload",
            prop: "honors"
            // rules: {
            //   required: true,
            //   message: "活动荣耀"
            // }
          },
          {
            label: "精彩瞬间",
            type: "upload",
            prop: "description"
            // rules: {
            //   required: true,
            //   message: "精彩瞬间"
            // }
          },
          {
            label: "活动时间",
            type: "date",
            prop: "time",
            width: 150,
            format: "yyyy-MM-dd HH:mm",
            valueFormat: "yyyy-MM-dd HH:mm",
            rules: {
              required: true,
              message: "活动时间"
            }
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
    },
    async rowUpdate(row, index, done, loading) {
      loading(true);
      try {
        let result = await updateActivity(row);
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    },
    async rowSave(row, done, loading) {
      // row.description = row.description.length ? row.description[0].value : "";
      // row.honors = row.honors.length ? row.honors[0].value : "";
      loading(true);
      try {
        let result = await addActivity(row);
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    }
  }
};
</script>
<style lang="">
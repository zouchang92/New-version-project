<template>
  <div>
    <el-card class="box-card">
      <avue-crud
        @upload-after="uploadBefore"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        @row-save="rowSave"
        @row-update="rowUpdate"
        :table-loading="tableListLoading"
        ref="crud"
        @search-change="searchChange"
        :page="page"
        :data="tableList"
        :option="option"
        v-model="obj"
      >
        <el-button type="success" icon="el-icon-plus" size="small">新建</el-button>
      </avue-crud>
    </el-card>
  </div>
</template>
<script>
import tableCommon from "@/mixins/table-common.js";
import { queryStudent, addStudent } from '@/api/studentManageApi'
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryStudent,
      data: [],
      option: {
        column: [
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: "姓名",
            prop: "nationNum",
            rules: {
              required: false
            },
            width: 200
          },
          {
            label: "奖励名称",
            prop: "initDtm",
            type: "datetime"
          },
          {
            label: "奖励级别",
            prop: "initNum"
          },
          {
            label: "获奖日期",
            prop: "curStatus",
            rules: {
              required: false
            },
            search: true,
            span: 12,
            type: "select"
          },
          {
            label: "获奖名次",
            prop: "guarder",
            width: 150
          },
          {
            label: "颁奖单位",
            prop: "guarderRelation",
            type: "select",
            width: 150
          },
          {
            label: "奖励照片",
            prop: "facePicFile",
            type: "upload",
            action: "http://192.168.1.125:8999/zhxyx/upload/file",
            limit: 1,
            propsHttp: {
              res: "0"
            },
            listType: "picture-card",
            span: 24
          },
                    {
            label:'备注',
            prop:'guarder',
            width: 150
          },
        ]
      },
      obj: {}
    };
  }
};
</script>
<style lang="">
</style>
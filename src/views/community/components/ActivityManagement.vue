<template>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          row-key="id"
          :page="page"
          :data="tableList"
          :option="option"
          :table-loading="tableListLoading"
          @search-change="searchChange"
          @selection-change="selectChange"
          @row-save="rowSave"
          @row-update="rowUpdate"
        >
          <template slot="honors" slot-scope="scope">
            <el-button type="text" @click="clickhonors(scope.row)">点击查看</el-button>
          </template>
          <template slot="photos" slot-scope="scope">
            <el-button type="text" @click="handelpho(scope.row)">点击查看</el-button>
          </template>
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-plus" size="small" @click.stop="handleAdd()">新建</el-button>
            <el-button type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="batchDel()">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
          </template>
          <template slot="menu" slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              size="small"
              @click.stop="handledel(scope.row,scope.index)"
            >删除</el-button>
          </template>
        </avue-crud>
      </div>
      <el-dialog
        title="活动荣耀"
        :visible.sync="DialogVisible"
        width="40%"
        center
      >
      <div :data="dataOption">
        <img :src="data.honors" alt="">
      </div>
        <el-upload
          :action="url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="精彩瞬间"
        :visible.sync="Visible"
        width="60%"
        center
      >
      <div style="display:flex">
        <img v-for="(item,index) in data" :key="index"  width="40%" :src="item" alt="">
      </div>
        <el-upload
          :action="url"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="Visible = false">取 消</el-button>
          <el-button type="primary" @click="DialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import tableCommon from '@/mixins/table-common.js'
// eslint-disable-next-line no-unused-vars
import { getOrgan, getDictById } from '@/utils'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import {
  queryActivity,
  addActivity,
  delActivity,
  updateActivity,
  getById
} from '@/api/communityApi.js'
export default {
  mixins: [tableCommon],
  inject: ['reload'],
  data() {
    return {
      fn: queryActivity,
      page: {
        pageSize: 20
      },
      searchForm: {},
      DialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      Visible: false,
      data: [],
      dataOption: [],
      url: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
      tableList: [],
      option: {
        selection: true,
        align: 'center',
        menuAlign: 'center',
        delBtn: false,
        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
          },
          {
            label: '学期',
            prop: 'semesterId',
            type: 'select',
            width: 100,
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'name',
              value: 'name'
            },
            rules: [{
              required: true,
              message: '学期'
            }]
          },
          {
            label: '所属社团',
            prop: 'clubId',
            type: 'select',
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/stClub/list',
            dicMethod: 'post',
            dicQuery: {
              page: 1,
              rows: 100000
            },
            props: {
              res: 'data.list',
              label: 'name',
              value: 'id'
            },
            rules: [{
              required: true,
              message: '所属社团'
            }]
          },
          {
            label: '活动名称',
            prop: 'name',
            rules: [{
              required: true,
              message: '活动名称'
            }]
          },
          {
            label: '活动单位',
            prop: 'clubOrgId',
            type: 'tree',
            width: 150,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            rules: [{
              required: true,
              message: '活动单位是必填的'
            }],
            searchSpan: 8
          },
          {
            label: '负责人',
            prop: 'persons',
            rules: [{
              required: true,
              message: '负责人'
            }]
          },
          {
            label: '所在场馆',
            prop: 'classroomName',
            rules: [{
              required: true,
              message: '所在场馆'
            }]
          },
          {
            label: '活动荣耀',
            type: 'upload',
            prop: 'honors',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            slot: true
          },
          {
            label: '精彩瞬间',
            type: 'upload',
            prop: 'photos',
            action: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/publicUpload`,
            limit: 1,
            propsHttp: {
              res: '0'
            },
            listType: 'picture-card',
            span: 12,
            slot: true
          },
          {
            label: '参加人员',
            slot: true
          },
          {
            label: '活动时间',
            type: 'date',
            prop: 'time',
            width: 150,
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            rules: [{
              required: true,
              message: '活动时间'
            }]
          },
          {
            label: '描述',
            type: 'textarea',
            component: 'rich-text',
            prop: 'description',
            span: 24
          }
        ]
      }
    }
  },
  created() {
    this.get()
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    onLoad(page) {
      this.$message.success('分页信息:' + JSON.stringify(page))
      this.page.total = 20
    },
    selectionChange(list) {
      this.$message.success('选中的数据' + JSON.stringify(list))
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // eslint-disable-next-line eqeqeq
      if (columnIndex == 3) {
        return {
          overflow: 'hidden'
        }
      }
    },
    async get() {
      try {
        const List = await queryActivity()
        this.tableList = List.data.list
        console.log(this.tableList)
      } catch (err) {
        console.log(err)
      }
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await updateActivity(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      // row.description = row.description.length ? row.description[0].value : "";
      row.honors = row.honors.length ? row.honors[0].value : ''
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await addActivity(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async handledel(row, index) {
      const id = row.id
      try {
        await delActivity({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    },
    async clickhonors(row) {
      const id = row.id
      try {
       const result = await getById({id})
       console.log(result.data)
       this.dataOption = result.data
       this.DialogVisible = true
      } catch (err) {
        console.log(err)
      }
    },
    async handelpho(row) {
      const id = row.id
      try {
       const result = await getById({id})
      //  console.log(result.data.photos)
       const a = (result.data.photos).split(",")
       console.log(a)
       this.data = a
       this.Visible = true
      } catch (err) {
        console.log(err)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="">

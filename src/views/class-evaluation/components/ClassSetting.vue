<template>
  <div>
    <div class="ClassSetting">
      <el-row :gutter="15">
        <el-col :span="6" style="position:relative;margin-left: 27px;">
          <el-card>
            <div class="ClassSetting-title">
              <p class="u-line" />
              <span>选择科目</span>
            </div>
            <avue-tree ref="organTree" node-key="id" :option="treeOption" :data="treeData" @node-click="nodeClick" />
          </el-card>
        </el-col>
        <el-col :span="17">
          <el-card>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="年级">
                <el-select v-model="form.region" placeholder="请选择年级">
                  <el-option
                    v-for="item in option1"
                    :key="item.region"
                    :label="item.orgName"
                    :value="item.orgName"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="科目">
                <el-select v-model="form.name" placeholder="请选择科目">
                  <el-option
                    v-for="item in List"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="点平纬度">
                <el-radio-group v-model="form.resource" @change="changefor">
                  <el-radio label="取各项平均分" />
                  <el-radio label="取各项总分" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="点评纬度">
                <avue-crud
                  ref="crud"
                  v-model="obj"
                  :data="tableList"
                  :option="option"
                  style="margin-top:10px;"
                  @selection-change="selectionChange"
                  @row-update="rowUpdate"
                >
                  <template slot="menu" slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-delete"
                      size="small"
                      @click.stop="handledel(scope.row,scope.index)"
                    >删除</el-button>
                  </template>
                </avue-crud>
                <el-button style="width:100%;margin-top:20px;" @click.stop="add">+新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>保存</el-button>
                <el-button>清除</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog title="新建任职情况" :visible.sync="dialogTableVisible">
        <el-form :model="forms">
          <el-form-item label="指标名称" label-width="120" required>
            <el-input v-model="forms.item" autocomplete="off" />
          </el-form-item>
          <el-form-item label="指标分数" label-width="120" required>
            <el-input v-model="forms.itemValue" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="Submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { getOrganTree } from '@/api/organManageApi'
import { getOrgan, pinkItem } from '@/api/classEvaluationApi'
import { interArrayTree } from '@/utils'
import { queryCourses } from '@/api/courseManageApi'
export default {
  name: 'ClassSetting',
  mixins: [permission],
  data() {
    return {
      mode: 'add',
      fn: pinkItem,
      updateLoading: false,
      dialogTableVisible: false,
      form: {
        region: '',
        name: ''
      },
      treeParams: {
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
        data: []
      },
      treeData: [],
      treeOption: {
        expandAll: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        props: {
          label: 'orgName',
          value: 'id'
        }
      },
      sid: '',
      eOrgName: '',
      option1: {},
      List: {},
      value: this.eOrgName,
      forms: {},
      obj: {},
      option: {
        selection: true,
        delBtn: false,
        align: 'center',
        header: false,
        viewBtn: false,
        menuAlign: 'center',
        column: [
          {
            label: '指标名称',
            prop: 'item'
          },
          {
            label: '指标分数',
            prop: 'itemValue'
          }
        ]
      }
    }
  },
  mounted() {
    this.getOrganTree()
  },
  methods: {
    nodeClick(e) {
      this.sid = e.id
      this.eOrgName = e.orgName
      console.log(e.id, e.orgName)
      this.get()
      this.getlist()
    },
    getOrganTree() {
      getOrganTree().then(res => {
        const treeData = interArrayTree(res.data)
        this.treeData = treeData
        this.$refs.treeSelect.treeDataUpdateFun(treeData)
      })
    },
    onSubmit() {
      // console.log()
      console.log(this.form.region)
      this.get()
    },
    async get() {
      try {
        const parentId = this.sid
        const List = await getOrgan(parentId)
        const a = List.data
        if (a.length === 0) {
          this.option1 = this.eOrgName
        }
        if (a.length > 0) {
          this.option1 = a
        }
        console.log(this.option1)
      } catch (err) {
        console.log(err)
      }
    },
    async getpinkItem() {
      try {
        const b = await pinkItem()
        console.log(b)
      } catch (err) {
        console.log(err)
      }
    },
    async getlist() {
      try {
        const page = 1
        const rows = 1000
        const id = this.sid
        const List = await queryCourses({ page, rows, id, name })
        this.List = List.data.list
        console.log(this.List)
      } catch (err) {
        console.log(err)
      }
    },
    add() {
      this.dialogTableVisible = true
    },
    Submit() {
      this.tableList.push(this.forms)
      this.dialogTableVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ClassSetting{
  height:900px;
  background:#eee;
  .ClassSetting-title{
        height: 31px;
        border-bottom: 1px solid #eee;
        margin: 0px 7px 8px 1px;
        span {
         position: absolute;
    top: 18px;
    left: 43px;
        }
      }
      .u-line {
        display: block;
        width: 5px;
        height: 16px;
        background: #018eed;
        position: absolute;
        left: 32px;
        top: 3px;
      }
}
</style>

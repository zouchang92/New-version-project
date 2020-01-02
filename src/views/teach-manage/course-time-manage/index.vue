<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          ref="crud"
          v-model="obj"
          :permission="permission"
          row-key="id"
          :table-loading="tableListLoading"
          :page="page"
          :data="tableList"
          :option="option"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
        >
          <template slot="searchMenu">
            <el-button type="success" icon="el-icon-plus" size="small" @click.stop="add">新建</el-button>
            <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
            <el-button v-if="permission.batchDelBtn" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
          </template>
        </avue-crud>
      </div>
    </div>
    <el-dialog title="新建课时" :visible.sync="dialogTableVisible" width="80%">
      <div class="time-title">
        <p>机构名称:</p>
        <el-cascader
          v-model="value"
          class="title-org"
          :options="options"
          :props="{value:'id',label:'orgName',children: 'child', checkStrictly: true }"
          @change="handleChange"
        />
        <div class="title-content">
          <ul>
            <li class="content-text">
              <div class="content-title">第1节课</div>
              <div v-if="region == ''" class="content-t" @click="innerVisible1 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime | formatTS }}-{{ endtime | formatTS }}</p>
                <p> {{ region }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible1"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date1" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region1" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第2节课</div>
              <div v-if="region1 == ''" class="content-t" @click="innerVisible2 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime1 | formatTS }}-{{ endtime1 | formatTS }}</p>
                <p> {{ region1 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible2"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date3" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date4" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region2" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit1">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第3节课</div>
              <div v-if="region2 == ''" class="content-t" @click="innerVisible3 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime2 | formatTS }}-{{ endtime2 | formatTS }}</p>
                <p> {{ region2 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible3"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date5" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date6" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region3" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible3 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit2">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第4节课</div>
              <div v-if="region3 == ''" class="content-t" @click="innerVisible4 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime3 | formatTS }}-{{ endtime3 | formatTS }}</p>
                <p> {{ region3 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible4"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date7" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date8" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region4" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible4 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit3">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li v-for="(item,index) in 2" :key="index" class="content-text">
              <div class="content-title">第5节课</div>
              <div v-if="region4 == ''" class="content-t" @click="innerVisible5 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime4 | formatTS }}-{{ endtime4 | formatTS }}</p>
                <p> {{ region4 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible5"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date9" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date10" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region5" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible5 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit4">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第6节课</div>
              <div v-if="region5 == ''" class="content-t" @click="innerVisible6 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime5 | formatTS }}-{{ endtime5 | formatTS }}</p>
                <p> {{ region5 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible6"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date11" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date12" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region6" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible6 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit5">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第7节课</div>
              <div v-if="region6 == ''" class="content-t" @click="innerVisible7 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime6 | formatTS }}-{{ endtime6 | formatTS }}</p>
                <p> {{ region6 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible7"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date13" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date14" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region7" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible7 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit6">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第8节课</div>
              <div v-if="region7 == ''" class="content-t" @click="innerVisible8 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime7 | formatTS }}-{{ endtime7 | formatTS }}</p>
                <p> {{ region7 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible8"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date15" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date16" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region8" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible8 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit7">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第9节课</div>
              <div v-if="region8 == ''" class="content-t" @click="innerVisible9 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime8 | formatTS }}-{{ endtime8 | formatTS }}</p>
                <p> {{ region8 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible9"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date17" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date18" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region9" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible9 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit8">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第10节课</div>
              <div v-if="region9 == ''" class="content-t" @click="innerVisible10 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime9 | formatTS }}-{{ endtime9 | formatTS }}</p>
                <p> {{ region9 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible10"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date19" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date20" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region10" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible10 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit9">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第11节课</div>
              <div v-if="region10 == ''" class="content-t" @click="innerVisible11 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime10 | formatTS }}-{{ endtime10 | formatTS }}</p>
                <p> {{ region10 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible11"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date21" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date22" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region11" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible11 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit10">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
            <li class="content-text">
              <div class="content-title">第12节课</div>
              <div v-if="region11 == ''" class="content-t" @click="innerVisible12 = true"><span>设置时间段</span></div>
              <div v-else class="content-t">
                <p>{{ starttime11 | formatTS }}-{{ endtime11 | formatTS }}</p>
                <p> {{ region11 }} </p>
              </div>
              <el-dialog
                width="30%"
                title="课时"
                :visible.sync="innerVisible12"
                append-to-body
              >
                <el-form ref="form" :model="form" label-width="120px">
                  <el-form-item label="开始时间:">
                    <el-time-picker v-model="form.date23" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-time-picker v-model="form.date24" placeholder="Pick a time" style="width: 100%;" />
                  </el-form-item>
                  <el-form-item label="请选择时间段">
                    <el-select v-model="form.region12" placeholder="请选择时间">
                      <el-option label="早晨" value="早晨" />
                      <el-option label="上午" value="上午" />
                      <el-option label="下午" value="下午" />
                      <el-option label="晚上" value="晚上" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="innerVisible12 = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit11">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common.js'
import permission from '@/mixins/permission'
import { formatDate } from '@/api/date.js'
import { queryTimeTable, deleteTimeTable, addTimeTable, querySemester } from '@/api/courseTimeManageApi'
import { getOrganTree } from '@/api/organManageApi'
import { getOrgan } from '@/utils'
export default {
  name: 'CourseTimeManage',
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'hh:mm')
    }
  },
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {

      },
      options: {},
      value: null,
      list: {},
      dialogTableVisible: false,
      innerVisible1: false,
      innerVisible2: false,
      innerVisible3: false,
      innerVisible4: false,
      innerVisible5: false,
      innerVisible6: false,
      innerVisible7: false,
      innerVisible8: false,
      innerVisible9: false,
      innerVisible10: false,
      innerVisible11: false,
      innerVisible12: false,
      valuea: '',
      fn: queryTimeTable,
      singleDelFn: deleteTimeTable,
      data: [],
      form: {},
      region: '',
      starttime: '',
      endtime: '',
      starttime1: '',
      endtime1: '',
      region1: '',
      starttime2: '',
      endtime2: '',
      region2: '',
      starttime3: '',
      endtime3: '',
      region3: '',
      starttime4: '',
      endtime4: '',
      region4: '',
      starttime5: '',
      endtime5: '',
      region5: '',
      starttime6: '',
      endtime6: '',
      region6: '',
      starttime7: '',
      endtime7: '',
      region7: '',
      starttime8: '',
      endtime8: '',
      region8: '',
      starttime9: '',
      endtime9: '',
      region9: '',
      starttime10: '',
      endtime10: '',
      region10: '',
      starttime11: '',
      endtime11: '',
      region11: '',
      option: {

        column: [
          {
            label: 'id',
            prop: 'id',
            hide: true,
            addDisplay: false,
            editDisplay: false,
            addBtn: false
          },
          {
            label: '机构名称',
            prop: 'orgId',
            rules: [{
              required: true,
              message: '机构名称是必填项'
            }],
            type: 'tree',
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'id'
            },
            searchSpan: 8,
            span: 24
          },
          {
            label: '周几',
            prop: 'weekN',
            type: 'number',
            rules: [{
              required: true,
              message: '周几是必填项'
            }],
            span: 24
          },
          {
            label: '第几节',
            prop: 'lessonN',
            type: 'number',
            rules: [{
              required: true,
              message: '第几节是必填项'
            }],
            span: 24
          },
          {
            label: '开始时间',
            prop: 'starttime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: [{
              required: true,
              message: '开始时间是必填项'
            }],
            span: 24
          },
          {
            label: '结束时间',
            prop: 'endtime',
            type: 'time',
            format: 'HH:mm:ss',
            valueFormat: 'HH:mm:ss',
            rules: [{
              required: true,
              message: '结束时间是必填项'
            }],
            span: 24
          }
        ]
      },
      obj: {},
      orgId: '',
      ssh: ''
    }
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        const result = await updateCourse(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        const result = await addTimeTable(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async getOrganTree() {
      try {
        const a = await getOrganTree()
        this.options = a.data
        console.log(a.data)
      } catch (err) {
        console.log(err)
      }
    },
    async querySemester() {
      try {
        const a = await querySemester()
        this.list = a.data.list
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    handleChange(value) {
      var a = value[value.length - 1]
      this.orgId = a
      console.log(a)
    },
    changevalue(valuea) {
      this.ssh = valuea
      console.log(valuea)
    },
    add() {
      this.dialogTableVisible = true
      this.getOrganTree()
      this.querySemester()
    },
    onSubmit() {
      this.innerVisible1 = false
      this.region = this.form.region1
      this.starttime = this.form.date1
      this.endtime = this.form.date2
    },
    onSubmit1() {
      this.innerVisible2 = false
      this.region1 = this.form.region2
      this.starttime1 = this.form.date3
      this.endtime1 = this.form.date4
    },
    onSubmit2() {
      this.innerVisible3 = false
      this.region2 = this.form.region3
      this.starttime2 = this.form.date5
      this.endtime2 = this.form.date6
    },
    onSubmit3() {
      this.innerVisible4 = false
      this.region3 = this.form.region4
      this.starttime3 = this.form.date7
      this.endtime3 = this.form.date8
    },
    onSubmit4() {
      this.innerVisible5 = false
      this.region4 = this.form.region5
      this.starttime4 = this.form.date9
      this.endtime4 = this.form.date10
    },
    onSubmit5() {
      this.innerVisible6 = false
      this.region5 = this.form.region6
      this.starttime5 = this.form.date11
      this.endtime5 = this.form.date12
    },
    onSubmit6() {
      this.innerVisible7 = false
      this.region6 = this.form.region7
      this.starttime6 = this.form.date13
      this.endtime6 = this.form.date14
    },
    onSubmit7() {
      this.innerVisible8 = false
      this.region7 = this.form.region8
      this.starttime7 = this.form.date15
      this.endtime7 = this.form.date16
    },
    onSubmit8() {
      this.innerVisible9 = false
      this.region8 = this.form.region9
      this.starttime8 = this.form.date17
      this.endtime8 = this.form.date18
    },
    onSubmit9() {
      this.innerVisible10 = false
      this.region9 = this.form.region10
      this.starttime9 = this.form.date19
      this.endtime9 = this.form.date20
    },
    onSubmit10() {
      this.innerVisible11 = false
      this.region10 = this.form.region11
      this.starttime10 = this.form.date21
      this.endtime10 = this.form.date22
    },
    onSubmit11() {
      this.innerVisible12 = false
      this.region11 = this.form.region12
      this.starttime11 = this.form.date23
      this.endtime11 = this.form.date24
    },
    async addsub() {
      this.dialogVisible = false
      const a = [{ lessonN: '1', starttime: this.starttime, endtime: this.endtime }, { lessonN: '2', starttime: this.starttime1, endtime: this.endtime1 }, { lessonN: '3', starttime: this.starttime2, endtime: this.endtime2 }, { lessonN: '4', starttime: this.starttime3, endtime: this.endtime3 }, { lessonN: '5', starttime: this.starttime4, endtime: this.endtime4 }, { lessonN: '6', starttime: this.starttime5, endtime: this.endtime5 }, { lessonN: '7', starttime: this.starttime6, endtime: this.endtime6 }, { lessonN: '8', starttime: this.starttime7, endtime: this.endtime7 }, { lessonN: '9', starttime: this.starttime8, endtime: this.endtime8 }, { lessonN: '10', starttime: this.starttime9, endtime: this.endtime9 }, { lessonN: '11', starttime: this.starttime10, endtime: this.endtime10 }, { lessonN: '12', starttime: this.starttime11, endtime: this.endtime11 }]
      for (let i = 0; i < a.length; i++) {
        if (a[i].starttime != '') {
          console.log(a[i])
        }
      }
    }
  }
}
</script>

<style scoped>
  .title-org{
    position: relative;
    top: -41px;
    left: 71px;
  }
  ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .content-text{
    width: 220px;
    height:174px;
    border:1px solid #000;
    margin:5px
  }
  .content-title{
    text-align: center;
    padding: 15px;
    font-size: 18px;
    font-weight: 700;
    color: #1ABC9C;
  }
  .content-t{
    text-align: center;
    padding: 10px;
    font-size: 15px;
    background: #F5F5F5;
    min-height: 102px;
    cursor: pointer;
  }
  .content-t p{
    margin:0px;
  }
</style>

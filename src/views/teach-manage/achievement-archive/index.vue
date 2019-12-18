<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
          <avue-crud :permission="permission" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="false" :data="tableList" :option="option" v-model="obj">
            <template slot="searchMenu">
              <el-button v-if="permission.addBtn" type="success" @click.stop="handleAdd()" icon="el-icon-plus" size="small">新建</el-button>
              <el-button v-if="permission.import" type="warning" icon="el-icon-download" size="small">导入</el-button>
              <el-button v-if="permission.batchDelBtn" @click="batchDel" type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
              <el-button @click="initList()" type="info" icon="el-icon-refresh" size="small" circle></el-button>
            </template>
           </avue-crud>
      </div>
     <div v-loading="tableListLoading" class="basic-container" style="background: white;padding: 8px 0px;border-radius: 0">
       <h4 style="margin-left: 20px;">成绩报表统计</h4>
       <ve-histogram :series="classStoreData.series" height="400px" :colors="classStoreData.settings.colors" :data="classStoreData" :settings="classStoreData.settings"></ve-histogram>
       <ul class="info-list">
         <li>
           <div class="title">最高分</div>
           <div class="score">{{scoreInfo.maxScore || ''}}</div>
         </li>
         <li>
           <div class="title">最低分</div>
           <div class="score">{{scoreInfo.minScore || ''}}</div>
         </li>
         <li>
           <div class="title">总分</div>
           <div class="score">{{scoreInfo.totalScore || ''}}</div>
         </li>
         <li>
           <div class="title">平均分</div>
           <div class="score">{{scoreInfo.avgScore || ''}}</div>
         </li>
       </ul>
       
     </div>
    </div>
  </div>
</template>

<script>
import tableCommon from '@/mixins/table-common'
import permission from '@/mixins/permission'
import { queryClassScore } from '@/api/achievementManageApi'
import { phoneReg, credNumReg } from '@/utils/validate'
import { getOrgan, getDictById } from '@/utils'
import _ from 'lodash'

const genderDict = getDictById('gender')
const examType = getDictById('examType')

export default {
  name: 'achievementArchive',
  mixins: [tableCommon, permission],
  data() {
    return {
      fn: queryClassScore,
      data: [],
      classStoreData: {
        settings: {
          itemStyle: {
            barBorderRadius: [20, 20, 20, 20]
          },
          colors: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#61A6FF' 
            }, {
              offset: 1, color: '#1B7BFE'
            }],
            global: false // 缺省为 false
          }]
        },
        columns: ['分段', '人数'],
        rows: [
        ]
      },
      scoreInfo: {

      },
      scoreMap: {
        fullMarks: '100',
        ninetyPoints: '90-99',
        eightPoints: '80-89',
        seventyPoints: '70-79',
        sixtyPoints: '60-69',
        fail: '不及格'
      },
      option: {
        height: '120px',
        column: [
          {
            label:'id',
            prop:'id',
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label:'100',
            prop:'fullMarks',
            span: 24,
          },
          {
            label:'90-99',
            prop:'ninetyPoints',
            span: 24,
          },
          {
            label:'80-89',
            prop:'eightPoints',
            span: 24,
          },
          {
            label:'70-79',
            prop:'seventyPoints',
            span: 24,
          },
          {
            label: '60-69',
            prop: 'sixtyPoints'
          },
          {
            label: '不及格',
            prop: 'fail'
          },
          {
            label: '所属班级',
            prop: 'orgName',
            hide: true,
            type: 'cascader',
            span: 24,
            search: true,
            dicData: getOrgan(),
            props: {
              label: 'orgName',
              value: 'orgName'
            },
            rules: {
              required: true,
              message: '班级是必填项'
            }
          }, {
            label: '学期',
            prop: 'semesterName',
            hide: true,
            type: 'select',
            span: 24,
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/semester/queryAll',
            dicMethod: 'post',
            dicQuery:{
              page: 1,
              rows: 100000,
            },
            props: {
              res: 'data.list',
              label: 'name',
              value: 'name'
            },
            rules: {
              required: true,
              message: '学期是必填项'
            }
          }, {
            label: '科目',
            prop: 'course',
            type: 'select',
            span: 24,
            search: true,
            dicUrl: process.env.VUE_APP_BASE_API + '/zhxyx/course/queryAll',
            hide: true,
            dicMethod: 'post',
            dicQuery:{
              page: 1,
              rows: 100000,
            },
            props: {
              res: 'data.list',
              label: 'name',
              value: 'name'
            },
            rules: {
              required: true,
              message: '科目是必填项'
            }
          }, {
            label: '考试批次',
            prop: 'examType',
            span: 24,
            type: 'select',
            hide: true,
            search: true,
            dicData: examType,
            props: {
              value: 'label'
            },
            rules: {
              required: true,
              message: '考试批次是必填项'
            }
          }, {
            label: '老师',
            prop: 'teacherName',
            span: 24,
            hide: true,
            type: 'select',
          }
        ]
      },
      obj: {}
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {
    handleAdd() {
      this.$refs.crud.rowAdd()
    },
    rowDel(row, index) {
      
    },
    processData(data) {
      let score = data[0]
      let barData = _.map(this.scoreMap, (n, i) => {
        return {
          '分段': n,
          '人数': score[i] || ''
        }
      })
      this.classStoreData.rows = barData
      this.scoreInfo = score
      return data
    },
    async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
        console.log(result)
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      loading(true)
      try {
        row.facePicFile = row.facePicFile&&row.facePicFile.length ? row.facePicFile[0].value : ''
        await this.resetList()
        done()
      } catch(err) {
        console.log(err)
        loading(false)
      }
      
    },
  }
}
</script>

<style scoped lang="less">
.info-list {
  list-style: none;
  margin: 10px;
  padding: 0;
  display: flex;
  background: #f3f4f6;
  padding: 10px;
  li {
    flex: 1;
    text-align: center;
    border-right: 1px solid #dcdcdc;
    .title {
      font-size: 14px;
    }
    .score {
      font-size: 18px;
      margin-top: 12px;
    }
  }
}
</style>
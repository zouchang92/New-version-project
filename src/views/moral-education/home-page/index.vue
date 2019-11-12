<template>
    <el-row style="padding: 15px" :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          <el-card>
            <div slot="header" class="clearfix">
              <span>德育指标</span>
              <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <el-tree :props="treeData.props" :data="treeData.data" v-loading="treeData.loading">
            
            </el-tree>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>学生奖惩</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <ve-ring v-if="!performanceData.loading" v-loading="performanceData.loading" height="300px" :graphic="performanceData.settings.graphic" :series="performanceData.series" :colors="performanceData.settings.colors" :settings="performanceData.settings" :data="performanceData"></ve-ring>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>学生德育分数</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <ve-histogram :xAxis="studentPointData.settings.xAxis" :yAxis="studentPointData.settings.yAxis" height="300px" :data="studentPointData" :settings="studentPointData.settings"></ve-histogram>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content">
        
            <el-card>
                <div slot="header" class="clearfix">
                  <span>班级德育报表</span>
                  
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                  <el-select size="small" style="float: right; margin: 0 16px; width: 100px"  />
                </div>
                <ve-histogram :series="classMoralData.series" height="300px" :colors="classMoralData.settings.colors" :data="classMoralData" :settings="classMoralData.settings"></ve-histogram>
              </el-card>
         
        </div>
      </el-col>
    </el-row>
</template>

<script>
import { queryStudentStatus } from '@/api/moralHomeApi'
import { queryMoralTree } from '@/api/moralPointManageApi'
import StudentPerformanceChart from '../components/StudentPerformanceChart'
export default {
  data() {
    return {
      treeData: {
        loading: true,
        data: [],
        props: {
          label: 'title',
          value: 'id',
          children: 'child'
        }
      },
      performanceData: {
        loading: true,
        settings: {
          offsetY: 150,
          legend: {
    
          },
          graphic: [{
            type:'text',
            left:'center',
            top:'42%',
            style:{
                text:'',
                fill:'#000',
                width:30,
                height:30,
                fontSize:30,
            }
          }, {
            type:'text',
            left:'center',
            top:'52%',
            style:{
                text:'学生总人数',
                fill:'#000',
                width:30,
                height:30,
                fontSize:14,
            }
          }],
          label: {
            formatter: (e, a, b) => {
              return `${e.value}(${e.percent}%)`
            }
          },
          radius: [60, 90],
          colors: ['#3AA1FF', '#F2637B']
        },
        columns: ['类型', '人数'],
        rows: [
          { '类型': '加分人数', '人数': 0  },
          { '类型': '减分人数', '人数': 0 },
        ]
      },
      studentPointData: {
        settings: {
          yAxis: {
            type: 'category',
            data: ['最高分', '最低分', '平均分']
          },
           xAxis:  {
             type: 'value'
          },
        },
        columns: ['类型', '分数'],
        rows: [
          {'类型': '最高分', '分数': 15},
          {'类型': '最低分', '分数': 7},
          {'类型': '平均分', '分数': 8}
        ]
      },
      classMoralData: {
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
        columns: ['班级', '分数'],
        rows: [
          {'班级': '一年级1班', '分数': 15},
          {'班级': '一年级2班', '分数': 12},
          {'班级': '一年级3班', '分数': 11},
          {'班级': '一年级5班', '分数': 10},
          {'班级': '一年级6班', '分数': 9},
          {'班级': '一年级7班', '分数': 8},
          {'班级': '一年级8班', '分数': 5}
        ]
      }
    }
  },
  mounted() {
    this.getStudentData()
    this.getPointTree()
  },
  methods: {
    async getPointTree() {
      this.treeData.loading = true
      try {
        let tree = await queryMoralTree({})
        this.treeData.data = tree.data.list
        this.treeData.loading = false
      } catch(err) {
        this.treeData.loading = false
      }
    },
    async getStudentData() {
      this.performanceData.loading = true
      try {
        let res = await queryStudentStatus()
        const { data } = res
        this.performanceData.rows[0]['人数'] = data[1]
        this.performanceData.rows[1]['人数'] = data[false]
        this.performanceData.settings.graphic[0].style.text = data[1] + data[false]
        this.performanceData.loading = false
      } catch(err) {
        this.performanceData.loading = false
      }
    }
  },
  components: {
    StudentPerformanceChart
  }
}
</script>
<style lang="scss">
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    background-color: #ffffff
  }
  .el-col {
    border-radius: 4px;
  }
</style>
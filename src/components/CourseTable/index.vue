<template>
  <div class="course-table">
    <div class="course-wrapper">
      <div class="course-head" style="overflow:hidden">
        <div :class="`course-head-${i+1} course-item`" v-for="(item, i) in weekData" :key="i">
          {{item.label}}
        </div>
      </div>
      <div class="course-lefthand">
        <div class="left-hand-TextDom" style="height: 29px; box-sizing: border-box;"></div>
        <div :class="`left-hand-${i} left-hand-item`" v-for="(item, i) in sortCourseTime" :key="i">
          <p class="left-hand-index">
            第{{item.lessonN}}节
          </p>
          <p class="left-hand-name">
            {{item.starttime}}
          </p>
        </div>
      </div>
      <div class="course-content">
        <ul v-for="(item, i) in sortCourseTime" :key="i" :class="`stage-${i} stage-item`">
          <li v-for="(n, x) in weekData" :key="x" class="stage-sub-item">
            <span :style="{backgroundColor: lesson.backgroundColor}" v-if="(lesson.lessonN === item.lessonN) && (lesson.weekN === (x+1))" v-for="(lesson, index) in courseWithPalette">
              {{lesson.courseName}}
              <p v-for="(item, i) in displayParams">
                {{item.name}}:{{lesson[item.value]}}
              </p>
              
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
export default {
  data() {
   return {
     palette: ["#f05261", "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#52db9a", "#3f51b5", "#f3d147", "#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"],
     weekData: [{
       value: '',
       label: '周一'
     }, {
       value: '',
       label: '周二'
     }, {
       value: '',
       label: '周三'
     }, {
       value: '',
       label: '周四'
     }, {
       value: '',
       label: '周五'
     }, {
       value: '',
       label: '周六'
     }, {
       value: '',
       label: '周日'
     }],
     paletteIndex: 0
   }
  },
  computed: {
    sortCourseTime() {
      return _.chain(this.courseTime).sortBy(n => n.lessonN).map(n => ({
        ...n,
        starttime: moment(n.starttime).format('HH:mm')
      })).value()
    },
    courseWithPalette() {
      const { courseData, palette, paletteIndex } = this
      let listMerge = []
      let courseWithPalette = _.map(courseData, n => {
        if (paletteIndex > palette.length) {
          paletteIndex = 0
        }
        this.paletteIndex ++
        return {
          ...n,
          backgroundColor: palette[this.paletteIndex]
        }
      })
      return courseWithPalette
    }
  },
  mounted() {
    
  },
  props: {
    courseTime: {
      type: Array,
    },
    displayParams: {
      type: Array,
      default: [{
        name: '任课教师',
        value: 'teacherName'
      }, {
        name: '教室',
        value: 'classroomName'
      }]
    },
    courseData: {
      type: Array
    },
    merge: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.course-table {
  .course-wrapper {
    position: relative;
    padding-left: 40px;
    border: 1px solid rgb(219, 219, 219);
    .course-head {
      background-color: #f2f6f7;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
      .course-item {
        float: left;
        box-sizing: border-box;
        white-space: nowrap;
        border-left: none !important;
        width: 14.285%;
        text-align: center;
        font-size: 14px;
        line-height: 28px;
      }
    }
    .course-lefthand {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 40px;
      font-size: 12px;
      > div {
        padding-top: 25px;
        border-bottom: 1px dashed rgb(219, 219, 219);
        &:last-child {
          border-bottom: none !important;
        }
      }
      .left-hand-TextDom {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        background-color: #f2f6f7;
      }
      .left-hand-item {
        width: 100%;
        height: 75px;
        box-sizing: border-box;
        p {
          margin: 0px;
          text-align: center;
          font-weight: 900;
        }
        .left-hand-name {
          color: #666;
        }
        .left-hand-index {
          color: #9c9c9c;
          margin-bottom: 4px !important;
        }
      }
    }
    .course-content {
      li {
        text-align: center;
        color: #666666;
        font-size: 14px;
        line-height: 50px;
      }
      .stage-item {
        list-style: none;
        padding: 0px;
        margin: 0px;
        min-height: 75px;
        border-bottom: 1px dashed rgb(219, 219, 219);
        box-sizing: border-box;
        .stage-sub-item {
          float: left;
          width: 14.285%;
          height: 75px;
          box-sizing: border-box;
          position: relative;
          p {
            margin: 0;
          }
          span {
            position: absolute;
            z-index: 9;
            width: 100%;
            height: 75px;
            left: 0px;
            top: 0px;
            color: rgb(255, 255, 255);
            padding: 6px 2px;
            box-sizing: border-box;
            line-height: 18px;
            border-radius: 4px;
            white-space: normal;
            word-break: break-all;
            cursor: pointer;
          }
        }
        &:last-child {
          border-bottom: none !important;
        }
      }

    }
  }
}
</style>
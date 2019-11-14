<template>
  <div class="Classroom-assessment">
    <div class="Classroom-title">
      <div class="title-cl">
        <p>班级:</p>
        <el-select v-model="value" placeholder="请选择班级">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="title-bn">
        <span style="padding-right: 24px;padding-left: 20px;">评审周期:</span>
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in citie"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:26px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-upload" size="small">导出</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">打印</el-button>
      </div>
    </div>
    <cl-row>
      <el-col :span="11" style="height:826px;padding-left: 16px;">
        <div class="classroom">
          <p style="margin:0px;padding:15px;">班级课程表</p>
          <CourseTable
            style="height:777px;"
            :merge="true"
            :courseTime="courseTime"
            :courseData="courseData"
          />
        </div>
      </el-col>
      <el-col :span="12" style="height:826px;background:#fff;margin-left:20px;">
        <div class="classroom-right">
          <p>班级学生</p>
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
    </cl-row>
  </div>
</template>
<script>
import CourseTable from "@/components/CourseTable";
export default {
  components: {
    CourseTable
  },
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      citie: [{ label: "按天平" }],
      cities: [
        {
          label: "三年级二班"
        },
        {
          label: "三年级五班"
        }
      ],
      value: "",
      value1: "",
      activeName: "first",
      courseTime: [
        {
          lessonN: 2,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 1,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 3,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 4,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 5,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 6,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 7,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        },
        {
          lessonN: 8,
          weekN: 1498,
          endtime: 3173253239395,
          id: "fD5",
          starttime: 2976655741205,
          orgId: "ncNEdUd"
        }
      ],
      courseData: [
        {
          lessonN: 2,
          weekN: 1,
          classId: "5SFmmlBTh",
          courseName: "大学英语(Ⅳ)@10203",
          teacherId: "sBb",
          teacherName: "老师名称",
          classroomName: "教室1",
          days: 901482848872,
          classroomId: "P16ws",
          className: "班级1",
          courseId: "RrG1"
        },
        {
          lessonN: 3,
          weekN: 1,
          classId: "5SFmmlBTh",
          courseName: "大学英语(Ⅳ)@10203",
          teacherId: "sBb",
          teacherName: "老师名称1",
          classroomName: "教室2",
          days: 901482848872,
          classroomId: "P16ws",
          className: "班级1",
          courseId: "RrG1"
        },
        {
          lessonN: 2,
          weekN: 5,
          classId: "5SFmmlBTh",
          courseName: "模拟电子技术基础@16204",
          teacherId: "sBb",
          teacherName: "老师名称2",
          classroomName: "教室3",
          days: 901482848872,
          classroomId: "P16ws",
          className: "班级2",
          courseId: "RrG"
        },
        {
          lessonN: 3,
          weekN: 5,
          classId: "5SFmmlBTh",
          courseName: "电路、信号与系统实验",
          teacherId: "sBb",
          teacherName: "老师名称3",
          classroomName: "教室4",
          days: 901482848872,
          classroomId: "P16ws",
          className: "班级2",
          courseId: "RrG"
        }
      ]
    };
  },
  methods: {
    loadAll() {
      return;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>
<style lang="scss" scoped>
.Classroom-assessment {
  height: 1200px;
  background: #eee;
  .Classroom-title {
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    margin: 15px;
    display: flex;
    .title-cl {
      display: flex;
      margin-top: 17px;
      margin-left: 20px;
    }
  }
  .classroom {
    background: #fff;
  }
  .classroom-right {
    display: flex;
    border-bottom: 1px solid;
    p {
      padding-left: 10px;
      padding-right: 200px;
    }
  }
}
</style>
<style >
.title-bn .el-input__suffix {
  top: 10px;
  right: 2px;
}
.classroom-right .el-autocomplete {
        padding-top: 11px;
}
.classroom-right .el-input__inner {
    height: 32px;
}
</style>
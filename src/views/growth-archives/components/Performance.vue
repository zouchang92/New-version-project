<template>
  <div class="Performance">
    <div style="height:370px;background:#fff;border-radius:1px;padding:15px;">
      <div class="Performance-top">
        <div class="top-title">
          <span>2019学年上学期课堂表现</span>
        </div>
        <div class="top-content">
          <div class="top-photo">
            <img
              :src="option.photo"
              alt
            >
            <span class="top-name">姓名：{{ option.userName }}</span>
            <span class="top-numb">学号：{{ option.studentNum }}</span>
          </div>
          <div class="top-Average">
            <span>表现平均分：</span>
            <h3>{{ option.avgScore | numFilter }}</h3>
          </div>
          <div class="top-right">
            <div style="position: absolute;top: 34px;left: -227px;">
              <star-rating
                v-model="rating"
                :star-size="20"
                show-rating
                rtl
                read-only
                :max-rating="rating"
              />
              <star-rating
                v-model="rating1"
                style="margin-top:30px"
                :star-size="20"
                read-only
                show-rating
                rtl
                :max-rating="rating1"
              />
              <star-rating
                v-model="rating2"
                style="margin-top:27px"
                :star-size="20"
                read-only
                show-rating
                rtl
                :max-rating="rating2"
              />
              <star-rating
                v-model="rating3"
                style="margin-top:26px"
                :star-size="20"
                read-only
                show-rating
                rtl
                :max-rating="rating3"
              />
              <star-rating
                v-model="rating4"
                style="margin-top:25px"
                :star-size="20"
                show-rating
                rtl
                read-only
                :max-rating="rating4"
              />
            </div>
            <span>课堂纪律</span>
            <el-progress
              style="padding-top:16px;"
              :percentage="option.disciplineScore | numFilter"
              stroke-width="13"
              :format="format"
              color="#F2BB46"
            />
            <span>上课专注</span>
            <el-progress
              style="padding-top:16px;"
              :percentage="option.concentrationScore | numFilter"
              :format="format"
              stroke-width="13"
              color="#F2BB46"
            />
            <span>问答活跃</span>
            <el-progress
              style="padding-top:16px;"
              :percentage="option.activeScore | numFilter"
              :format="format"
              stroke-width="13"
              color="#F2BB46"
            />
            <span>随堂笔记情况</span>
            <el-progress
              style="padding-top:16px;"
              :percentage="option.noteScore | numFilter"
              stroke-width="13"
              :format="format"
              color="#F2BB46"
            />
            <span>作业情况</span>
            <el-progress
              style="padding-top:16px;"
              :percentage="option.homeworkScore | numFilter"
              :format="format"
              stroke-width="13"
              color="#F2BB46"
            />
          </div>
        </div>
      </div>
    </div>
    <div style="height:590px;background:#fff;margin-top:20px;border-radius:1px;overflow: auto;">
      <div class="Performance-bottom">
        <div class="bottom-title">
          <span>三年二班{{ option.userName }}课堂表现</span>
        </div>
        <div class="bottom-content">
          <ul>
            <li v-for="(item,i) in List" :key="i" style="position:relative">
              <div class="content-l">
                <img
                  style="height:48px;width:48px;border-radius:50%;"
                  src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                  alt
                >
                <p class="name">{{ item.courseTea }}</p>
                <p class="subject">{{ item.course }}</p>
                <p class="data">点评时间</p>
                <p class="stardata">{{ item.createTime | formatTS }}</p>
                <p class="Average">平均分</p>
                <p class="branch">{{ item.activeScore }}</p>
                <p class="discipline">课堂纪律</p>
                <star-rating
                  v-model="rating"
                  class="discipline-l"
                  :star-size="20"
                  show-rating
                  read-only
                  :max-rating="rating"
                />
                <p class="Absorbed">上课专注</p>
                <star-rating
                  v-model="rating"
                  class="Absorbed-l"
                  :star-size="20"
                  read-only
                  show-rating
                  :max-rating="rating"
                />
                <p class="active">问答活跃</p>
                <star-rating
                  v-model="rating"
                  class="active-l"
                  :star-size="20"
                  read-only
                  show-rating
                  :max-rating="rating"
                />
                <p class="note">随堂笔记情况</p>
                <star-rating
                  v-model="rating"
                  class="note-l"
                  :star-size="20"
                  read-only
                  show-rating
                  :max-rating="rating"
                />
                <p class="work">作业情况</p>
                <star-rating
                  v-model="rating"
                  class="work-l"
                  :star-size="20"
                  read-only
                  show-rating
                  :max-rating="rating"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from 'vue-star-rating'
import { formatDate } from '@/api/date.js'
import { stuLesson, listStucompre } from '@/api/growthArchivesApi'
export default {
  components: {
    StarRating
  },
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    },
    numFilter(value) {
      let realVal = ''
      if (value) {
        const tempVal = parseFloat(value).toFixed(2)
        realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  data() {
    return {
      rating: 4,
      rating1: 3,
      rating2: 4,
      rating3: 5,
      rating4: 4,
      value: 5,
      customColor: '#F2BB46',
      List: {},
      option: {
        userName: ''
      }
    }
  },
  computed: {
  },
  created() {
    this.getLesson()
    this.get()
  },
  mounted() {
  },
  methods: {
    async getLesson() {
      try {
        const list = await stuLesson({})
        this.List = list.data.list
        // console.log(this.List)
      } catch (err) {
        console.log(err)
      }
    },
    async get() {
      try {
        const semesterName = '2019年上学期'
        const orgName = '三年二班'
        const studentName = '张三'
        const list = await listStucompre({ semesterName, orgName, studentName })
        this.option = list.data
        console.log(this.option)
      } catch (err) {
        console.log(err)
      }
    },
    format(percentage) {
      return percentage === 100 ? '100' : `${percentage}分`
    }
  }
}
</script>
<style lang="scss" scoped>
.Performance {
  height: 1600px;
  background: #eee;
  .Performance-top {
    position: relative;
    .top-title {
      border-bottom: 1px solid hsl(230, 23%, 95%);
      padding-bottom: 12px;
      padding-left: 13px;
    }
    .top-content {
      display: flex;
      .top-photo {
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          position: absolute;
          top: 73px;
          left: 64px;
        }
        .top-name {
          position: absolute;
          top: 198px;
          left: 55px;
        }
        .top-numb {
          position: absolute;
          top: 232px;
          left: 55px;
        }
      }
      .top-Average {
        position: absolute;
        top: 73px;
        left: 320px;
        span {
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(43, 50, 54, 1);
        }
        h3 {
          font-size: 50px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(240, 151, 24, 1);
          margin: 0px;
          margin-top: 20px;
          margin-left: 10px;
        }
      }
      .top-right {
        position: absolute;
        left: 723px;
        width: 40%;
        span {
          position: relative;
          top: 35px;
          left: -102px;
        }
      }
    }
  }
  .Performance-bottom {
    position: relative;
    .bottom-title {
      border-bottom: 1px solid hsl(230, 23%, 95%);
      padding: 16px;
    }
    .bottom-content {
      ul {
        list-style: none;
        li {
          padding: 15px;
          border-bottom: 1px solid hsl(230, 23%, 95%);
          margin-right: 22px;
          .content-l {
            display: flex;
            .name {
              padding-left: 20px;
              margin: 0px;
              width: 140px;
              overflow: hidden;
            }
            .subject {
              position: absolute;
              top: 34px;
              left: 81px;
            }
            .data {
              position: absolute;
              top: 0px;
              left: 228px;
            }
            .stardata {
              position: absolute;
              top: 34px;
              left: 228px;
            }
            .Average {
              position: absolute;
              top: 0px;
              left: 437px;
            }
            .branch {
              position: absolute;
              top: 30px;
              left: 437px;
            }
            .discipline {
              position: absolute;
              top: 0px;
              left: 582px;
            }
            .discipline-l {
              position: absolute;
              top: 42px;
              left: 582px;
            }
            .Absorbed {
              position: absolute;
              top: 0px;
              left: 714px;
            }
            .Absorbed-l {
              position: absolute;
              top: 43px;
              left: 714px;
            }
            .active {
              position: absolute;
              top: 0px;
              left: 847px;
            }
            .active-l {
              position: absolute;
              top: 43px;
              left: 847px;
            }
            .note {
              position: absolute;
              top: 0px;
              left: 979px;
            }
            .note-l {
              position: absolute;
              top: 43px;
              left: 979px;
            }
            .work {
              width: 120px;
              position: absolute;
              top: 0px;
              left: 1146px;
            }
            .work-l {
              position: absolute;
              top: 43px;
              left: 1146px;
            }
          }
        }
      }
    }
  }
}
</style>
<style >
.vue-star-rating-rating-text {
  display: none;
}
.Performance .Performance-top .top-content .top-right .el-progress__text{
  font-size: 14px !important;
}
</style>

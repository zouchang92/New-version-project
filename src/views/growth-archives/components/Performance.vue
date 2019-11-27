<template>
  <div class="Performance">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="height:370px;background:#fff;border-radius:1px;padding:15px;"
      >
        <div class="Performance-top">
          <div class="top-title">
            <span>2019学年上学期课堂表现</span>
          </div>
          <div class="top-content">
            <div class="top-photo">
              <img
                src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                alt
              />
              <span class="top-name">姓名：张家辉</span>
              <span class="top-numb">学号：20170828291</span>
            </div>
            <div class="top-Average">
              <span>表现平均分：</span>
              <h3>86.3</h3>
            </div>
            <div class="top-right">
              <div style="position: absolute;top: 34px;left: -227px;">
                <star-rating
                  star-size=20
                  show-rating="false"
                  rtl=true
                  read-only
                  v-model="rating"
                  v-bind:max-rating="rating"
                ></star-rating>
                <star-rating
                  style="margin-top:30px"
                  star-size=20
                  read-only
                  show-rating="false"
                  rtl=true
                  v-model="rating1"
                  v-bind:max-rating="rating1"
                ></star-rating>
                <star-rating
                  style="margin-top:27px"
                  star-size=20
                  read-only
                  show-rating="false"
                  rtl=true
                  v-model="rating2"
                  v-bind:max-rating="rating2"
                ></star-rating>
                <star-rating
                  style="margin-top:26px"
                  star-size=20
                  read-only
                  show-rating="false"
                  rtl=true
                  v-model="rating3"
                  v-bind:max-rating="rating3"
                ></star-rating>
                <star-rating
                  style="margin-top:25px"
                  star-size=20
                  show-rating="false"
                  rtl=true
                  read-only
                  v-model="rating4"
                  v-bind:max-rating="rating4"
                ></star-rating>
              </div>
              <span>语文、数学</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="100"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>物理</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="80"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>英语</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="60"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>化学</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="40"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
              <span>音乐</span>
              <el-progress
                style="padding-top:16px;"
                :percentage="20"
                stroke-width="13"
                color="#F2BB46"
              ></el-progress>
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="height:590px;background:#fff;margin-top:20px;border-radius:1px;"
      >
        <div class="Performance-bottom">
          <div class="bottom-title">
            <span>三年级二班蔡启超课堂表现</span>
          </div>
          <div class="bottom-content">
            <ul>
              <li>
                <div class="content-l">
                  <img
                    style="height:48px;width:48px;border-radius:50%;"
                    src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                    alt
                  />
                  <p class="name">唐国强</p>
                  <p class="subject">语文老师</p>
                  <p class="data">点评时间</p>
                  <p class="stardata">2019-09-11 16:00</p>
                  <p class="Average">平均分</p>
                  <p class="branch">100分</p>
                  <p class="discipline">课堂纪律</p>
                  <star-rating
                    class="discipline-l"
                    star-size=20
                    show-rating=false
                    v-model="rating"
                    v-bind:max-rating="rating"
                  ></star-rating>
                  <p class="Absorbed">上课专注</p>
                  <star-rating
                    class="Absorbed-l"
                    star-size=20
                    read-only
                    show-rating=false
                    v-model="rating"
                    v-bind:max-rating="rating"
                  ></star-rating>
                  <p class="active">问答活跃</p>
                  <star-rating
                    class="active-l"
                    star-size=20
                    read-only
                    show-rating=false
                    v-model="rating"
                    v-bind:max-rating="rating"
                  ></star-rating>
                  <p class="note">随堂笔记情况</p>
                  <star-rating
                    class="note-l"
                    star-size=20
                    read-only
                    show-rating=false
                    v-model="rating"
                    v-bind:max-rating="rating"
                  ></star-rating>
                  <p class="work">作业情况</p>
                  <star-rating
                    class="work-l"
                    star-size=20
                    read-only
                    show-rating=false
                    v-model="rating"
                    v-bind:max-rating="rating"
                  ></star-rating>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import { stuLesson} from '@/api/growthArchivesApi'
export default {
  components: {
    StarRating
  },
  data() {
    return {
      rating: 5,
      rating1: 4,
      rating2: 3,
      rating3: 2,
      rating4: 1,
      value: 5,
      customColor: "#F2BB46"
    };
  },
  mounted(){

  },
  methods: {
    async getLesson() {
      try {
        let list = await stuLesson({studentName})
        console.log(123)
      } catch(err) {
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.Performance {
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
        left: 750px;
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
            }
            .subject {
              position: absolute;
              top: 100px;
              left: 122px;
            }
            .data {
              margin: 0px;
              padding-left: 82px;
            }
            .stardata {
              position: absolute;
              top: 100px;
              left: 254px;
            }
            .Average {
              margin: 0px;
              padding-left: 140px;
            }
            .branch {
              position: absolute;
              top: 100px;
              left: 458px;
            }
            .discipline {
              margin: 0px;
              padding-left: 99px;
            }
            .discipline-l {
              position: absolute;
              top: 113px;
              left: 605px;
            }
            .Absorbed {
              margin: 0px;
              padding-left: 69px;
            }
            .Absorbed-l {
              position: absolute;
              top: 113px;
              left: 738px;
            }
            .active {
              margin: 0px;
              padding-left: 69px;
            }
            .active-l {
              position: absolute;
              top: 113px;
              left: 871px;
            }
            .note {
              margin: 0px;
              padding-left: 69px;
            }
            .note-l {
              position: absolute;
              top: 113px;
              left: 1004px;
            }
            .work {
              margin: 0px;
              padding-left: 69px;
            }
            .work-l {
              position: absolute;
              top: 113px;
              left: 1137px;
            }
          }
        }
      }
    }
  }
}
</style>
<style >
.el-progress__text,
.vue-star-rating-rating-text {
  display: none;
}
</style>
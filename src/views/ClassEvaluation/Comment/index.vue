<template>
  <div class="Comment">
    <div class="title">
      <div class="title-text" @click="esc">
        <p class="title-left">
          <i class="el-icon-arrow-left" />
        </p>
        <p class="esc">返回至上一页</p>
      </div>
    </div>
    <div :id="data.statistical.reviewId" class="content">
      <el-row :gutter="10">
        <el-col
          :xs="17"
          :sm="17"
          :md="17"
          :lg="17"
          :xl="17"
          style="padding-left: 19px;padding-right: 10px;"
        >
          <div class="content-left" style="height: 1979px;">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div style="background:#fff;height:814px;position:relative;">
                  <video
                    controls="controls"
                    style="width:100%; height:740px;object-fit:fill"
                    src="https://media.w3.org/2010/05/sintel/trailer.mp4"
                  />
                  <div class="brief">
                    <p class="brief-title">{{ data.name }}</p>
                    <div class="category">
                      <p class="category-text">
                        <i style="margin-right:8px;" class="el-icon-menu" />{{
                          data.resourcesName
                        }}
                      </p>
                    </div>
                    <div class="data">
                      <p class="data-text">
                        <i
                          style="margin-right:16px;"
                          class="el-icon-date"
                        />2019-10-25
                      </p>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div style="background:#fff;height:453px;margin-top:15px;">
                  <div class="evaluate">
                    <div class="evaluate-title">
                      <p class="title-text">评价</p>
                    </div>
                    <div class="evaluate-content">
                      <div class="evaluate-rate" style="display:flex;">
                        <div class="thinking">
                          <span class="thinking-title">教学思路清晰:</span>
                          <el-rate v-model="value1" />
                        </div>
                        <div class="Standard">
                          <span class="Standard-title">教学程序规范完善:</span>
                          <el-rate v-model="value2" />
                        </div>
                        <div class="structure">
                          <span class="structure-title">课堂结构内容:</span>
                          <el-rate v-model="value3" />
                        </div>
                        <div class="prominent">
                          <span class="prominent-title">教学重点突出:</span>
                          <el-rate v-model="value4" />
                        </div>
                        <div class="vivid">
                          <span class="vivid-title">教学内容生动:</span>
                          <el-rate v-model="value5" />
                        </div>
                      </div>
                      <el-input
                        v-model="textarea"
                        type="textarea"
                        placeholder="请留下你的评语"
                        clearable
                        maxlength="240"
                        resize="none"
                        show-word-limit
                      />

                      <el-button
                        class="evaluate-content-button"
                        type="primary"
                        @click="submitadd"
                      >提交</el-button>
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
                style="position:relative"
              >
                <div style="background:#fff;height:684px;margin-top:15px;overflow: auto;overflow-x: hidden">
                  <!-- <div class="All-comments">
                    <p class="All-title">全部评论 ({{ data.evaluation.totalCount }})</p>
                    <el-pagination
                      style="position: absolute;top: 31px;right: 23px;"
                      :current-page="currentPage"
                      :page-sizes="[50, 100, 150, 200]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="data.evaluation.totalCount"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                    />
                  </div> -->
                  <Newlist :id="data.statistical.reviewId" ref="Newlist" />
                  <!-- <div class="All-content">
                    <ul>
                      <li
                        v-for="(item, index) in data.evaluation.list"
                        :key="index"
                      >
                        <img src="" alt="">
                        <p class="title-score">打了{{ item.score }}星</p>
                        <p class="name-operator">{{ item.operatorName }}</p>
                        <p class="content-operator">
                          {{ item.operatorContent }}
                        </p>
                      </li>
                    </ul>
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col
          :xs="7"
          :sm="7"
          :md="7"
          :lg="7"
          :xl="7"
          style="padding-right: 20px;"
        >
          <div class="content-right" style="background:#fff; height: 1979px;">
            <div class="Course-introduction">
              <div class="Course-title">
                <p class="title-text">课程简介</p>
              </div>
              <div class="Course-content">
                <span class="content-text">{{ data.description }}</span>
              </div>
            </div>
            <div class="Compere-introduction">
              <div class="Compere-title">
                <p class="title-text">主讲人简介</p>
              </div>
              <div class="Compere-content">
                <img class="Compere-img" :src="data.teacher.photo" alt>
                <p class="Compere-name">{{ data.teacher.userName }}</p>
                <p class="Compere-data">
                  {{ data.teacher.createTime | formatTS }}
                </p>
                <span class="Compere-text">{{ data.teacher.description }}</span>
              </div>
            </div>
            <div class="data-statistics">
              <div class="data-title">
                <p class="title-text">数据统计</p>
              </div>
              <div class="data-content">
                <div style="color:#7D7D7F">
                  观看人数:
                  <span style="color:red">{{ data.statistical.watchNum }}</span>
                </div>
                <div style="color:#7D7D7F;margin-top:10px;">
                  评论人数:
                  <span style="color:red">{{
                    data.statistical.evaluationNum
                  }}</span>
                </div>
                <div style="color:#7D7D7F;margin-top:10px;">
                  下载人数:
                  <span style="color:red">{{
                    data.statistical.downloadNum
                  }}</span>
                </div>
              </div>
            </div>
            <div class="Courseware-download">
              <div class="Courseware-title">
                <p class="title-text">课件下载</p>
              </div>
              <div class="download">
                <div class="download-name">
                  课件名称:
                  <span>{{ data.name }}</span>
                </div>
                <div style="margin-top:20px;">
                  <a href>点击下载</a>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { evaluation, getDetail } from '@/api/ClassEvaluationApi'
import { formatDate } from '@/api/date.js'
import Newlist from './news/Newlist'
export default {
  inject: ['reload'],
  components: {
    Newlist
  },
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      textarea: '',
      currentPage: 4,
      data: {},
      list: {}
    }
  },
  created() {
    this.data = this.$route.query.list
  },
  methods: {
    esc() {
      this.$router.go(-1)
      // console.log(this.$route.query.list)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    int() {
      this.value1 = null
      this.value2 = null
      this.value3 = null
      this.value4 = null
      this.value5 = null
      this.textarea = ''
    },
    async submitadd() {
      try {
        const reviewId = this.$route.query.list.statistical.reviewId
        const teachingWay = this.value1
        const teachingProgram = this.value2
        const classStructure = this.value3
        const importantPoints = this.value4
        const teachingContent = this.value5
        const operatorContent = this.textarea
        await evaluation({
          reviewId,
          teachingWay,
          teachingProgram,
          classStructure,
          importantPoints,
          teachingContent,
          operatorContent
        })
        this.$refs.Newlist.get()
        this.int()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Comment {
  height: 2100px;
  background: #eee;
  .title {
    background: #fff;
    height: 84px;
    margin: 15px;
    position: relative;
    .title-text {
      width: 124px;
      height: 32px;
      background: rgba(24, 144, 255, 1);
      border-radius: 4px;
      position: absolute;
      top: 24px;
      left: 32px;
    }
    .title-left {
      color: #fff;
      position: absolute;
      top: -8px;
      left: 9px;
    }
    .esc {
      color: #fff;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      position: absolute;
      top: -5px;
      left: 26px;
    }
  }
  .content {
    .content-left {
      .brief {
        display: flex;
        .brief-title {
          font-size: 22px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 47px;
          position: absolute;
          bottom: -9px;
          left: 35px;
        }
        .category {
          width: auto;
          height: 36px;
          border: 1px solid rgba(205, 205, 205, 1);
          border-radius: 4px;
          position: absolute;
          bottom: 16px;
          right: 239px;
          .category-text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(128, 128, 128, 1);
            line-height: 47px;
            margin-top: -5px;
            margin-left: 14px;
    margin-right: 14px;
          }
        }
        .data {
          width: 164px;
          height: 36px;
          border: 1px solid rgba(205, 205, 205, 1);
          border-radius: 4px;
          position: absolute;
          bottom: 16px;
          right: 47px;
          .data-text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(128, 128, 128, 1);
            line-height: 47px;
            position: absolute;
            bottom: -22px;
            right: 18px;
          }
        }
      }
      .evaluate {
        .evaluate-title {
          border-bottom: 1px solid #efefef;
          margin: 15px;
          .title-text {
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(21, 21, 21, 1);
            line-height: 40px;
            margin: 0px;
            padding: 8px 0px 8px 3px;
          }
        }
        .evaluate-content {
          height: 326px;
          background: #f4f5f9;
          margin: 15px;
          position: relative;
          .evaluate-rate {
            .thinking,
            .Standard,
            .structure,
            .prominent,
            .vivid {
              margin-top: 46px;
              margin-left: 35px;
            }
          }
        }
      }
    //   .All-comments {
    //     border-bottom: 1px solid #efefef;
    //     margin: 15px;
    //     .All-title {
    //       font-size: 20px;
    //       font-family: Source Han Sans CN;
    //       font-weight: bold;
    //       color: rgba(21, 21, 21, 1);
    //       line-height: 40px;
    //       margin: 0px;
    //       padding: 8px 0px 8px 3px;
    //     }
    //   }
    //   .All-content {
    //     ul {
    //       list-style: none;
    //       overflow: auto;
    //       li {
    //             height: 130px;
    //         p {
    //           margin: 0px;
    //         }
    //         .title-score {
    //           font-size: 18px;
    //           font-family: Source Han Sans CN;
    //           font-weight: 400;
    //           color: rgba(0, 0, 0, 1);
    //           line-height: 40px;
    //               position: relative;
    // top: -8px;
    // left: 258px;
    //         }
    //         .name-operator {
    //           font-size: 20px;
    //           font-family: Source Han Sans CN;
    //           font-weight: bold;
    //           color: rgba(0, 157, 255, 1);
    //           line-height: 40px;
    //               position: relative;
    // top: -50px;
    // left: 128px;
    //         }
    //         .content-operator {

    //           font-size: 18px;
    //           font-family: Source Han Sans CN;
    //           font-weight: 400;
    //           color: rgba(0, 0, 0, 1);
    //           line-height: 40px;
    //           background: rgb(244, 245, 249);
    //           position: relative;
    // top: -17px;
    // left: 124px;
    //         }
    //       }
    //     }
    //   }
    }
    .content-right {
      .Course-introduction {
        height: 600px;
        .Course-title {
          border-bottom: 1px solid #efefef;
          margin: 15px;
          margin-top: 0px;
          .title-text {
            margin: 0px;
            padding: 8px 0px 8px 3px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 40px;
          }
        }
        .Course-content {
          padding: 40px;
          padding-top: 0px;
          height: 501px;
          overflow: hidden;
          text-overflow: ellipsis;
          .content-text {
            font-size: 15px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(125, 125, 127, 1);
            line-height: 38px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 13;
            text-overflow: ellipsis;
          }
        }
      }
      .Compere-introduction {
        height: 350px;
        position: relative;
        .Compere-title {
          border-bottom: 1px solid #efefef;
          margin: 15px;
          margin-top: 0px;
          .title-text {
            margin: 0px;
            padding: 8px 0px 8px 3px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 40px;
          }
        }
        .Compere-content {
          padding: 25px;
          padding-top: 0px;
          .Compere-img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 10px;
          }
          .Compere-name {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(25, 25, 26, 1);
            line-height: 40px;
            margin: 0px;
            position: absolute;
            top: 84px;
            left: 147px;
          }
          .Compere-data {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(99, 99, 102, 1);
            line-height: 40px;
            margin: 0px;
            position: absolute;
            top: 119px;
            left: 147px;
          }
          .Compere-text {
            height: 161px;
            font-size: 15px;
            padding-right: 20px;
            overflow: hidden;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #7d7d7f;
            line-height: 38px;
            position: absolute;
            top: 174px;
            left: 29px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
          }
        }
      }
      .data-statistics {
        .data-title {
          border-bottom: 1px solid #efefef;
          margin: 15px;
          margin-top: 0px;
          .title-text {
            margin: 0px;
            padding: 8px 0px 8px 3px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 40px;
          }
        }
        .data-content {
          margin-left: 23px;
        }
      }
      .Courseware-download {
        margin-top: 20px;
        .Courseware-title {
          border-bottom: 1px solid #efefef;
          margin: 15px;
          margin-top: 0px;
          .title-text {
            margin: 0px;
            padding: 8px 0px 8px 3px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 40px;
          }
        }
        .download {
          margin: 15px;
          .download-name {
            color: #7d7d7f;
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            line-height: 38px;
            span {
              font-size: 18px;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #000;
              line-height: 38px;
            }
          }
          a {
            margin-top: 15px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            text-decoration: underline;
            color: rgba(31, 181, 243, 1);
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
<style>
.Comment .evaluate-content .el-textarea {
  position: absolute;
  top: 115px;
  padding-left: 28px;
  padding-right: 28px;
}
.Comment .evaluate-content .el-textarea__inner {
  height: 135px;
}
.Comment .el-textarea .el-input__count {
  right: 39px;
}
.evaluate-content-button {
  position: absolute;
  top: 267px;
  right: 28px;
}
</style>

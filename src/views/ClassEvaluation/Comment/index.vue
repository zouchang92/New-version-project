<template>
  <div class="Comment">
    <div class="title">
      <div class="title-text" @click="esc">
        <p class="title-left">
          <i class="el-icon-arrow-left"></i>
        </p>
        <p class="esc">返回至上一页</p>
      </div>
    </div>
    <div class="content">
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
                  ></video>
                  <div class="brief">
                    <p class="brief-title">二年级口算</p>
                    <div class="category">
                      <p class="category-text">
                        <i style="margin-right:8px;" class="el-icon-menu"></i>数学类
                      </p>
                    </div>
                    <div class="data">
                      <p class="data-text">
                        <i style="margin-right:16px;" class="el-icon-date"></i>2019-10-25
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
                          <el-rate v-model="value1"></el-rate>
                        </div>
                        <div class="Standard">
                          <span class="Standard-title">教学程序规范完善:</span>
                          <el-rate v-model="value2"></el-rate>
                        </div>
                        <div class="structure">
                          <span class="structure-title">课堂结构内容:</span>
                          <el-rate v-model="value3"></el-rate>
                        </div>
                        <div class="prominent">
                          <span class="prominent-title">教学重点突出:</span>
                          <el-rate v-model="value4"></el-rate>
                        </div>
                        <div class="vivid">
                          <span class="vivid-title">教学内容生动:</span>
                          <el-rate v-model="value5"></el-rate>
                        </div>
                      </div>
                      <el-input
                        type="textarea"
                        placeholder="请留下你的评语"
                        v-model="textarea"
                        clearable
                        maxlength="240"
                        resize="none"
                        show-word-limit
                      ></el-input>

                      <el-button class="evaluate-content-button" type="primary">提交</el-button>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="position:relative">
                <div style="background:#fff;height:684px;margin-top:15px;">
                  <div class="All-comments">
                    <p class="All-title">全部评论 (1111)</p>
                    <el-pagination
                      style="position: absolute;top: 31px;right: 23px;"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[50, 100, 150, 200]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="200"
                    ></el-pagination>
                  </div>
                  <div class="All-content"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="padding-right: 20px;">
          <div class="content-right" style="background:#fff; height: 1979px;">
            <div class="Course-introduction">
              <div class="Course-title">
                <p class="title-text">课程简介</p>
              </div>
              <div class="Course-content">
                <span
                  class="content-text"
                >经济是一个很抽象的词语，因为抽象，所以怎么解释都行。你可以说发展经济是休养生息，也可以说大兴土木，也可以说自给自足，也可以说互通有无，也可以说烧杀抢掠，也可以说坑蒙拐骗。反正这些方式都是古往今来各个国家民族获取财富时经常用到的手段，所以说，经济学不是一门学科，而是所有学科的总和。或者说根本就不是学科，如果非要以如今人们对于经济的理解去研究什么经济学，还不如去研究上帝要来的靠谱一些。 老子说：“名可名也，非恒名也”，如果看待一样事物仅仅局限于名称，那么你远得不出任何有价值的结论。但想要描述一件事物，又不得不利用名称，所以名称的准确性对于任一门学科都显得极为重要。故孔子才说：“名不正则言不 顺，言不顺则事不成”。</span>
              </div>
            </div>
            <div class="Compere-introduction">
              <div class="Compere-title">
                <p class="title-text">主讲人简介</p>
              </div>
              <div class="Compere-content">
                <img
                  class="Compere-img"
                  src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike60%2C5%2C5%2C60%2C20/sign=dd99e97fd62a6059461de948495d5ffe/a686c9177f3e670945ab40493ac79f3df9dc55d8.jpg"
                  alt
                />
                <p class="Compere-name">李连杰</p>
                <p class="Compere-data">(1983年6月1日生)</p>
                <span
                  class="Compere-text"
                >武汉大学经济学博士，上海财经大学博士后，现为广东财经大学经济学院经济系主任、副教授、硕士生导师。曾任广西梧州市发展和改革委员会主任助理。兼任中国《资本论》研究会理事和中华外国经济学说研究会理事。</span>
              </div>
            </div>
            <div class="data-statistics">
              <div class="data-title">
                <p class="title-text">数据统计</p>
              </div>
              <div class="data-content">
                <div style="color:#7D7D7F">
                  观看人数:
                  <span style="color:red">111</span>
                </div>
                <div style="color:#7D7D7F;margin-top:10px;">
                  评论人数:
                  <span style="color:red">111</span>
                </div>
                <div style="color:#7D7D7F;margin-top:10px;">
                  下载人数:
                  <span style="color:red">111</span>
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
                  <span>二年级口算</span>
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
export default {
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      textarea: "",
      currentPage: 4
    };
  },
  methods: {
    esc() {
      this.$router.go(-1);
      console.log(this.$route.query.list);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
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
          width: 110px;
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
            position: absolute;
            bottom: -22px;
            right: 18px;
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
      .All-comments {
        border-bottom: 1px solid #efefef;
        margin: 15px;
        .All-title {
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(21, 21, 21, 1);
          line-height: 40px;
          margin: 0px;
          padding: 8px 0px 8px 3px;
        }
      }
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
          padding: 25px;
          padding-top: 0px;
          height: 512px;
          overflow: hidden;
          text-overflow: ellipsis;
          .content-text {
            font-size: 18px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(125, 125, 127, 1);
            line-height: 38px;
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
            font-size: 18px;
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
            margin:15px;
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
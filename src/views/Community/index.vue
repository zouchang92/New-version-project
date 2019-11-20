<template>
  <el-col style="background:#eee;height:1200px;">
    <el-row :gutter="30" style="margin:17px;">
      <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14" style="height:513px;background:#fff">
        <div class="Wonderful-moment">
          <div class="moment-title">
            <p class="u-line"></p>
            <p class="title-text">精彩瞬间</p>
          </div>
        </div>
      </el-col>
      <el-col
        :xs="9"
        :sm="9"
        :md="9"
        :lg="9"
        :xl="9"
        style="height:951px;background:#fff;margin-left:29px;position:relative"
      >
        <div class="Organization-statistics">
          <div class="statistics-title">
            <p class="u-line"></p>
            <p class="title-text">社团统计</p>
          </div>
          <div class="statistics-content">
            <ul>
              <li v-for="(n,i) in 10" :key="i">
                <div class="content">
                  <img
                    src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                    alt
                  />
                  <p class="name">摄影社</p>
                  <p class="Person">负责人:李安</p>
                  <p class="grade">适用年级</p>
                  <p class="Applicable">三、四年级</p>
                  <p class="association">社团人数</p>
                  <p class="Number">35</p>
                  <p class="stardata">创建时间</p>
                  <p class="data">2016-06-16</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="margin:17px;position: relative;top: -429px;">
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="padding:0px;position:relative">
        <div class="Activity-statistics">
          <div class="Activity-title">
            <p class="u-line"></p>
            <p
              class="title-text"
              style="margin:0px;padding-top: 5px;padding-left: 16px;padding-bottom:15px;"
            >活动统计</p>
          </div>
          <div class="Activity-content" v-for="(item,i) in list" :key="i">
            <div class="content-title">
              <span>{{item.title}}</span>
            </div>
            <div class="content-name">
              <span>{{item.name}}</span>
            </div>
            <div class="content-state">
              <span>{{item.state}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" style="padding-right: 9px;margin-left: 10px;">
        <div class="Payment-situation">
          <div class="situation-title">
            <p class="u-line"></p>
            <p class="title-text" style="margin:0px;padding-top: 5px;padding-left: 15px;padding-bottom: 15px;">缴费情况</p>
          </div>
          <div class="situation-content">
            <box-card />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import BoxCard from "./components/BoxCard";
export default {
  components:{
    BoxCard
  },
  data() {
    return {
      list: [
        { title: "01 计算机协会", name: "李华", state: "进行中" },
        { title: "02 口语协会", name: "李华", state: "进行中" },
        { title: "03 计算机协会", name: "李华", state: "进行中" },
        { title: "04 电子应用与计算机协会", name: "李华", state: "进行中" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.Wonderful-moment {
  .moment-title {
  }
}
.u-line {
  display: block;
  width: 5px;
  height: 16px;
  background: rgba(1, 142, 237, 1);
  position: absolute;
  left: 15px;
  top: 8px;
}
.title-text {
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 300;
  color: rgba(17, 17, 17, 1);
  line-height: 24px;
  padding-left: 12px;
}
.Organization-statistics {
  .statistics-title {
    border-bottom: 1px solid #eff0f5;
  }
  .statistics-content {
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
      li {
        border-bottom: 1px solid #eff0f5;
        height: 58px;
        position: relative;
        margin: 10px;
        .content {
          display: flex;
          img {
            height: 48px;
            width: 48px;
            border-radius: 50%;
            position: absolute;
            top: 0px;
          }
          p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
          }
          .name {
            position: absolute;
            top: -18px;
            left: 70px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
          }
          .Person {
            position: absolute;
            top: 10px;
            left: 70px;
            font-size: 14px;
            font-weight: 300;
            color: rgba(25, 25, 25, 1);
            line-height: 22px;
          }
          .grade {
            position: absolute;
            top: -18px;
            left: 170px;
          }
          .Applicable {
            position: absolute;
            top: 10px;
            left: 170px;
          }
          .association {
            position: absolute;
            top: -18px;
            left: 270px;
          }
          .Number {
            position: absolute;
            top: 10px;
            left: 273px;
          }
          .stardata {
            position: absolute;
            top: -18px;
            left: 349px;
          }
          .data {
            position: absolute;
            top: 10px;
            left: 349px;
          }
        }
      }
    }
  }
}
.Activity-statistics {
  height: 413px;
  background: #fff;
  padding: 15px;
  .Activity-title {
    border-bottom: 1px solid #eff0f5;
  }
  .Activity-content {
    display: flex;
    height: 30px;
    justify-content: space-between;
    background: #f5f6fa;
    margin-top: 10px;
    span {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000;
    }
    .content-name,.content-title,.content-state{
      margin:5px;
    }
  }
}
.Payment-situation{
  height:413px;
  background:#fff;
  padding: 15px;
  position:relative;
  .situation-title{
    border-bottom: 1px solid #eff0f5;
  }
}
</style>
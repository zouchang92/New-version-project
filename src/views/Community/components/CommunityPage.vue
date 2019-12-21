<template>
  <div>
    <el-col style="background:#eee;height:1200px; margin-top: -15px;">
      <el-row :gutter="30" style="margin:17px;">
        <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14" style="height:513px;background:#fff">
          <div class="Wonderful-moment">
            <div class="moment-title">
              <p class="u-line" />
              <p class="title-text">精彩瞬间</p>
            </div>
            <div class="moment-content">
              <el-row :gutter="30">
                <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <div class="item">
                    <el-carousel ref="carousel" trigger="click" width="407px" height="396px">
                      <el-carousel-item v-for="(item,index) in mess" :key="index" name="index">
                        <img :src="item.img">
                      </el-carousel-item>
                    </el-carousel>
                    <!-- <img style="width:407px;height:396px;" :src="dataList[currentIndex]"> -->
                  </div>
                </el-col>
                <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11" style="padding-right:0px;">
                  <ul>
                    <li v-for="(item,index) in mess" :key="index" :class="{'current':currentIndex == index}" @click="setActiveItem(index)">
                      <img style="width:58px;height:48px;border-radius:4px;" :src="item.img" alt>
                      <p class="content-r">{{ item.content }}</p>
                      <span class="content-association">{{ item.association }}</span>
                      <span class="association-time">日期:{{ item.time }}</span>
                    </li>
                  </ul>
                </el-col>
              </el-row>
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
              <p class="u-line" />
              <p class="title-text">社团统计</p>
              <p class="title-more" @click="moreClub()">查看详情<i class="el-icon-d-arrow-right" /></p>
            </div>
            <div class="statistics-content">
              <ul>
                <li v-for="(item,index) in tableList" :key="index">
                  <div class="content">
                    <img
                      src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                      alt
                    >
                    <p class="name">{{ item.name }}</p>
                    <p class="Person">负责人:{{ item.person }}</p>
                    <p class="grade">适用年级</p>
                    <p class="Applicable">{{ item.orgIds }}</p>
                    <p class="association">社团人数</p>
                    <p class="Number">35</p>
                    <p class="stardata">创建时间</p>
                    <p class="data">{{ item.createTime | formatTS }}</p>
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
              <p class="u-line" />
              <p
                class="title-text"
                style="margin:0px;padding-top: 5px;padding-left: 16px;padding-bottom:15px;"
              >活动统计</p>
            </div>
            <div v-for="(item,index) in tableList" :key="index" class="Activity-content">
              <div class="content-title">
                <span>{{ item.name }}</span>
              </div>
              <div class="content-name">
                <span>{{ item.person }}</span>
              </div>
              <div class="content-state">
                <span>进行中</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :xs="7"
          :sm="7"
          :md="7"
          :lg="7"
          :xl="7"
          style="padding-right: 9px;margin-left: 10px;"
        >
          <div class="Payment-situation">
            <div class="situation-title">
              <p class="u-line" />
              <p
                class="title-text"
                style="margin:0px;padding-top: 5px;padding-left: 15px;padding-bottom: 15px;"
              >缴费情况</p>
            </div>
            <div class="situation-content">
              <box-card />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>
<script>
import BoxCard from './BoxCard'
import { formatDate } from '@/api/date.js'
import { queryClub } from '@/api/CommunityApi.js'
export default {
  components: {
    BoxCard
  },
  filters: {
    formatTS(timestamp) {
      const date = new Date(timestamp)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      tableList: [],
      dataList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576730134813&di=4b1dbccdea66e8765463d46cdc6f1580&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D701741522%2C968032624%26fm%3D214%26gp%3D0.jpg', 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=889b5d49c311728b302d8b24f0c7a4f3/eaf81a4c510fd9f98eb187b12b2dd42a2934a440.jpg', 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=a5571170780e0cf3a0f749fd327d9522/cc11728b4710b912fdf94a9cc9fdfc0392452293.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576730134813&di=4b1dbccdea66e8765463d46cdc6f1580&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D701741522%2C968032624%26fm%3D214%26gp%3D0.jpg'],
      currentIndex: 0, // 默认显示图片
      timer: null, // 定时器
      mess: [
        {
          id: 0,
          content: '社团与教师打乒乓球',
          association: '乒乓球社',
          time: '2019-10-01',
          img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576730134813&di=4b1dbccdea66e8765463d46cdc6f1580&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D701741522%2C968032624%26fm%3D214%26gp%3D0.jpg'
        },
        {
          id: 1,
          content: '社团与教师打篮球',
          association: '篮球社',
          time: '2019-10-01',
          img:
            'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=889b5d49c311728b302d8b24f0c7a4f3/eaf81a4c510fd9f98eb187b12b2dd42a2934a440.jpg'
        },
        {
          id: 2,
          content: '社团与教师打乒乓球',
          association: '乒乓球社',
          time: '2019-10-03',
          img:
            'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=a5571170780e0cf3a0f749fd327d9522/cc11728b4710b912fdf94a9cc9fdfc0392452293.jpg'
        },
        {
          id: 3,
          content: '社团与教师打乒乓球',
          association: '乒乓球社',
          time: '2019-10-01',
          img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576730134813&di=4b1dbccdea66e8765463d46cdc6f1580&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D701741522%2C968032624%26fm%3D214%26gp%3D0.jpg'
        }
      ]
    }
  },
  computed: {},
  created() {
    this.get()
  },
  methods: {
    setActiveItem(index) {
      this.$refs.carousel.setActiveItem(index)
    },
    moreClub() {
      this.$router.push('./Management1')
    },
    async get() {
      try {
        const page = 1
        const rows = 10000
        const List = await queryClub({ page, rows })
        this.tableList = List.data.list
        console.log(this.tableList)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Wonderful-moment {
  .moment-content {
    ul {
      list-style: none;
      li {
        display: flex;
        padding-bottom: 10px;
        padding-top: 3px;
        border-bottom: 1px solid #eff0f5;
        position: relative;
        p {
          margin: 0px;
          font-size: 15px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 21px;
        }
        .content-association {
          position: absolute;
          top: 32px;
          left: 64px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(78, 78, 78, 1);
          line-height: 21px;
        }
        .association-time {
          position: absolute;
          top: 32px;
          left: 195px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(78, 78, 78, 1);
          line-height: 21px;
        }
        // &:hover {
        //   background: #018eed;
        // }
      }
    }
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
    .title-more{
          position: absolute;
          top: 6px;
          font-size:19px;
          font-family:Source Han Sans CN;
          font-weight:300;
          color:rgba(102,102,102,1);
          line-height:24px;right: 28px;
    }
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
          .content-r {
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
    .content-name,
    .content-title,
    .content-state {
      margin: 5px;
    }
  }
}
.Payment-situation {
  height: 413px;
  background: #fff;
  padding: 15px;
  position: relative;
  .situation-title {
    border-bottom: 1px solid #eff0f5;
  }
}
</style>


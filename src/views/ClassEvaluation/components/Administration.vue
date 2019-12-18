<template>
  <div class="Administration">
    <div class="title">
      <div class="Nature">
        性质:
        <el-select v-model="value" placeholder="请选择年级">
          <el-option
            v-for="(item,index) in options"
            :key="index.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="type">
        类型:
        <el-select v-model="value1" placeholder="请选择科目">
          <el-option
            v-for="(item,index) in options1"
            :key="index.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:24px;">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
        >搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          size="small"
        >新建</el-button>
        <el-button
          type="warning"
          icon="el-icon-printer"
          size="small"
        >导入</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
        >批量删除</el-button>
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in List" :key="index" class="content-text">
        <div
          :id="item.statistical.reviewId"
          class="content-top"
          @click="open(item.statistical.reviewId)"
        >
          <img
            class="content-img"
            src="http://www.cisau.com.cn/UploadFiles/2014/310/2014052810113425765.jpg"
          >
          <img class="play-img" src="../../../assets/bf_icon_slices/bf_icon@2x.png" alt="">
        </div>
        <div class="content-bottom">
          <img src="" alt>
          <p>123</p>
          <p class="number">
            <i class="el-icon-chat-dot-square" />
            123
          </p>
          <p class="people">
            <i class="el-icon-s-custom">{{ item.statistical.evaluationNum }}</i>
          </p>
          <el-popover placement="top" width="120" trigger="click">
            <div class="Open" style="display:flex;">
              <p
                class="edit"
                style="margin:0px;padding: 4px 5px 0px 0px;color:#1890FF;border-right: 1px solid #e8e8e8;"
              >
                编辑
              </p>
              <p
                style="margin:0px;padding: 4px 5px 0px 5px;color:#1890FF;border-right: 1px solid #e8e8e8;"
              >
                删除
              </p>
              <el-switch
                v-model="value2"
                style="margin-top:3px;margin-left: 10px;"
                active-color="#1890FF"
                inactive-color="#ff4949"
              />
            </div>
            <p slot="reference" class="refer">...</p>
          </el-popover>
        </div>
      </div>
    </div>
    <footer class="content-footer">
      <el-pagination
        :current-page.sync="currentPage2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { ClassQuery, getDetail } from '@/api/ClassEvaluationApi'

export default {
  data() {
    return {
      options: [
        {
          value: '',
          label: ''
        },
        {
          value: '',
          label: ''
        }
      ],
      options1: [
        {
          value: '',
          label: ''
        },
        {
          value: '',
          label: ''
        }
      ],
      value: '',
      value1: '',
      List: [],
      List1: [],
      page: '',
      value2: true,
      currentPage2: 5
    }
  },
  created() {
    this.get()
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    async get() {
      try {
        const page = 1
        this.page = page
        const rows = 1000
        const list = await ClassQuery({ page, rows })
        this.List = list.data.list
        console.log(this.List)
      } catch (err) {
        console.log(err)
      }
    },
    async open(e) {
      try {
        // eslint-disable-next-line no-unused-vars
        const reviewId = e
        console.log(reviewId)
        // eslint-disable-next-line no-unused-vars
        const a = await getDetail({ reviewId })
        this.List1 = a.data
        console.log(this.List1)
        this.$router.push({
          path: '/comment/index',
          query: {
            list: this.List1
          }
        })
        console.log(this.List1)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.Administration {
  height: 2500px;
  background: #eee;
  .title {
    margin: 15px;
    margin-top: 0px;
    height: 84px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    display: flex;
    .Nature,
    .type {
      padding-top: 25px;
      padding-left: 40px;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .content-text {
      height: 207px;
      width: 316px;
      background: #ccc;
      margin-left: 15px;
      margin-bottom: 28px;
      margin-top: 10px;
      .content-top {
        width: 316px;
        height: 174px;
        opacity: 0.4;
        border-radius: 2px;
        opacity: 1;
        &:hover{
          .play-img{
            opacity: 1;
          }
          }
        .content-img {
          height: 173px;
          width: 316px;
        }
        .play-img{
          position: absolute;
          top: 70px;
          left: 132px;
          opacity: 0.3;
        }
      }
      .content-bottom {
        width: 316px;
        height: 48px;
        background: rgba(247, 249, 250, 1);
        border-radius: 0px 0px 2px 2px;
        display: flex;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin: 15px;
        }
        .number {
          margin: 0px;
          margin-top: 4px;
          margin-bottom: 4px;
          padding: 14px 20px 0px 20px;
          border-right: 1px solid #e8e8e8;
        }
        .people {
          margin: 0px;
          margin-top: 4px;
          margin-bottom: 4px;
          padding: 14px 20px 0px 20px;
          border-right: 1px solid #e8e8e8;
        }
        .refer {
          margin: 0px;
          padding: 11px 18px;
        }
      }
    }
  }
  .content-footer {
    margin-top: 60px;
    float: right;
  }
}
</style>
<style>
.Administration .title .el-input__inner {
  padding-right: 30px;
  height: 32px;
}
.Administration .title .el-input__suffix {
  top: 4px;
}
</style>

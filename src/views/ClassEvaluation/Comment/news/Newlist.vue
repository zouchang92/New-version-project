<template>
  <div>
    <div class="All-comments">
      <p class="All-title">全部评论 ({{ data.evaluation.totalCount }})</p>
      <el-pagination
        style="position: absolute;top: 11px;right: 23px;"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.evaluation.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="All-content">
      <ul>
        <li v-for="(item, index) in data.evaluation.list" :key="index">
          <img src="" alt="">
          <p class="title-score">打了{{ item.score }}星</p>
          <p class="name-operator">{{ item.operatorName }}</p>
          <p class="content-operator">
            {{ item.operatorContent }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/ClassEvaluationApi'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: {
      type: String
    }
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      try {
        const reviewId = this.id
        console.log(reviewId)
        const a = await getDetail({ reviewId })
        this.data = a.data
        console.log(this.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss">
.All-comments {
  border-bottom: 1px solid #efefef;
  margin: 15px;
  position: relative;
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
.All-content {
  ul {
    list-style: none;
    li {
      height: 130px;
      p {
        margin: 0px;
      }
      .title-score {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
        position: relative;
        top: -8px;
        left: 258px;
      }
      .name-operator {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(0, 157, 255, 1);
        line-height: 40px;
        position: relative;
        top: -50px;
        left: 128px;
      }
      .content-operator {
            width: 700px;

        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
        background: rgb(244, 245, 249);
        position: relative;
        top: -17px;
        left: 124px;
      }
    }
  }
}
</style>

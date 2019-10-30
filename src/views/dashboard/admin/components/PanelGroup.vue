<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col" style="padding-right:13px">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <p>我的应用</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="u-examine" @click="handleSetLineChartData('newVisitis')">
        <div class="u-examine-comtent">
          <div class="u-examine-text">
            <div class="u-examine-title">
              <p>待审核</p>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="u-timeline" @click="handleSetLineChartData('newVisitis')">
        <div class="u-timeline-comtent">
          <div class="u-timeline-text">
            <div class="u-timeline-title">
              <!-- <el-calendar v-model="value"></el-calendar> -->
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  },
  components: {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 130px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    // overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-description {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        font-size: 18px;

        p {
          margin: -12px 0px 0px 32px;
        }
      }
    }
  }
  .u-examine {
    height: 326px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    // overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .u-examine-comtent {
      font-weight: bold;

      .u-examine-text {
        line-height: 18px;
        font-size: 18px;
        .u-examine-title {
          height: 50px;
          border-bottom: 1px solid #eee;
          margin: 0px 15px 0px 15px;
          padding: 14px;
        }
        p {
          margin: 0px;
        }
      }
    }
  }
  .u-timeline {
    background: #fff;
    height: 370px;
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
}
</style>

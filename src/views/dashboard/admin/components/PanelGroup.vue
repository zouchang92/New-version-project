<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col" style="padding-right:15px;padding-left:30px">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <p class="u-line"></p>
            <p>我的应用</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col" style='padding:0px'>
      <div class="u-examine" @click="handleSetLineChartData('newVisitis')">
        <div class="u-examine-comtent">
          <div class="u-examine-text">
            <div class="u-examine-title">
              <p class="u-line"></p>
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
              <!-- <UCalendar></UCalendar> -->
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import UCalendar from '@/components/Calendar/UCalendar'
export default {
  data() {
    return {
      value: new Date()
    }
  },
  components: {
    // UCalendar
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 0px;

  .card-panel-col {
    margin-bottom: 0px;
  }

  .card-panel {
    // width:320px;
    height:154px;
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

        .u-line{
          display: block;
          width: 5px;
          height: 16px;
          background: rgba(1,142,237,1);
          position: absolute;
          left: -15px;
          top: 28px;
        }
      }
    }
  }
  .u-examine {
    height: 322px;
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
        .u-line{
          display: block;
          width: 5px;
          height: 16px;
          background: rgba(1,142,237,1);
          position: absolute;
          left: 15px;
          top: 17px;
        }
      }
    }
  }
  .u-timeline {
    background: #fff;
    height: 354px;
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

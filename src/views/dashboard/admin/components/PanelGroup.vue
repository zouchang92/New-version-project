<template>
  <el-row :gutter="40" class="panel-group">
    <el-col
      :xs="12"
      :sm="8"
      :lg="8"
      class="card-panel-col"
      style="padding-right:15px;padding-left:30px"
    >
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <p class="u-line"></p>
            <p>我的应用</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col" style="padding:0px;overflow:hidden">
      <div class="u-examine" >
        <div class="u-examine-comtent">
          <div class="u-examine-text">
            <div class="u-examine-title">
              <p class="u-line"></p>
              <el-badge :value="5">
                <p>待审核</p>
              </el-badge>
              <div style="float:right">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
              </div>
            </div>
            <div class="u-examine-content">
              <ul class="u-content">
                <li v-for="city in cities" :key="city">
                  <el-checkbox-group
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange"
                    style="padding-top:5px;padding-left:5px"
                  >
                    <el-checkbox :label="city">
                      <span>{{city.content}}</span>
                      <el-tag
                        style="margin-left:10px;width: 56px;height: 20px;font-size: 12px;"
                        size="mini"
                        effect="dark"
                        :type="city.type"
                      >{{ city.label }}</el-tag>
                    </el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="u-timeline">
        <div class="u-timeline-comtent">
          <div class="u-timeline-text">
            <div class="u-timeline-title">
              <!-- <el-calendar v-model="value"></el-calendar> -->
              <UCalendar></UCalendar>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import UCalendar from '@/components/Calendar/UCalendar'
const cityOptions = [
  { type: "", content: "梨花的请假信息1111", label: "3分钟前" },
  { type: "succes", content: "梨花的请假信息111", label: "30分钟前" },
  { type: "info", content: "梨花的请假信息11", label: "4小时前" },
  { type: "danger", content: "梨花的请假信息1", label: "3分钟前" },
  { type: "warning", content: "梨花的请假信息", label: "3分钟前" },
  { type: "danger", content: "梨花请假信息", label: "3分钟前" }
];
export default {
  data() {
    return {
      value: new Date(),
      checkAll: false,
      checkedCities: {
        type: "",
        content: "梨花的请假信息1111",
        label: "3分钟前"
      },
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  components: {
    UCalendar
  },
  created() {
    this.initData(null)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 0px;

  .card-panel-col {
    margin-bottom: 0px;
  }

  .card-panel {
    // width:320px;
    height: 154px;
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

        .u-line {
          display: block;
          width: 5px;
          height: 16px;
          background: rgba(1, 142, 237, 1);
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
        .u-line {
          display: block;
          width: 5px;
          height: 16px;
          background: rgba(1, 142, 237, 1);
          position: absolute;
          left: 15px;
          top: 17px;
        }
      }
      .u-examine-content {
        .u-content {
          list-style: none;
          padding-left: 21px;
          padding-top: 7px;
          margin: 0px;
        }
        & li {
          width: 403px;
          height: 32px;
          background: #f5f6fa;
          margin-top: 10px;

          span {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #111111;
          }
        }
      }
    }
  }
  .u-timeline {
    background: #fff;
    height: 354px;
    .timeline {
      margin-left: 47px;
      margin-top: 20px;
    }
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
<style>
.is-fixed {
  position: absolute;
  top: 9px !important;
  right: -5px !important;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}
/* .el-checkbox {
  float: right;
} */
.u-examine-title .el-checkbox__input {
  display: none;
}
.timeline .el-timeline-item__timestamp.is-bottom {
  position: absolute;
  top: -5px;
  left: -47px;
}
</style>

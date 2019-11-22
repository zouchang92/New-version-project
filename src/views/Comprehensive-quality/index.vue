<template>
  <div class="Comprehensive">
    <div class="title">
      <div class="title-cl">
        <p>班级:</p>
        <el-select v-model="value" placeholder="请选择班级">
          <el-option v-for="item in cities" :key="item.id" :label="item.label" :value="item.label">
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="title-bn">
        <span>姓名:</span>
        <el-input placeholder="请输入姓名" v-model="input" clearable></el-input>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:26px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-upload" size="small">导出</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">打印</el-button>
      </div>
    </div>
    <div class="content">
      <el-row gutter="30">
        <el-col
          :xs="6"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="6"
          style="padding-right:0px;padding-left:0px;position:relative"
        >
          <div style="background:#fff;height:316px;margin-left:31px;">
            <div class="personal">
              <div class="back"></div>
              <div class="bacg"></div>
              <div class="personal">
                <img
                  src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp"
                  alt
                />
                <p class="personal-name">姓名:张大伟</p>
                <p class="personal-sex">性别:男</p>
                <p class="personal-id">学号:20198308408</p>
                <p class="personal-class">班级:高一(3)班</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="padding-right:0px;padding-left:0px;">
          <div style="background:#fff;height:316px;margin-left:21px;">213</div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="padding-right:0px;padding-left:0px;">
          <div style="background:#fff;height:316px;margin-left:21px;">213</div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" style="padding-right:31px;padding-left:0px">
          <div style="background:#fff;height:316px;margin-left:21px;">213</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cities: [
        {
          label: "三年二班"
        },
        {
          label: "三年五班"
        }
      ],
      value: "",
      input: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.Comprehensive {
  height: 1200px;
  background: #eee;
  .title {
    background: #fff;
    height: 84px;
    margin: 17px;
    display: flex;
    .title-cl {
      display: flex;
      padding-left: 26px;
      padding-top: 20px;
      p {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
        margin-top: 12px;
      }
    }
    .title-bn {
      margin-left: 36px;
      display: flex;
      span {
        width: 100px;
        height: 16px;
        padding-top: 31px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }
    }
  }
  .content {
    .personal {
      .back {
        width: 198px;
        height: 105px;
        background: #71d9ae;
        opacity: 0.9;
        border-radius: 0% 26% 85% 0%;
        z-index: 2;
      }
      .bacg {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 176px;
        height: 104px;
        background: #71d9ae;
        opacity: 0.65;
        z-index: 1;
        border-radius: 0px 0px 0px 175px;
      }
      .personal {
        position: absolute;
        top: 42px;
        left: 129px;
        z-index: 3;
        img {
          width: 108px;
          height: 108px;
          background: rgba(71, 146, 188, 1);
          border: 2px solid;
          border-image: linear-gradient(
              0deg,
              rgba(133, 221, 177, 1),
              rgba(0, 191, 154, 1)
            )
            10 10;
          border-radius: 50%;
          z-index: 3;
        }
        p {
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 45px;
        }
        .personal-name {
          position: absolute;
          top: 114px;
          left: -60px;
        }
        .personal-sex {
          width: 100px;
          position: absolute;
          top: 114px;
          left: 91px;
        }
        .personal-id {
          position: absolute;
          top: 154px;
          left: -60px;
        }
        .personal-class {
          position: absolute;
          top: 193px;
          left: -60px;
        }
      }
    }
  }
}
</style>
<style>
.Comprehensive .title-cl .el-input__inner {
  width: 224px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 10px;
}
.Comprehensive .title-cl .el-input__suffix {
  right: 5px;
  top: 5px;
}
.Comprehensive .title-bn .el-input {
  width: 224px;
  margin-left: -58px;
}
.Comprehensive .title-bn .el-input__inner {
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.14901999999999999);
  border-radius: 4px;
  margin-top: 26px;
}
</style>
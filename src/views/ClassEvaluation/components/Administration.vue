<template>
  <div class="Administration">
    <div class="title">
      <div class="Nature">
        性质:
        <el-select v-model="value" placeholder="请选择年级">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="type">
        类型:
        <el-select v-model="value1" placeholder="请选择科目">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div style="height:32px;margin-left:23px;margin-top:24px;">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" size="small">新建</el-button>
        <el-button type="warning" icon="el-icon-printer" size="small">导入</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
      </div>
    </div>
    <div class="content">
        
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        }
      ],
      options1: [
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      value1: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.Administration {
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
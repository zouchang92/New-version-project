<template>
    <el-row style="padding: 15px" :gutter="20">
      <el-col :span="8">
        <div class="grid-content">
          12
        </div>
      </el-col>
      <el-col :span="16">
        <div class="">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content">12</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">33</div>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content">
        
            <div class="grid-content">33</div>
         
        </div>
      </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>
<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    background-color: #ffffff
  }
  .el-col {
    border-radius: 4px;
  }
</style>
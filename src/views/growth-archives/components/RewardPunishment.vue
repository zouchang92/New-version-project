<template>
  <div>
    <el-card class="box-card">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>奖励明细</p>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50px;"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="reward" label="奖励名称"></el-table-column>
        <el-table-column prop="level" label="奖励级别"></el-table-column>
        <el-table-column prop="data" label="获奖日期"></el-table-column>
        <el-table-column prop="ranking" label="获奖名次"></el-table-column>
        <el-table-column prop="company" label="颁奖单位"></el-table-column>
        <el-table-column label="奖励照片">
          <el-button type="text" @click="dialogVisible = true">点击查看</el-button>
          <el-dialog
            title="照片"
            :visible.sync="dialogVisible"
            width="30%"
          >
            <img src="https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1382184082.17.webp" alt />
          </el-dialog>
        </el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width:100%;margin-top:20px;">+新增</el-button>
    </el-card>
        <el-card class="box-card" style="margin-top:20px;">
      <div style="border-bottom:1px solid #E9E9E9">
        <p>惩罚明细</p>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50px;"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="reward" label="惩罚名称"></el-table-column>
        <el-table-column prop="level" label="惩罚级别"></el-table-column>
        <el-table-column prop="data" label="撤销日期"></el-table-column>
        <el-table-column prop="remarks" label="惩处原因"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width:100%;margin-top:20px;">+新增</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          name: "蔡启超",
          reward: "书法比赛",
          level: "省级",
          data: "2018-09-18",
          ranking: "一等奖",
          company: "省书法协会",
          phone: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
          remarks: "此处填写相关备注"
        },
        {
          name: "蔡启超",
          reward: "绘画比赛",
          level: "国家级",
          data: "2018-09-18",
          ranking: "二等奖",
          company: "中美学院",
          phone: "http://192.168.1.125:8999/zhxyx/upload/file",
          remarks: "此处填写相关备注"
        },
        {
          name: "蔡启超",
          reward: "唱歌",
          level: "市级",
          data: "2018-09-18",
          ranking: "一等奖",
          company: "音乐学院",
          phone: "http://192.168.1.125:8999/zhxyx/upload/file",
          remarks: "此处填写相关备注"
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="">
</style>
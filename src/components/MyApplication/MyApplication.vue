<template>
  <div class="application">
    <ul>
      <li @click="openIn()">
        <img
          style="margin-top: 18px;"
          src="../../assets/menu/education_icon.png"
          alt
        />
      </li>
      <li @click="open()">
        <el-button type="text">
          <h1 style="margin-top: -13px;">+</h1>
        </el-button>
      </li>
    </ul>
    <el-dialog
      title="全部应用"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <ul>
          <li @click="addNode">
            <img
              style="margin-top: 18px;"
              src="../../assets/menu/group_icon.png"
              alt
            />
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    openIn() {
      this.$router.push({ name: "homePage" });
    },
    addNode() {
      console.log(123);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.application {
  ul {
    list-style: none;
    display: flex;
    li {
      width: 71px;
      height: 71px;
      background: rgba(245, 246, 250, 1);
      border-radius: 4px;
      text-align: center;
      margin-top: 10px;
      margin-right: 16px;
      h1 {
        color: #e1e2e6;
        font-size: 62px;
        font-weight: 400;
        margin-top: -6px;
      }
    }
  }
}
</style>

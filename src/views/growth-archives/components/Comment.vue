<template>
  <div class="Comment">
    <el-row :gutter="20">
      <el-col :span="8" style="height:375px;background:#fff">
        <div class="Comment-left" style="padding:15px;">
          <div class="left-title">
            <p>选择学年学期</p>
          </div>
          <el-tree :data="data" :props="defaultProps" default-expand-all>
            <span slot-scope="{ node, data }">
              <i :class="data.icon"></i>
              <span style="padding-left: 4px;">{{node.label}}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="15" style="margin-left:30px;height:375px;background:#fff">
        <div class="Comment-right">
          <h4>评价老师</h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const menus = [
  {
    menuId: 100,
    menuName: "2019学年",
    icon: "el-icon-folder-opened",
    children: [
      {
        menuId: 1000,
        menuName: "2019年上学期",
        icon: "el-icon-tickets"
      },
      {
        menuId: 1001,
        menuName: "2019年下学期",
        icon: "el-icon-tickets"
      }
    ]
  },
  {
    menuId: 101,
    menuName: "2018学年",
    icon: "el-icon-folder-opened",
    children: [
      {
        menuId: 1006,
        menuName: "2018年上学期",
        icon: "el-icon-tickets"
      },
      {
        menuId: 1007,
        menuName: "2018年下学期",
        icon: "el-icon-tickets"
      }
    ]
  },
  {
    menuId: 201,
    menuName: "2018学年",
    icon: "el-icon-folder-opened",
    children: [
      {
        menuId: 2006,
        menuName: "2018年上学期",
        icon: "el-icon-tickets"
      },
      {
        menuId: 2007,
        menuName: "2018年下学期",
        icon: "el-icon-tickets"
      }
    ]
  }
];
export default {
  data() {
    return {
      data: menus,
      defaultProps: {
        children: "children",
        label: "menuName"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-left{
  .left-title{
        border-bottom: 1px solid #EFF0F5;
  }
}
</style>
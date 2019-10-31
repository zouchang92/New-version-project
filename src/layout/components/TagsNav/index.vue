<template>
  <div class="nav">
    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
      <el-menu-item :index="item.path" v-for="(item, i) in childRoutes" :key="item.name">
        {{item.meta.title}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { getRoutesChildren } from '@/mixins'
export default {
  data() {
    return {
      activeIndex: 0
    }
  },
  mixins: [getRoutesChildren],
  mounted() {
    console.log(this)
  }
}
</script>

<style>

</style>
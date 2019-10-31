<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2-1" type="warning" />
  </div>
</template>
<script>
import { getRoutesChildren } from '@/mixins'
export default {
  mounted() {
    console.log(this)
  },
  mixins: [getRoutesChildren],
}
</script>

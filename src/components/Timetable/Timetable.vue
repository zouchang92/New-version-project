<template>
  <div class="timetable-content">
    <ul v-for="(n,i) in 10" :key="i">
      <li>
        <p>08:00-08:40</p>
      </li>
      <li>
        <p>规划经济学</p>
      </li>
      <li>
        <p>王良军</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.timetable-content {
  overflow: hidden;
  ul {
    list-style: none;
    display: flex;
    margin: 0px;
    padding: 0px;
    justify-content: space-around;
    background: #f5f6fa;
    margin-top: 10px;
    li {
      padding-left: 20px;
      padding: 0px;
      p {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000;
      }
    }
  }
}
</style>
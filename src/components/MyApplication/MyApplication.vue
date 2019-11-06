<template>
  <div class="application">
    <ul>
      <li><h1>+</h1></li>
    </ul>
  </div>
</template>
<script>
export default {};
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
        h1{
            color:#E1E2E6;
            font-size: 62px;
            font-weight: 400;
            margin-top: -6px;
        }
    }
  }
}
</style>
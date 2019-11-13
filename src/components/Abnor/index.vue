<template>
  <div class="abnor">
    <div class="abnor-box">
      <img class="abnor-image" v-if="_image" :src="_image" />
      <div class="abnor-text" v-if="_title">{{_title}}</div>
      <div class="abnor-tip" v-if="_tip">{{_tip}}</div>
      <div class="abnor-btn" v-if="_button" @click="emitAbnorTap">{{_button}}</div>
    </div>
  </div>
</template>

<script>
import statusCode from './abnor.js'
export default {
  props: {
    type: String,
    image: String,
    title: String,
    tip: String,
    button: String
  },
  data() {
    return {
      _image: '',
      _title: '',
      _tip: '',
      _button: ''
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && statusCode[newVal]) {
          let image = this.image || statusCode[newVal].image
          let title = this.title || statusCode[newVal].title
          let tip = this.tip || statusCode[newVal].tip
          let button = this.button || statusCode[newVal].button
          this._image = image
          this._title = title
          this._tip = tip
          this._button = button
        }
      }
    }
  },
  methods: {
    emitAbnorTap() {
      this.$emit('abnorClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.abnor {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  .abnor-box {
    position: absolute;
    display: flex;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .abnor-btn {
      min-width: 128px;
      height: 33px;
      margin-top: 30px;
      padding: 0 10px;
      background-color: #ff5777;
      border: 0 none;
      border-radius: 2px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      overflow: hidden;
      line-height: 33px;
    }
    .abnor-image {
      width: 265px;
      background: transparent no-repeat;
      background-size: cover;
    }
    .abnor-text {
      margin-top: 15px;
      color: #333;
      font-size: 14px;
    }
    .abnor-tip {
      margin-top: 10px;
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
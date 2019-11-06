<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="welcome-text">
      您好,欢迎来到智慧校园平台
    </div>
    <div class="right-menu">
      <div class="user-info">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <p>哈哈哈</p>
        <p>|</p>
        <i @click="logout" class="el-icon-upload2" />
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .welcome-text {
    float: left;
    line-height: 64px;
    height: 100%;
  }
  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    margin-right: 20px;
    .user-info {
      height: 100%;
      line-height: 30px;
      .user-avatar {
        float: left;
        height: 40px;
        border-radius: 50%;
        margin-top: 10px;
      }
      p {
        color: #878787;
        float: left;
        margin-left: 5px;
      }
    }
  }
}
</style>

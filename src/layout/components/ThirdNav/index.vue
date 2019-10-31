<template>
  <div class="third-nav">
    <tags-nav />
    <div class="router-section">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>

<script>
import TagsNav from '../TagsNav'
export default {
  components: {
    TagsNav
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
}
</script>

<style>

</style>
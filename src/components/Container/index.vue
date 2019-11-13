<template>
  <div v-loading="loading" class="container">
    <abnor :type="abnorType" v-if="!loading && (empty || error)" />
    <slot v-if="!loading && !empty && !error" name='child-slot'>
      
    </slot>
  </div>
</template>

<script>
import Abnor from '../Abnor'
export default {
  data() {
    return {
      searchLoading: true
    }
  },
  components: {
    Abnor
  },
  computed: {
    abnorType() {
      if (this.error) {
        return 'REQUEST_ERROR'
      } else if (this.empty) {
        return 'DATA'
      }
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    empty: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">

</style>
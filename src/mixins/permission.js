import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['thirdMenu']),
    permission() {
      let buttons
      if (this.thirdMenuName) {
        buttons = this.thirdMenu[this.thirdMenuName]
      } else {
        buttons = this.$route.meta.button
      }
      let permission = buttons.reduce((r, v, k) => {
        r[v.buttonCode] = true
        return r
      }, {})
      return {
        viewBtn: false, //行内查看
        editBtn: false, //行内编辑
        addBtn: false, //添加
        delBtn: false, //行内删除
        searchBtn: false, //搜索
        ...permission
      }
    }
  }
}
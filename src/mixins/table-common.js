export default {
  data() {
    return {
      tableList: [],
      tableListLoading: false,
      page: {
        rows: 10,
        page: 1,
        total: 0,
      },
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList(){
      const { page, rows } = this.page
      let fn = this.fn
      this.tableListLoading = true
      fn.apply(this, [{ page, rows }]).then(res => {
        this.tableListLoading = false
        console.log(res)
      }).catch(err => {
        this.tableListLoading = false
      }) 
    },
    currentPageChange(p) {
      this.page.page = p
      this.initList()
    },
    pageSizeChange() {
      this.page.size = size
      this.initList()
    }
  }
}
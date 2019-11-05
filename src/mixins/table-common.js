import _ from 'lodash'

export default {
  data() {
    return {
      tableList: [],
      tableListLoading: false,
      page: {
        pageSizes: [10, 20, 30, 40],
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      option: {
        addBtn: false,
        title: '',
        page: true,
        viewBtn: true,
        selection: true,
        stripe: true,
        selectClearBtn: false,
        searchResetBtn: false,
        header: false,
        tip: false,
        dialogHeight: '500'
      }
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList(){
      const { currentPage, pageSize } = this.page
      let fn = this.fn
      this.tableListLoading = true
      fn.apply(this, [{ page: currentPage, rows: pageSize }]).then(res => {
        this.tableListLoading = false
        const { currPage, list, pageSize, totalCount } = res.data
        this.page.rows = pageSize
        this.page.page = currPage
        this.page.total = totalCount
        _.forEach(list, (n, i) => {
          _.forEach(n, (_n, _i) => {
            if (typeof(_n) === 'string' && (_n.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
             n[_i]  = [_n]
            }
          })
        })
        this.tableList = list
      }).catch(err => {
        console.log(err)
        this.tableListLoading = false
      }) 
    },
    resetList() {
      this.page.currentPage = 1
      this.initList()
    },
    currentPageChange(p) {
      this.page.currentPage = p
      this.initList()
    },
    pageSizeChange(size) {
      this.page.pageSize = size
      this.initList()
    }
  }
}
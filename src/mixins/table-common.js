import _ from 'lodash'
import qs from 'qs'
export default {
  data() {
    return {
      searchForm: {

      },
      initLoad: true,
      tableList: [],
      tableSelected: [],
      tableListLoading: false,
      host: process.env.VUE_APP_BASE_API,
      page: {
        pageSizes: [10, 20, 30, 40],
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      option: {
        dialogDrag: true,
        searchMenuSpan: 8,
        height: 'auto',
        addBtn: true,
        title: '',
        page: true,
        viewBtn: true,
        searchSubBtn: true,
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
    if (this.initLoad) {
      this.initList()
    }
    
  },
  methods: {
    searchChange(param) {
      this.searchForm = {
        ...this.searchForm,
        ...param,
      }
      this.initList()
    },
    exportExcel(url, params) {
      let queryObject = {}
      _.forEach(params, n => {
        queryObject[n] = this.searchForm[n] || ''
      })
      window.open(`${url}?${qs.stringify(queryObject)}`)
    },
    batchDel() {
      let delFn = this.delFn
      let that = this
      if (!this.tableSelected.length) {
        this.$message({
          type: 'warning',
          message: '请选中至少一条记录'
          })
        return
      }
      this.$confirm('此操作将永久删除这些记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        let ids = _.map(this.tableSelected, n => n.id)
        delFn.apply(this, [ ids ]).then(res => {
          that.$message({
            type: 'success',
            message: '批量删除成功!'
          })
          that.initList()
        })
      })
    },
    singleDel(row) {
      const that = this
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delFn = that.singleDelFn
          delFn.apply(this, [row.id]).then(res => {
            that.initList()
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(err => {

          }) 
          
        }).catch(() => {
      
        });
    },
    selectChange(selection) {
      this.tableSelected = selection
    },
    processData(list) {
      return list
    },
    initList(){
      const { currentPage, pageSize } = this.page
      let fn = this.fn
      this.tableListLoading = true
      this.tableSelected = []
      fn.apply(this, [{ page: currentPage, rows: pageSize, ...this.searchForm }]).then(res => {
        this.tableListLoading = false
        let isArray = (res.data.constructor === Array)
        if (isArray || !res.data.list) {
          this.tableList = this.processData(res.data)
          console.log(this.processData(res.data), 'process')
          return
        }
        const { currPage, list, pageSize, totalCount } = res.data
        this.page.rows = pageSize
        this.page.page = currPage
        this.page.total = totalCount

        _.forEach(list, (n, i) => {
          _.forEach(n, (_n, _i) => {
            if (typeof(_n) === 'string' && (_n.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
             n[_i]  = [{value: _n}]
            }
          })
        })
        
        this.tableList = this.processData(list)
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
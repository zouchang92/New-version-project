<template>
 
    <div >
       <div >新增  批量删除
            </div>
        <avue-crud :permission="permission" rowKey="id" @search-change="searchChange" @selection-change="selectChange" @size-change="pageSizeChange" @current-change="currentPageChange" @row-del="singleDel" @row-save="rowSave" @row-update="rowUpdate" :table-loading="tableListLoading" ref="crud" :page="{}" :data="tableList" :option="option" v-model="obj">
        <template slot="courseIds" slot-scope="scope">
              <div>
               {{scope.row.courseIds.split(',').length}}
              </div>

            </template>
        </avue-crud> 
    </div>

</template>


<script>
import { queryCourseGroup } from '@/api/classPlanManageApi'
import tableCommon from '@/mixins/table-common'
export default {
  mixins: [tableCommon],
  data() {
    return {
      permission: {
        addRowBtn: false,
        editBtn: true,
        viewBtn: false,
        delBtn: true
      },
      obj: {

      },
      fn: queryCourseGroup,
      initLoad: false,
      option: {
        column: [ {
          label: '课程组名称',
          prop: 'groupName',
          span: 24
        }, {
          label: '组内课程',
          prop: 'courseIds',
          span: 24,
          slot: true
        }]
      }
    }
  },
  mounted() {
    this.searchForm = {
      ...this.searchForm,
      taskId: this.$route.query.taskId
    }
    
    this.initList()
  },
  methods:
  {
     async rowUpdate(row, index, done, loading) {
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await updateActivity(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async rowSave(row, done, loading) {
      // row.description = row.description.length ? row.description[0].value : "";
      row.honors = row.honors.length ? row.honors[0].value : ''
      loading(true)
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await addActivity(row)
        await this.resetList()
        done()
      } catch (err) {
        loading(false)
      }
    },
    async handledel(row, index) {
      const id = row.id
      try {
        await delActivity({ id })
        this.get()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less">

</style>
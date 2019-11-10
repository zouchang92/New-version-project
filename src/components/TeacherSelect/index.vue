<template>
  <el-dialog @close="handleClose" :visible="value.visible">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside>
        <el-tree :props="treeProps" :data="organ">

        </el-tree>
      </el-aside>
      <main width="100%">
        <el-table
          ref="multipleTable"
          :data="tableList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectChange">
          <el-table-column
            prop="address"
            label="姓名"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </main>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
        <el-button size="medium" @click="handleClose">取消</el-button>
      </span>
    </el-container>
  </el-dialog>

</template>

<script>
import { getOrgan } from '@/utils'
import tableCommon from '@/mixins/table-common.js'
import { queryTeacher } from '@/api/teacherManageApi'
export default {
  mixins: [tableCommon],
  data() {
    return {
      treeProps: {
        label: 'orgName',
        value: 'id'
      },
      fn: queryTeacher,
      organ: getOrgan()
    }
  },
  props: ['value'],
  methods: {
    handleClose() {
      this.$emit('input', {
        ...this.value,
        visible: false
      })
    },
    handleSave() {
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-select {

}
</style>
<template>
  <div class="resource-mine">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card>
          <el-col style="margin-bottom: 15px;" :span="24">
            <el-form size="small" style="margin-bottom: 0px;" class="avue-crud-search" :inline="true">
              <el-form-item label="文件名">
                <el-input placeholder="请输入文件名" />
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" @click="search" type="primary">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button :loading="truncateLoading" @click="truncateRecycler" icon="el-icon-delete" type="danger">清空回收站</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
        <el-card style="margin-top: 15px">
          <el-col style="margin-bottom: 15px;" :span="24">
            <file-list type="recycler" ref="fileList" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileList from '../components/FileList'
import { truncateRecycler } from '@/api/resourceManageApi'
export default {
  data() {
    return {
      truncateLoading: false
    }
  },
  components: {
    FileList
  },
  methods: {
    async truncateRecycler() {
      this.truncateLoading = true
      try {
        await this.$confirm('此操作将永久删除这些文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await truncateRecycler()
        this.$refs['fileList'].refreshFolder('root')
        this.truncateLoading = false
      } catch(err) {
        console.log(err)
        this.truncateLoading = false
      }
    }
  }
}
</script>

<style lang="">
  
</style>>
<template>
 <div class="resource-mine">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card>
          <el-col style="margin-bottom: 15px;" :span="24">
            <el-form size="small" style="margin-bottom: 0px;" class="avue-crud-search" :inline="true">
              <el-form-item label="文件名">
                <el-input v-model="searchText" placeholder="请输入文件名" />
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" @click="search" type="primary">搜索</el-button>
              </el-form-item>
              <el-form-item v-if="false">
                <el-button  @click="batchDownload" icon="el-icon-download" type="info">批量下载</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="refreshResource" icon="el-icon-delete" type="info">刷新</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
        <el-card style="margin-top: 15px">
          <el-col style="margin-bottom: 15px;" :span="24">
            <file-list type="public" ref="fileList" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileList from '../components/FileList'
export default {
  components: {
    FileList
  },
  methods: {
    async refreshResource() {
      try {
        await this.$refs['fileList'].refreshCurrentFolder()
      } catch(err) {
        
      }
    },
    search() {

    }
  }
}
</script>

<style>

</style>
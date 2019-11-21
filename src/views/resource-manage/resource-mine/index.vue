<template>
  <div class="resource-mine">
    <el-row :gutter="15">
      <el-col style="margin-bottom: 15px;" :span="24">
        <el-form size="small" style="margin-bottom: 0px;" class="avue-crud-search" :inline="true">
          <el-form-item label="文件名">
            <el-input placeholder="请输入文件名" />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" @click="search" type="primary">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-upload" type="success">上传文件</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-download" type="info">批量下载</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-share" type="warning">批量分享</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-delete" type="danger">批量删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div>
            
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      breadcrumbData: [],
      folderData: [],
      fileLists: [{
        isFolder: true,
        name: '文件夹1',
        children: [{
          isFolder: true,
          name: '文件夹3'
        }, {
          isFolder: true,
          name: '文件夹5'
        }, {
          isFolder: true,
          name: '文件夹6'
        }, {
          name: '图片6',
          type: 'image',
          src: 'http://p0.qhimgs4.com/video/120_77_/t0155d38e4765ffb07f.jpg?size=720x495'
        }]
      }, {
        isFolder: true,
        name: '文件夹2',
        children: [{
          isFolder: true,
          name: '文件夹4'
        }]
      }]
    }
  },
  methods: {
    switchFolder(data) {
      this.folderData = data
    },
    handleMenuClick(item, i) {
      this.activeIndex = i
      this.switchFolder(item.children)
    },
    handleDownload() {

    },
    resourceRemove() {

    }
  }
}
</script>

<style scoped lang="scss">
 $imageWidth: 80px;
</style>
<template>
  <div class="resource-mine">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card>
          <el-col style="margin-bottom: 15px;" :span="24">
            <el-form size="small" style="margin-bottom: 0px;" class="avue-crud-search" :inline="true">
              <el-form-item label="文件名">
                <el-input v-model="searchText" clearable placeholder="请输入文件名" />
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" @click="search" type="primary">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="uploadFile" icon="el-icon-upload" type="success">上传文件</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="addFolder" icon="el-icon-upload" type="success">新建文件夹</el-button>
              </el-form-item>
              <el-form-item>
                <el-button v-if="false" @click="batchDownload" icon="el-icon-download" type="info">批量下载</el-button>
              </el-form-item>
              <el-form-item>
                <el-button v-if="false" icon="el-icon-share" type="warning">批量分享</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="batchDel" icon="el-icon-delete" type="danger">批量删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="refreshResource" icon="el-icon-delete" type="info">刷新</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
        <el-card style="margin-top: 15px">
          <el-col style="margin-bottom: 15px;" :span="24">
            <file-list @onShareFilePublic="shareFilePublic" @onShareFile="shareFile" ref="fileList" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <member-select @save="onShareFile" v-model="memberShow" />
    <upload-dialog @uploadSuccess="uploadFiles" :dialogVisible.sync="uploadDialogVisible" />
    <el-dialog :visible.sync="newFolderModalVisible">
      <div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadDialog from '../components/UploadDialog'
import MemberSelect from '@/components/MemberSelect'
import { uploadFile, querySubList, addFolder, shareToPrivate, downloadFile, shareToPublic, batchDel } from '@/api/resourceManageApi'
import FileList from '../components/FileList'
import permission from '@/mixins/permission'
import { download } from '@/utils'
import _ from 'lodash'
export default {
  mixins: [permission],
  data() {
    return {
      thirdMenuName: 'myResource',
      newFolderModalVisible: false,
      memberShow: false,
      uploadDialogVisible: false,
      activeIndex: 0,
      shareId: '',
      searchText: ''
    }
  },
  methods: {
    search() {
      this.$refs['fileList'].refreshCurrentFolder(this.searchText)
    },
    async batchDel() {
      let ids = this.$refs['fileList'].selection
      if (!ids.length) {
        this.$message.warning('请至少选择一个文件')
        return
      }
      try {
        await this.$confirm('确定删除这些文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await batchDel(ids.join(','))
        this.$message.success('删除成功')
        await this.$refs['fileList'].refreshCurrentFolder()
      } catch(err) {

      }
    },
    async batchDownload() {
      let ids = this.$refs['fileList'].selection
      if (!ids.length) {
        this.$message.warning('请至少选择一个文件')
        return
      }
      try {
        let res = await downloadFile(ids.join(','))
        download(res.data)
      } catch(err) {

      }
    },
    shareFile(id) {
      this.shareId = id
      this.memberShow = true
    },
    async shareFilePublic(id) {
      try {
        let res = await shareToPublic(id)
        this.$message.success('分享成功')
      } catch(err) {

      }
    },
    async addFolder() {
      const { currentPath } = this.$refs['fileList']
      try {
        let res = await addFolder({parentId: currentPath.id === 'root' ? '' : currentPath.id})
        this.refreshFolder(currentPath.id)
      } catch(err) {

      }
    },
    getIcon(type) {
      try {
        return require(`../../../assets/${type}_icon.png`)
      } catch(err) {
        return require('../../../assets/other_icon.png')
      }
    },
    async uploadFiles(files) {
      const { currentPath } = this.$refs['fileList']
      try {
        let res = await uploadFile({
          parentId: currentPath.id === 'root' ? '' : currentPath.id, 
          fileList: _.map(files, n => {
            return {
              filePath: n['data'][0].url,
              name: n['data'][0].name
            }
          })
        })
        await this.refreshFolder(currentPath.id)
        this.uploadDialogVisible = false
      } catch(err) {
        console.log(err)
      }
    },
    async refreshResource() {
      try {
        await this.$refs['fileList'].refreshCurrentFolder()
      } catch(err) {
        
      }
    },
    async onShareFile(ids) {
      try {
        await shareToPrivate({
          fileId: this.shareId,
          recUserId: ids.value.join(',')
        })
        this.$message.success('分享成功')
      } catch(err) {

      }
    },
    async refreshFolder(id) {
      try {
        this.$refs['fileList'].refreshFolder(id)
      } catch(err) {

      }
    },
    handleMenuClick(item, i) {
      this.activeIndex = i
      this.switchFolder(item.children)
    },
    singleShare() {
      this.memberShow = true
    },
    handleDownload() {

    },
    uploadFile() {
      this.uploadDialogVisible = true
    },
    resourceRemove() {

    },

  },
  mounted() {
    console.log(this)
  },
  components: {
    FileList,
    UploadDialog,
    MemberSelect
  }
}
</script>

<style scoped lang="scss">
 $imageWidth: 80px;
 .custom-tree-node {
   font-size: 14px;
   .tree-icon {
     font-size: 18px;
     margin-right: 5px;
   }
 }
 .add-folder {
   width: 100%;
   margin-top: 10px;
 }
 .file-icon {
   width: 45px;
 }
</style>
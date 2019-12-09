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
                <el-button @click="uploadFile" icon="el-icon-upload" type="success">上传文件</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="addFolder" icon="el-icon-upload" type="success">新建文件夹</el-button>
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
              <el-form-item>
                <el-button @click="refrshResource" icon="el-icon-delete" type="info">刷新</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-card>
        <el-card style="margin-top: 15px">
          <el-col style="margin-bottom: 15px;" :span="24">
            <file-list @onShareFile="shareFile" ref="fileList" :fileList="treeData" />
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <member-select v-model="memberShow" />
    <upload-dialog @uploadSuccess="uploadFiles" :dialogVisible.sync="uploadDialogVisible" />
    <el-dialog :visible.sync="newFolderModalVisible">
      <div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadDialog from '../components/UploadDialog'
import tableCommon from '@/mixins/table-common'
import MemberSelect from '@/components/MemberSelect'
import { queryFolderTree, uploadFile, querySubList, addFolder } from '@/api/resourceManageApi'
import FileList from '../components/FileList'
import permission from '@/mixins/permission'
import _ from 'lodash'
export default {
  mixins: [tableCommon, permission],
  data() {
    return {
      thirdMenuName: 'myResource',
      newFolderModalVisible: false,
      memberShow: false,
      uploadDialogVisible: false,
      fn: queryFolderTree,
      activeIndex: 0,
    }
  },
  computed: {
    treeData() {
      return this.toTree(this.tableList)
    }
  },
  methods: {
    search() {

    },
    shareFile(id) {
      this.memberShow = true
    },
    async addFolder() {
      const { currentPath } = this.$refs['fileList']
      try {
        let res = await addFolder({parentId: currentPath.id === 'root' ? '' : currentPath.id})
        this.refreshFolder(currentPath.id)
      } catch(err) {

      }
    },
    toTree(data) {
      _.forEach(data, n => {
        delete n.children
      })
      let map = {}
      _.forEach(data, n => {
        map[n.id] = n
      })
      let val = []
      _.forEach(data, n => {
        let parent = map[n.parentId]
        if (parent) {
          (parent.children || ( parent.children = [] )).push(n)
        } else {
          val.push(n)
        }
      })
      return val
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
           filePath: '/' + files[0].data[0].url, 
           name: files[0].data[0].name, 
           createUserId: ''
        })
        await this.refreshFolder(currentPath.id)
        this.uploadDialogVisible = false
      } catch(err) {
        console.log(err)
      }
    },
    async refrshResource() {
      try {
        await this.$refs['fileList'].refreshCurrentFolder()
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
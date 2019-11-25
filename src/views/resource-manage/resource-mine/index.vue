<template>
  <div class="resource-mine">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card>
          <div>
            <el-tree :props="treeProps" :data="fileLists">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i class="tree-icon el-icon-folder-opened"></i>{{ node.label }}
                </span>              
              </span>
            </el-tree>
            <el-button class="add-folder" icon="el-icon-circle-plus-outline" type="primary" size="medium">新建文件夹</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
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
          <el-col style="margin-bottom: 15px;" :span="24">
            <el-table 
              :data="tableList"
              :show-header="false"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="类型"
                width="120">
                <template slot-scope="scope">
                  <img class="file-icon" :src="getIcon(scope.row.type)" />
                </template>
              </el-table-column>
              <el-table-column
                label="文件名"
                >
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                label="大小"
                width="120">
                <template slot-scope="scope">{{ scope.row.size }}</template>
              </el-table-column>
              <el-table-column
                label="上传日期"
                width="120">
                <template slot-scope="scope">{{ scope.row.createTime }}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <div class="cell">
                    <el-button type="text">查看</el-button>
                    <el-button @click="singleShare" type="text">分享</el-button>
                    <el-button type="text">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <member-select v-model="memberShow" />
    <upload-dialog @uploadSuccess="uploadFiles" :dialogVisible.sync="uploadDialogVisible" />
  </div>
</template>

<script>
import UploadDialog from '../components/UploadDialog'
import MemberSelect from '@/components/MemberSelect'
import tableCommon from '@/mixins/table-common'
import { queryFolderTree } from '@/api/resourceManageApi'
export default {
  mixins: [tableCommon],
  data() {
    return {
      memberShow: false,
      uploadDialogVisible: false,
      activeIndex: 0,
      treeConfig: {
        loading: false
      },
      tableList: [{
        type: 'pdf',
        name: 'aaa.pdf',
        size: '3.2MB',
        createTime: '2018-09-10'
      }, {
        type: 'pdf',
        name: 'aaa.pdf',
        size: '3.2MB',
        createTime: '2018-09-10'
      }],
      treeProps: {
        label: 'name'
      },
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
  components: {
    UploadDialog,
    MemberSelect
  },
  mounted() {
    this.getFolderTree()
  },
  methods: {
    search() {

    },
    async getFolderTree() {
      this.treeConfig.loading = true
      try {
        let data = await queryFolderTree()
        console.log(data)
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
    uploadFiles(files) {
      console.log(files)
      this.uploadDialogVisible = false
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

    }
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
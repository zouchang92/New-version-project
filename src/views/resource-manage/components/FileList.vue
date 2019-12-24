<template>
  <div>
  <vue-context ref="folderMenu">
    <template slot-scope="child" v-if="child.data">
       <li @click="handleFolderMenuClick(1, child.data)">
         <a  href="javascript:;">打开</a>
       </li>
       <li @click="handleFolderMenuClick(2, child.data)">
         <a href="javascript:;">重命名</a>
       </li>
       <li @click="handleFolderMenuClick(3, child.data)">
         <a href="javascript:;">全选</a>
       </li>
       <li @click="handleFolderMenuClick(4, child.data)">
         <a href="javascript:;">详情</a>
       </li>
       <li @click="handleFolderMenuClick(5, child.data)">
         <a href="javascript:;">分享</a>
       </li>
       <li @click="handleFolderMenuClick(6, child.data)">
         <a href="javascript:;">分享(所有人)</a>
       </li>
       <li @click="handleFolderMenuClick(0, child.data)">
         <a href="javascript:;"><span style="color: red;width: 300px">删除</span></a>
       </li>
    </template>
    </vue-context>
        <vue-context ref="fileMenu">
          <template slot-scope="child" v-if="child.data">
            <li @click="handleFileMenuClick(1, child.data)">
              <a href="javascript:;">详情</a>
            </li>
            <li @click="handleFileMenuClick(2, child.data)">
              <a href="javascript:;">重命名</a>
            </li>
            <li @click="handleFileMenuClick(3, child.data)">
              <a href="javascript:;">全选</a>
            </li>
            <li @click="handleFileMenuClick(5, child.data)">
              <a href="javascript:;">下载</a>
            </li>
            <li @click="handleFileMenuClick(6, child.data)">
              <a href="javascript:;">分享</a>
            </li>
            <li @click="handleFileMenuClick(7, child.data)">
              <a href="javascript:;">分享(所有人)</a>
            </li>
            <li @click="handleFileMenuClick(0, child.data)">
              <a href="javascript:;"><span style="color: red;width: 300px">删除</span></a>
            </li>
          </template>
        </vue-context>
        <vue-context ref="recyclerMenu">
          <template slot-scope="child" v-if="child.data">
            <li @click="handleRecyclerMenuClick(1, child.data)">
              <a href="javascript:;">还原</a>
            </li>
            <li @click="handleRecyclerMenuClick(0, child.data)">
              <a href="javascript:;"><span style="color: red;width: 300px">删除</span></a>
            </li>
          </template>
        </vue-context>
        <vue-context ref="publicFileMenu">
          <template slot-scope="child" v-if="child.data">
            <li @click="handleFileMenuClick(1, child.data)">
              <a href="javascript:;">详情</a>
            </li>
            <li @click="handleFileMenuClick(5, child.data)">
              <a href="javascript:;">下载</a>
            </li>
          </template>
        </vue-context>
        <vue-context ref="publicFolderMenu">
          
        </vue-context>
    <div class="file-list">
      <el-breadcrumb v-if="type==='normal'" separator="/">
        <el-breadcrumb-item :class="{'drill-able': item.drill}" v-for="(item, i) in bread" :key="i">
          <a @click="onBreadcrumbClick(item, i)" href="#" v-if="item.drill">{{item.name}}</a>
          <span v-else>{{item.name}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="file-finder" v-loading="loading">
          <div class="file-item" @contextmenu.prevent="$refs[item._contextmenu].open($event, item)" :index="currentFolder.indexOf(item)" @click="onClickFile(item)" :class="{directory: item.isFile === '0', selected: selection.indexOf(item.id) > -1}" v-for="(item, i) in currentFolder" :key="i">
            <div v-if="item.isFile === '0'">
              <img src="@/assets/folder_icon.png" />
            </div>
            <div v-else>
              <img v-if="item.fileType === 'jpeg' || item.fileType === 'png' || item.fileType === 'jpg' || item.fileType === 'gif' || item.fileType === 'svg'"  :src='baseUrl + item.filePath + item.name' />
              <img v-else :src="getIcon(item.fileType)" />
            </div>
            <label>{{item.name}}</label>
          </div>
      </div>
       <abnor :title="warnText" v-if="currentFolder.length === 0 && !loading" type="DATA" />
    </div>
    <el-dialog :visible.sync="folderInfoDialog.show" :title="folderInfoDialog.title" @on-ok="">
            <div style="white-space: pre-line">
                {{folderInfoDialog.info}}
            </div>
            <div slot="footer">
            </div>
    </el-dialog>
    <el-dialog title="重命名" :visible.sync="renameDialog.show">
      <el-form>
        <el-form-item label="文件名">
          <el-input v-model="renameDialog.name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="renameDialog.loading" type="primary" @click="reName">确 定</el-button>
        <el-button :disabled="renameDialog.loading" @click="renameDialog.show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { querySubList, downloadFile, deleteFile, deleteFolder, queryRecyclerList, queryMyFileList, queryPublicFile, truncateFile, truncateDirectory, reNameFile, reNameFolder, restoreFile, restoreFolder } from '@/api/resourceManageApi'
import Abnor from '@/components/Abnor'
import moment from 'moment'
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';
let baseUrl = process.env.VUE_APP_BASE_API
export default {
  data() {
    return {
      currentFolder: [],
      bread: [],
      selection: [],
      baseUrl,
      renameDialog: {
        show: false,
        type: '',
        id: '',
        name: '',
        loading: false,
        fileType: ''
      },
      fnMap: {
        normal: querySubList,
        recycler: queryRecyclerList,
        myFile: queryMyFileList,
        public: queryPublicFile
      },
      contextFileMenuIndex: -1,
      contextFolderMenuIndex: -1,
      contextMenuType: {
        normal: {
          file: 'fileMenu',
          folder: 'folderMenu'
        },
        recycler: {
          file: 'recyclerMenu',
          folder: 'recyclerMenu'
        },
        myFile: {
          file: 'fileMenu',
          folder: 'folderMenu'
        },
        public: {
          file: 'publicFileMenu',
          folder: 'publicFolderMenu'
        }
      },
      itemClickTime: 0,
      loading: false,
      warnText: '',
      folderInfoDialog: {
        show: false,
        title: '',
        info: ''
      }
    }
  },
  props: {
    fileList: {
      type: Array
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler: function(val) {

      }
    }
  },
  computed: {
    ...mapGetters(['name']),
    currentPath() {
      return this.bread[this.bread.length - 1]
    },
    selectedFiles() {
      return _.filter(this.currentFolder, n => {
        if (this.selection.indexOf(n.id) > -1) {
          return true
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    this.bread = this.getInitBread(this.fileList)
    this.getFolderFile('root')
  },
  methods: {
    selectFile(item) {
      if (this.selection.indexOf(item.id) !== -1) {
        this.selection.splice(this.selection.indexOf(item.id), 1);
      } else {
        this.selection.push(item.id);
      }
    },
    async reName() {
      const { type, id, name, fileType  } = this.renameDialog
      this.renameDialog.loading = true
      if (name === '') {
        this.renameDialog.loading = false
        return
      }
      const fn = type === 'file' ? reNameFile : reNameFolder
      try {
        let res = await fn({
          id,
          name: type === 'file' ? (name + '.' + fileType) : name
        })
        this.renameDialog = {
          ...this.renameDialog,
          loading: false,
          show: false,
          name: ''
        }
        this.$message.success('重命名成功')
        await this.refreshCurrentFolder()
      } catch(err) {
        this.renameDialog = {
          ...this.renameDialog,
          loading: false,
        }
      }
    },
    openReNameDialog({id, type, fileType}) {
      this.renameDialog = {
        ...this.renameDialog,
        id,
        type,
        loading: false,
        show: true,
        name: '',
        fileType
      }
    },
    handleRecyclerMenuClick(action, data) {
      let file = data
      switch(action) {
        case 0:
          this.truncateFile(data.isFile === '0' ? 'folder' : 'file', file.id)
          break;
        case 1: 
          this.recoverFile(file)
          break;
      }
    },
    async recoverFile(file) {
      const isFile = file.isFile === '1'
      let fn = isFile ? restoreFile : restoreFolder
      try {
        await fn(file.id)
        this.$message.success('还原成功')
        await this.refreshCurrentFolder()
      } catch(err) {

      }
    },
    handleFolderMenuClick(action, data) {
      let file = data
      switch(action) {
        case 0:
          this.deleteFile('folder', file.id)
          break;
        case 2:
          this.openReNameDialog({id: file.id, type: 'folder', fileType: ''})
          break;
        case 5: 
          this.$emit('onShareFile', file.id)
          break;
        case 6:
          this.$emit('onShareFilePublic', file.id)
          break;
      }
    },
    handleFileMenuClick(action, data) {
      let file = data
      switch(action) {
        case 0:
          this.deleteFile('file', file.id)
          break;
      
        case 1:
          this.folderInfoDialog.show = true
          this.folderInfoDialog.title = `${file.name}简介`
          this.folderInfoDialog.info = `文件路径：${file.filePath}\n上传时间：${moment(file.updateTime).format('YYYY-MM-DD HH:mm:ss')}\n大小：${file.size}`
          break;
        case 2 :
          this.openReNameDialog({id: file.id, type: 'file', fileType: file.fileType})
          break;
        case 5:
          this.downloadFile(file.id)
          break;
        case 6:
          this.$emit('onShareFile', file.id)
          break;
        case 7:
          this.$emit('onShareFilePublic', file.id)
          break;
      }
    },
    async truncateFile(type, id) {
      let fn = type === 'file' ? truncateFile : truncateDirectory
      try {
        await fn(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.refreshCurrentFolder()
      } catch(err) {
        console.log(err)
      }
    },
    async deleteFile(type, id) {
      let fn = type === 'file' ? deleteFile : deleteFolder
      try {
        await fn(id)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.refreshCurrentFolder()
      } catch(err) {
        console.log(err)
      }
    },
    refreshCurrentFolder(name = '') {
      this.getFolderFile(this.currentPath.id, name)
    },
    async downloadFile(id) {
      try {
        let res = await downloadFile(id)
        window.open(`${res.data}`)
      } catch(err) {
        console.log(err)
      }
    },
    getInitBread(data) {
      return [{
        name: 'zyFile',
        drill: false,
        id: ''
      }, {
        name: this.name,
        drill: false,
        id: ''
      }, {
        name: '我的资源',
        drill: true,
        id: 'root',
      }]
      
    },
    onBreadcrumbClick(item, i) {
      let index = _.findIndex(this.bread, n => (n.id === item.id))
      this.bread = this.bread.slice(0, index + 1)
      this.getFolderFile(item.id)
    },
    async getFolderFile(id, name = '') {
      this.loading = true
      let fn = this.fnMap[this.type]
      try {
        let res = await fn({parentId: id === 'root' ? '' : id, name})
        this.fileFilter(res.data)
        if (!res.data.length) {
          this.warnText = '该文件夹下还没有文件哦'
        }
        this.loading = false
        this.selection = []
        return res.data
      } catch(err) {
        this.loading = false
        throw new Error(err)
      }
    },
    filterType(files) {
      return _.map(files, n => {
        if (n.isFile === '0') {
          return {
            ...n,
            _contextmenu: this.contextMenuType[this.type]['folder']
          }
        } else {
          return {
            ...n,
            _contextmenu: this.contextMenuType[this.type]['file']
          }
        }
      })
    },
    onClickFile(item, index) {
      let time = new Date().getTime()
      const CLICKTIME = 300
      if ((time - this.itemClickTime) < CLICKTIME) {
        this.itemClickTime = 0
        if (item.isFile === '0') {
          if (this.type === 'normal') {
            this.bread.push({...item, drill: true})
            this.getFolderFile(item.id)
          }
        } else {

        }
      } else {
        if (this.itemClickTime === 0) {
          setTimeout(() => {
            if (this.itemClickTime !== 0) {
              this.selectFile(item)
            }
            this.itemClickTime = 0
          }, CLICKTIME)
        }
        this.itemClickTime = time
      }
    },
    refreshFolder(id) {
      return this.getFolderFile(id)
    },
    getFile() {

    },
    fileFilter(file) {
      this.currentFolder = this.filterType(file)
    },
    getIcon(type) {
      try {
        return require(`../../../assets/${type}_icon.png`)
      } catch(err) {
        return require('../../../assets/other_icon.png')
      }
    },
  },
  components: {
    Abnor,
    VueContext
  }
}
</script>

<style lang="scss">
.file-list {
  .el-breadcrumb__inner a {
    font-weight: 700!important;
    cursor: pointer;
  }
  .file-finder {
    padding: 15px 30px;
    .file-item {
      width: 120px;
      display: -moz-inline-stack;
      display: inline-block;
      vertical-align: top;
      zoom: 1;
      *display: inline;
      margin: 0 3px 3px 0;
      padding: 1px 0;
      text-align: center;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      color: #000;
      background-color: transparent;
      &.selected {
        background-color: #d2dae2;
      }
      > div {
        margin-top: 4px;
      }
      img {
        width: 66px;
        height: 60px;
        margin: 1px auto;
        padding: 0;
        object-fit: cover;
      }
      label {
        display: block;
        font: 12px/1.5 tahoma,arial;
        line-height: 23px;
        padding: 0 1px;
        margin: 0;
        height: 23px;
        overflow: hidden;
        cursor: default;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
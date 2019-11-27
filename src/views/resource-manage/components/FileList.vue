<template>
  <div>
  <v-contextmenu ref="folderMenu" >
            <v-contextmenu-item @click="handleFolderMenuClick(1)">打开</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFolderMenuClick(2)">重命名</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFolderMenuClick(3)">全选</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFolderMenuClick(4)">详情</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFolderMenuClick(0)"><span style="color: red;width: 300px">删除</span>
            </v-contextmenu-item>
        </v-contextmenu>
        <v-contextmenu ref="fileMenu" @contextmenu="handleFileMenu">
            <v-contextmenu-item @click="handleFileMenuClick(1)">详情</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFileMenuClick(2)">重命名</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFileMenuClick(3)">全选</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFileMenuClick(5)">下载</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFileMenuClick(6)">分享</v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="handleFileMenuClick(0)"><span style="color: red;width: 300px">删除</span>
            </v-contextmenu-item>
        </v-contextmenu>
    <div class="file-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :class="{'drill-able': item.drill}" v-for="(item, i) in bread" :key="i">
          <a @click="onBreadcrumbClick(item, i)" href="#" v-if="item.drill">{{item.name}}</a>
          <span v-else>{{item.name}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="file-finder" v-loading="loading">
          <div v-contextmenu="item._contextmenu" @click="onClickFile(item)" :class="{directory: item.isFile === '0', selected: selection.indexOf(item.id) > -1}" v-for="(item, i) in currentFolder" :key="i">
            <img v-if="item.isFile === '0'" src="@/assets/folder_icon.png" />
            <img v-else :src="getIcon(item.fileType)" />
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
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { querySubList, downloadFile } from '@/api/resourceManageApi'
import Abnor from '@/components/Abnor'
import moment from 'moment'
export default {
  data() {
    return {
      currentFolder: [],
      bread: [],
      selection: [],
      contextFileMenuIndex: -1,
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
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler: function(val) {
        this.fileFilter(val)
        this.bread = this.getInitBread(this.fileList)
      }
    }
  },
  computed: {
    ...mapGetters(['name']),
    currentPath() {
      return this.bread[this.bread.length - 1]
    }
  },
  methods: {
    selectFile(item) {
      this.selection.push(item.id)
    },
    handleFileMenu(ref) {
      this.contextFileMenuIndex = ref.data.key
    },
    handleFolderMenuClick(index) {
      
    },
    deleteFile() {

    },
    handleFileMenuClick(action) {
      let file = this.currentFolder[this.contextFileMenuIndex]
      switch(action) {
        case 0:
          break;
        case 1:
          this.folderInfoDialog.show = true
          this.folderInfoDialog.title = `${file.name}简介`
          this.folderInfoDialog.info = `文件路径：${file.filePath}\n上传时间：${moment(file.updateTime).format('YYYY-MM-DD HH:mm:ss')}\n大小：${file.size}`
          break;
        case 5:
          this.downloadFile(file.id)
          break;
      }
    },
    async downloadFile(id) {
      try {
        let res = await downloadFile(id)

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
        children: this.fileList
      }]
      
    },
    onBreadcrumbClick(item, i) {
      let index = _.findIndex(this.bread, n => (n.id === item.id))
      this.bread = this.bread.slice(0, index + 1)
      this.getFolderFile(item.id)
    },
    async getFolderFile(id) {
      this.loading = true
      try {
        let res = await querySubList({parentId: id === 'root' ? '' : id})
        this.fileFilter(res.data)
        if (!res.data.length) {
          this.warnText = '该文件夹下还没有文件哦'
        }
        this.loading = false
        this.selection = []
      } catch(err) {
        this.loading = false
      }
    },
    fileterType(files) {
      return _.map(files, n => {
        if (n.isFile === '0') {
          return {
            ...n,
            _contextmenu: 'folderMenu'
          }
        } else {
          return {
            ...n,
            _contextmenu: 'fileMenu' 
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
          
          this.bread.push({...item, drill: true})
          this.getFolderFile(item.id)
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
      this.getFolderFile(id)
    },
    getFile() {

    },
    fileFilter(file) {
      console.log(this.fileterType(file))
      this.currentFolder = this.fileterType(file)
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
    Abnor
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
    > div {
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
      img {
        width: 66px;
        height: 60px;
        margin: 1px auto;
        padding: 0;
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
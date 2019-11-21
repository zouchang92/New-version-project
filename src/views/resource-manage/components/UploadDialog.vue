<template>
  <div>
    <el-dialog @close="closeModal" :visible="dialogVisible" title="上传文件">
      <div>
        <div class="drag-area">
          <VueFileAgent
            ref="vueFileAgent"
            v-model="filesData"
            :deletable="true"
            :helpText="'拖拽或点击上传'"
            @delete="fileDeleted($event)"
            @select="filesSelected($event)"
          ></VueFileAgent>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" size="medium" type="primary" @click="uploadFiles">上传</el-button>
        <el-button size="medium" @click="closeModal">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_BASE_API}/zhxyx/upload/file`,
      filesData: [],
      filesDataForUpload: [],
      loading: false
    }
  },
  methods: {
    async closeModal() {
      if (this.filesDataForUpload.length) {
        try {
          await this.$confirm('还有文件未上传，是否取消?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.$emit('update:dialogVisible', false)
          this.reset()
        } catch(err) {

        }
      } else {
        this.$emit('update:dialogVisible', false)
        this.reset()
      }
      
    },
    fileDeleted(fileData) {
      var i = this.filesDataForUpload.indexOf(fileData);
      if(i !== -1){
        this.filesDataForUpload.splice(i, 1);
      }
      else {
        this.deleteUploadedFile(fileData);
      }
    },
    deleteUploadedFile() {

    },
    reset() {
      this.filesData = []
      this.filesDataForUpload = []
      this.loading = false
    },
    async uploadFiles() {
      this.loading = true
      try {
        let res = await this.$refs.vueFileAgent.upload(this.uploadUrl, {}, this.filesDataForUpload)
        this.loading = false
        this.$emit('uploadSuccess', this.filesData)
        this.reset()
      } catch(err) {
        this.loading = false
      }
    },
    filesSelected(filesData){
      var validFilesData = [];
      for(var i = 0; i < filesData.length; i++){
        if(!filesData[i].error){
          validFilesData.push(filesData[i])
        }
      }
      this.filesDataForUpload = this.filesDataForUpload.concat(validFilesData)
    },
  },
  computed: {
    filesDataInvalid() {
      var filesDataInvalid = []
      for(var i = 0; i < this.filesData.length; i++){
        if(this.filesData[i].error){
          filesDataInvalid.push(this.filesData[i])
        }
      }
      return filesDataInvalid
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
 .drag-area {

  }
</style>
<template>
  <el-dialog @close="handleClose" :visible="value">
    <div class="member-select">
      <div class="member-tag">
        <el-tag size="medium" style="margin-right: 5px;" @close="handleCancel(item)" v-for="item in this.memberData" :key="item.value" closable>{{item.label}}</el-tag>
      </div>
      <div>
        <el-form size="small" :inline="true">
          <el-form-item>
            <el-tree-select @node-click="onOrganChange" ref="treeSelect" :treeParams="treeParams" :data="children" v-model="formData.organId"/>
          </el-form-item>
          <el-form-item>
            <el-select @change="onOrgTypeChange" clearable v-model="formData.orgType">
              <el-option v-for="(item, i) in orgType" :key="i" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-breadcrumb style="margin-top: 10px;" separator="/">
        <el-breadcrumb-item
          @click.native="onBreadcrumbClick(item, i)"
          v-for="(item, i) in this.breadcrumbData"
          :key="i"
        >{{item.orgName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="list">
        <ul>
          <Container :loading="userLoading" :empty="members.length === 0">
            <li
              slot="child-slot"
              @click="triggerMember(item, i)"
              v-for="(item, i) in members"
              :key="i"
            >
              <i class="el-icon-user" />
              {{item.userName}}
              <el-checkbox
                class="user-checkbox"
                @click="triggerMember(item, i)"
                :value="selectedValue.indexOf(item.id) > -1"
              ></el-checkbox>
            </li>
          </Container>
        </ul>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleSave">确定</el-button>
      <el-button type="primary" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getOrgan, getDictById } from '@/utils'
import tableCommon from '@/mixins/table-common.js'
import { queryTeacher } from '@/api/teacherManageApi'
import Container from '@/components/Container'
import { queryUsers } from '@/api/userManageApi'
import _ from 'lodash'
const orgTypeDict = getDictById('orgType')
export default {
  mixins: [tableCommon],
  data() {
    return {
      fn: queryTeacher,
      breadcrumbData: [],
      memberData: _.cloneDeep(this.memberSelected),
      children: getOrgan(),
      checkboxHidden: true,
      type: 'org',
      orgType: orgTypeDict,
      members: [],
      treeParams: {
        props: {
          label: 'orgName',
          value: 'id',
        },
        data: getOrgan()
      },
      userLoading: false,
      formData: {
        organId: '',
        orgType: ''
      },
      queryMap: {
        teacher: 'teacherDuty',
        student: 'studentDuty',
        parent: 'parentDuty'
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    memberSelected: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchType: {
      type: String,
      default: 'teacher'
    }
  },
  computed: {
    selectedValue() {
      return _.map(this.memberData, n => n.value)
    }
  },
  components: {
    Container
  },
  methods: {
    handleCancel(item) {
      this.removeMember(item.value)
    },
    onOrganChange() {
      this.getUser()
    },
    onOrgTypeChange() {
      this.getUser()
    },
    triggerMember(item, i) {
      if (this.selectedValue.indexOf(item.id) > -1) {
        this.removeMember(item.id)
      } else {
        this.memberData.push({
          label: item.userName,
          value: item.id
        })
      }
    },
    reset() {
      this.breadcrumbData = []
      this.members = []
    },
    removeMember(id) {
      let removeArray = []
      _.forEach(this.memberData, n => {
        if (n.value !== id) {
          removeArray.push(n)
        }
      })
      this.memberData = removeArray
    },
    handleClose() {
      this.$emit('input', false)
    },
    async getUser() {
      const { orgType, organId }= this.formData
      this.userLoading = true
      try {
        let data = await queryUsers({organId, page: 1, rows: 10000, orgType})
        this.members = data.data.list
        this.userLoading = false
      } catch(err) {
        this.userLoading = false
      }
    },
    handleSave() {
      this.$emit('save', {value: this.selectedValue, data: this.memberData})
      this.handleClose()
    }
  },
  watch: {
    memberSelected(val) {
      this.memberData = _.cloneDeep(val)
    },
    searchType(val) {

    }
  },
}
</script>

<style lang="scss">
.member-select {
  .member-tag {
    border: 1px solid #dcdcdc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .el-breadcrumb__item {
    font-size: 12px;
  }
  .list {
    margin-top: 20px;
    ul {
      list-style: none;
      height: 200px;
      overflow-x: hidden;
      padding: 0;
      margin: 0;
      li {
        i {
          font-size: 14px;
          margin-right: 5px;
        }
        width: auto;
        height: auto;
        display: block;
        position: relative;
        border-top: 1px solid #f8f8f8;
        border-bottom: 1px solid #f8f8f8;
        padding: 10px 5px;
        cursor: pointer;
        &:hover {
          background-color: #f8f8f8;
        }
        &:first-child {
          border-top: none;
        }
      }
    }

    .user-checkbox {
      float: right;
    }
  }
}
</style>
<template>
  <el-dialog @close="handleClose" :visible="value">
    <div class="member-select">
      <el-select size="mini" style="width: 100%" :value="selectedValue" multiple placeholder="请选择">
        <el-option
          v-for="item in this.memberData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-breadcrumb style="margin-top: 10px;" separator="/">
        <el-breadcrumb-item
          @click.native="onBreadcrumbClick(item, i)"
          v-for="(item, i) in this.breadcrumbData"
          :key="i"
        >{{item.orgName}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="list">
        <ul v-if="type==='org'">
          <li @click="onItemClick(item)" v-for="(item, i) in children" :key="i">
            <i class="el-icon-folder" />
            {{item.orgName}}
          </li>
        </ul>
        <ul v-if="type==='user'">
          <Container :loading="userLoading" :empty="members.length === 0">
            <li
              slot="child-slot"
              @click="triggerMember(item, i)"
              v-for="(item, i) in members"
              :key="i"
            >
              <i class="el-icon-user" />
              {{item.loginName}}
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
import { getOrgan } from '@/utils'
import tableCommon from '@/mixins/table-common.js'
import { queryTeacher } from '@/api/teacherManageApi'
import Container from '@/components/Container'
import { queryUsers } from '@/api/userManageApi'
import _ from 'lodash'
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
      members: [],
      userLoading: false,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    memberSelected: {
      type: Array,
      default: []
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
    triggerMember(item, i) {
      if (this.selectedValue.indexOf(item.id) > -1) {
        this.removeMember(item.id)
      } else {
        this.memberData.push({
          label: item.loginName,
          value: item.id
        })
      }
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
    onBreadcrumbClick(item, i) {
      this.children = item.child
      let type = this.setType(item.child)
      this.breadcrumbData = this.breadcrumbData.slice(0, i + 1)
      if (type === 'user') {
        this.getUser(item.id)
      }
    },
    async getUser(id) {
      this.userLoading = true
      
      try {
        let data = await queryUsers({organId: id, page: 1, rows: 10000})
        this.members = data.data.list
        this.userLoading = false
      } catch(err) {
        this.userLoading = false
      }
    },
    setType(children) {
      let type = children.length ? 'org' : 'user'
      this.type = type
      return type
    },
    onItemClick(item) {
      this.breadcrumbData.push(item)
      this.children = item.child
      let type = this.setType(item.child)
      if (type === 'user') {
        this.getUser(item.id)
      }
    },
    handleSave() {
      this.$emit('save', this.selectedValue)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss">
.member-select {
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
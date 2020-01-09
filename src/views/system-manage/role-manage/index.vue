<template>
  <div>
    <div class="table-container">
      <div class="basic-container">
        <avue-crud
          :permission="permission"
          rowKey="id"
          @search-change="searchChange"
          @selection-change="selectChange"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          @row-del="singleDel"
          @row-save="rowSave"
          @row-update="rowUpdate"
          :table-loading="tableListLoading"
          ref="crud"
          :page="page"
          :data="tableList"
          :option="option"
          v-model="obj"
        >
          <template slot="permission" slot-scope="scope">
            <el-button @click.native="setAuthorize(scope)">设置菜单权限</el-button>
          </template>
          <template slot="searchMenu">
            <el-button
              type="success"
              v-if="permission.addBtn"
              @click.stop="handleAdd()"
              icon="el-icon-plus"
              size="small"
            >新建</el-button>
            <el-button type="info" @click="resetList()" icon="el-icon-refresh" size="small" circle></el-button>
          </template>
        </avue-crud>
      </div>
      <el-dialog :visible.sync="roleModal.visible">
        <div style="height: 450px;overflow: auto;" v-loading="roleModal.loading" class>
          <el-tabs type="border-card">
            <el-tab-pane label="菜单权限">
              <el-tree
                :default-expand-all="true"
                @check="clickDeal"
                highlight-current
                :check-strictly="true"
                ref="authTree"
                :default-checked-keys="roleModal.defaultCheckedKeys"
                show-checkbox
                node-key="id"
                :data="roleModal.data"
                :props="treeProps"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <i
                    :class="{'el-icon-menu' : data.menuName, 'el-icon-edit-outline': data.buttonId}"
                  ></i>
                  <span>{{data.buttonId ? data.name : data.menuName}}</span>
                  <span>
                    <i
                      :class="data.belongSystem === '0' ? 'el-icon-monitor' : 'el-icon-mobile-phone'"
                    />
                  </span>
                </span>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="roleModal.submitLoading" @click="bindAuthorize">确定</el-button>
          <el-button @click="roleModal.visible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tableCommon from "@/mixins/table-common";
import permission from "@/mixins/permission";
import {
  queryRoles,
  addRole,
  deleteRole,
  updateRole,
  getRoleAuthorize,
  roleBindMenus
} from "@/api/roleManageApi";
import _ from "lodash";
export default {
  name: "roleManage",
  mixins: [tableCommon, permission],
  data() {
    return {
      searchForm: {},
      roleModal: {
        visible: false,
        loading: false,
        data: [],
        defaultCheckedKeys: [],
        submitLoading: false,
        currentRoleId: ""
      },
      treeProps: {
        children: "children",
        label: "name"
      },
      singleDelFn: deleteRole,
      fn: queryRoles,
      data: [],
      option: {
        column: [
          {
            label: "id",
            prop: "id",
            hide: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: "角色名称",
            prop: "roleName",
            rules: [
              {
                required: true
              }
            ],
            width: 200,
            search: true
          },
          {
            label: "备注",
            prop: "description",
            rules: [
              {
                required: false
              }
            ]
          },
          {
            label: "权限",
            prop: "permission",
            rules: [
              {
                required: false
              }
            ],
            width: 200,
            slot: true,
            addDisplay: false,
            editDisplay: false
          },
          {
            label: "创建时间",
            prop: "createTime",
            rules: [
              {
                required: false
              }
            ],
            type: "datetime",
            format: "yyyy-MM-DD HH:mm:ss",
            width: 200,
            addDisplay: false,
            editDisplay: false
          }
        ]
      },
      obj: {}
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    clickDeal(currentObj, treeStatus) {
      this.clickCheck(currentObj, treeStatus, this.$refs.authTree);
    },
    clickCheck(currentObj, treeStatus, ref) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      let selected = treeStatus.checkedKeys.indexOf(currentObj.id); // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj, ref);
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(currentObj, true, ref);
      } else {
        // 取消子节点的选中状态触发
        if (currentObj.parentId !== -1) {
          this.removeParent(currentObj, ref);
        }

        // 未选中 处理子节点全部未选中
        if (currentObj.children.length !== 0) {
          this.uniteChildSame(currentObj, false, ref);
        }
      }
    },
    uniteChildSame(treeList, isSelected, ref) {
      let treeListData = treeList.children;
      let len = treeListData.length;
      ref.setChecked(treeList.id, isSelected);
      for (let i = 0; i < len; i++) {
        this.uniteChildSame(treeListData[i], isSelected, ref);
      }
    },
    selectedParent(currentObj, ref) {
      let currentNode = ref.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        ref.setChecked(currentNode.parentId, true);
        return this.selectedParent(currentNode.parent, ref);
      }
    },
    /**    子节点全没选中取消父级的选中状态   **/
    removeParent(currentObj, ref) {
      let a = 0;
      let b = 0;
      let currentNode = ref.getNode(currentObj);
      if (currentNode.parent !== null) {
        if (currentNode.parent.key !== undefined) {
          ref.setChecked(currentNode.parent, true); //根节点
          this.removeParent(currentNode.parent, ref); //递归判断子节点
        }
      }
      //不为0表示为父节点
      if (currentNode.childNodes.length !== 0) {
        //循环判断父节点下的子节点
        for (let i = 0; i < currentNode.childNodes.length; i++) {
          //判断父节点下的子节点是否全为false
          if (currentNode.childNodes[i].checked === false) {
            ++a;
            //a === currentNode.childNodes.length 表明子节点全为false
            if (a === currentNode.childNodes.length) {
              //等于 undefined 跳过,不等于继续执行
              if (currentNode.childNodes[i].parent.key !== undefined) {
                ref.setChecked(currentNode.childNodes[i].parent, false); //父元素设置为false
                //循环上级父节点下的子节点
                for (let i = 0; i < currentNode.parent.childNodes.length; i++) {
                  //判断父节点下的子节点是否全为false
                  if (currentNode.parent.childNodes[i].checked === false) {
                    ++b;
                    //b === currentNode.parent.childNodes.length 表明子节点全为false
                    if (b === currentNode.parent.childNodes.length) {
                      ref.setChecked(currentNode.parent.key, false); //父元素设置为false
                      return this.removeParent(currentNode.parent, ref); //继续递归循环判断
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    handleAdd() {
      this.$refs.crud.rowAdd();
    },
    processRoleMenu(data) {
      let _data = _.cloneDeep(data);
      _.forEach(_data, (n, i) => {
        n.id = n.menuId;
        n.name = n.menuName;
        n.lastChild = false;
        if (n.children && n.children.length) {
          if (n.status === 1) {
            this.roleModal.defaultCheckedKeys.push(n.menuId);
          }

          n.children = this.processRoleMenu(n.children);
        } else {
          n.children = n.buttons;
          n.lastChild = true;
          if (n.status === 1) {
            this.roleModal.defaultCheckedKeys.push(n.id);
          }
          if (n.children.length) {
            _.forEach(n.children, k => {
              k.parentId = n.id;
              k.children = [];
              if (k.status === 1) {
                this.roleModal.defaultCheckedKeys.push(k.id);
              }
            });
          }
        }
      });
      return _data;
    },
    async setAuthorize(row) {
      this.roleModal.loading = true;
      this.roleModal.visible = true;
      this.roleModal.defaultCheckedKeys = [];
      this.roleModal.currentRoleId = row.row.id;
      try {
        let data = await getRoleAuthorize(row.row.id);
        let pData = this.processRoleMenu(data.data);
        this.roleModal = {
          ...this.roleModal,
          loading: false,
          visible: true,
          data: pData
        };
      } catch (err) {
        this.roleModal.loading = false;
        this.roleModal.visible = true;
      }
    },
    async bindAuthorize() {
      this.roleModal.submitLoading = true;
      let result = this.$refs.authTree.getCheckedNodes(false, true);
      try {
        let res = await roleBindMenus({
          roleId: this.roleModal.currentRoleId,
          menuIds: this.assembleMenuJson(result)
        });
        this.roleModal.submitLoading = false;
        this.roleModal.visible = false;
      } catch (err) {
        console.log(err);
        this.roleModal.submitLoading = false;
        this.roleModal.visible = false;
      }
    },
    assembleMenuJson(result) {
      let output = [];
      let data = _.cloneDeep(result);
      _.forEach(data, function(n) {
        let tmp = {};
        if (n.menuName) {
          tmp.id = n.id;
          tmp.buttons = [];
          if (n.lastChild) {
            n.children.forEach(x => {
              tmp.buttons.push({
                buttonId: x.buttonId,
                buttonUrl: x.buttonUrl || ""
              });
            });
          }
          output.push(tmp);
        }
      });
      return output;
    },
    uploadBefore(file, done) {
      alert(1);
    },
    async rowUpdate(row, index, done, loading) {
      loading(true);
      try {
        row.name = row.roleName;
        let result = await updateRole(row);
        this.$message.success('更新成功')
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    },
    async rowSave(row, done, loading) {
      loading(true);
      try {
        row.name = row.roleName;
        let result = await addRole(row);
        this.$message.success('添加成功')
        await this.resetList();
        done();
      } catch (err) {
        loading(false);
      }
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  font-size: 14px;
  padding-right: 8px;
}
</style>
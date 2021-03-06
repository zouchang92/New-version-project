<template>
    <div v-if="easyFlowVisible">
        <el-row>
            <!--左侧可以拖动的菜单-->
            <el-col :span="3" ref="nodeMenu">
                <node-menu @addNode="addNode"></node-menu>
            </el-col>
            <el-col :span="21">
                <el-row>
                    <!--画布-->
                    <el-col :span="24">
                        <div id="flowContainer" class="container">
                            <template v-for="node in data.nodeList">
                                <flow-node
                                        :key="node.id"
                                        v-show="node.show"
                                        :id="node.id"
                                        :node="node"
                                        @deleteNode="deleteNode"
                                        @changeNodeSite="changeNodeSite"
                                        @nodeRightMenu="nodeRightMenu"
                                        @editNode="editNode"
                                >
                                </flow-node>
                            </template>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 流程数据表单 -->
        <flow-node-form v-if="nodeFormVisible" ref="nodeForm"></flow-node-form>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'
    import { jsPlumb } from 'jsplumb'
    import FlowNode from './Node'
    import NodeMenu from './NodeMenu'
    import FlowNodeForm from './NodeForm'
    import lodash from 'lodash'
    import { getDataA } from './data_A'
    import { getDataB } from './data_B'
    import { getDataC } from './data_C'

    export default {
        data() {
            return {
                // jsPlumb 实例
                jsPlumb: null,
                easyFlowVisible: true,
                // 控制表单显示与隐藏
                nodeFormVisible: false,
                // 默认设置参数
                jsplumbSetting: {
                    // 动态锚点、位置自适应
                    Anchors: ['Top', 'TopCenter', 'TopRight', 'TopLeft', 'Right', 'RightMiddle', 'Bottom', 'BottomCenter', 'BottomRight', 'BottomLeft', 'Left', 'LeftMiddle'],
                    Container: 'flowContainer',
                    // 连线的样式 StateMachine、Flowchart
                    Connector: 'Flowchart',
                    // 鼠标不能拖动删除线
                    ConnectionsDetachable: false,
                    // 删除线的时候节点不删除
                    DeleteEndpointsOnDetach: false,
                    // 连线的端点
                    // Endpoint: ["Dot", {radius: 5}],
                    Endpoint: ["Rectangle", {height: 10, width: 10}],
                    // 线端点的样式
                    EndpointStyle: {fill: 'rgba(255,255,255,0)', outlineWidth: 1},
                    LogEnabled: true,//是否打开jsPlumb的内部日志记录
                    // 绘制线
                    PaintStyle: {stroke: 'black', strokeWidth: 3},
                    // 绘制箭头
                    Overlays: [['Arrow', {width: 12, length: 12, location: 1}]],
                    RenderMode: "svg"
                },
                // jsplumb连接参数
                jsplumbConnectOptions: {
                    isSource: true,
                    isTarget: true,
                    // 动态锚点、提供了4个方向 Continuous、AutoDefault
                    anchor: "Continuous"
                },
                jsplumbSourceOptions: {
                    /*"span"表示标签，".className"表示类，"#id"表示元素id*/
                    filter: ".flow-node-drag",
                    filterExclude: false,
                    anchor: "Continuous",
                    allowLoopback: false
                },
                jsplumbTargetOptions: {
                    /*"span"表示标签，".className"表示类，"#id"表示元素id*/
                    filter: ".flow-node-drag",
                    filterExclude: false,
                    anchor: "Continuous",
                    allowLoopback: false
                },
                // 是否加载完毕
                loadEasyFlowFinish: false,
                // 数据
                data: {},
            }
        },
        components: {
            draggable, FlowNode, NodeMenu, FlowNodeForm
        },
        mounted() {
            this.jsPlumb = jsPlumb.getInstance()
            this.$nextTick(() => {
                // 默认加载流程A的数据、在这里可以根据具体的业务返回符合流程数据格式的数据即可
                this.dataReload(getDataA())
            })
        },
        methods: {
            // 返回唯一标识
            getUUID() {
                return Math.random().toString(36).substr(3, 10)
            },
            jsPlumbInit() {
                const _this = this
                this.jsPlumb.ready(() => {
                    // 导入默认配置
                    this.jsPlumb.importDefaults(this.jsplumbSetting)
                    // 会使整个jsPlumb立即重绘。
                    this.jsPlumb.setSuspendDrawing(false, true);
                    // 初始化节点
                    this.loadEasyFlow()
                    // 单点击了连接线,
                    this.jsPlumb.bind('click', (conn, originalEvent) => {
                        this.$confirm('确定删除所点击的线吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.jsPlumb.deleteConnection(conn)
                        }).catch(() => {
                        })
                    })
                    // 连线
                    this.jsPlumb.bind("connection", (evt) => {
                        let from = evt.source.id
                        let to = evt.target.id
                        if (this.loadEasyFlowFinish) {
                            this.data.lineList.push({from: from, to: to})
                        }
                    })

                    // 删除连线回调
                    this.jsPlumb.bind("connectionDetached", (evt) => {
                        this.deleteLine(evt.sourceId, evt.targetId)
                    })

                    // 改变线的连接节点
                    this.jsPlumb.bind("connectionMoved", (evt) => {
                        this.changeLine(evt.originalSourceId, evt.originalTargetId)
                    })

                    // 单击endpoint
                    // jsPlumb.bind("endpointClick", function (evt) {
                    //   console.log('endpointClick', evt)
                    // })
                    //
                    // // 双击endpoint
                    // jsPlumb.bind("endpointDblClick", function (evt) {
                    //   console.log('endpointDblClick', evt)
                    // })

                    // contextmenu
                    this.jsPlumb.bind("contextmenu", (evt) => {
                        console.log('contextmenu', evt)
                    })

                    // 连线
                    this.jsPlumb.bind("beforeDrop", (evt) => {
                        let from = evt.sourceId
                        let to = evt.targetId
                        const { lineList } = this.data
                        if (from === to) {
                            this.$message.error('不能连接自己')
                            return false
                        }
                        if (!this.canDropNode(evt)) {
                            return false
                        }
                        if (this.hasLine(from, to)) {
                            this.$message.error('不能重复连线')
                            return false
                        }
                        if (this.hashOppositeLine(from, to)) {
                            this.$message.error('不能回环');
                            return false
                        }
                        this.$message({
                            message: '连线成功',
                            type: 'success'
                        })
                        return true
                    })

                    // beforeDetach
                    this.jsPlumb.bind("beforeDetach", (evt) => {
                        console.log('beforeDetach', evt)
                    })
                })
            },
            // 加载流程图
            loadEasyFlow() {
                // 初始化节点
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    // 设置源点，可以拖出线连接其他节点
                    this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
                    // // 设置目标点，其他源点拖出的线可以连接该节点
                    this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)

                    this.jsPlumb.draggable(node.id, {
                        containment: 'parent'
                    })
                }

                // 初始化连线
                for (var i = 0; i < this.data.lineList.length; i++) {
                    let line = this.data.lineList[i]
                    this.jsPlumb.connect({
                        source: line.from,
                        target: line.to
                    }, this.jsplumbConnectOptions)
                }
                this.$nextTick(function () {
                    this.loadEasyFlowFinish = true
                })
            },
            // 删除线
            deleteLine(from, to) {
                this.data.lineList = this.data.lineList.filter(function (line) {
                    if (line.from == from && line.to == to) {
                        return false
                    }
                    return true
                })
            },
            // 改变连线
            changeLine(oldFrom, oldTo) {
                this.deleteLine(oldFrom, oldTo)
            },
            // 改变节点的位置
            changeNodeSite(data) {
                for (var i = 0; i < this.data.nodeList.length; i++) {
                    let node = this.data.nodeList[i]
                    if (node.id === data.nodeId) {
                        node.left = data.left
                        node.top = data.top
                    }
                }
            },
            /**
             * 拖拽结束后添加新的节点
             * @param evt
             * @param nodeMenu 被添加的节点对象
             * @param mousePosition 鼠标拖拽结束的坐标
             */
            addNode(evt, nodeMenu, mousePosition) {
                let width = this.$refs.nodeMenu.$el.clientWidth
                let nodeId = this.getUUID(), left = mousePosition.left, top = mousePosition.top
                const hasStart = lodash.findIndex(this.data.nodeList, n => (n.type === 'start'))
                if (left < 0) {
                    left = evt.originalEvent.layerX - width
                }
                if (top < 0) {
                    top = evt.originalEvent.clientY - 50
                }
                var node = {
                    id: nodeId,
                    name: nodeMenu.name,
                    left: left + 'px',
                    top: top + 'px',
                    ico: nodeMenu.ico,
                    show: true,
                    type: nodeMenu.type,
                    rules: null,
                    flowId: null,
                    isEndTask: 0,
                    parentId: "",
                    assigneeMsg: []

                }
                /**
                 * 这里可以进行业务判断、是否能够添加该节点
                 */
                switch(nodeMenu.type) {
                  case 'start':
                    if (hasStart > -1) {
                      this.$message.error('已经有开始节点')
                      return
                    }
                    break;
                  case 'flow':
                  case 'end':
                    if (hasStart === -1) {
                      this.$message.error('请先放置开始节点')
                      return
                    }
                  break;
                

                }
                this.data.nodeList.push(node)
                this.$nextTick(function () {
                    this.jsPlumb.makeSource(nodeId, this.jsplumbSourceOptions)
                    this.jsPlumb.makeTarget(nodeId, this.jsplumbTargetOptions)
                    this.jsPlumb.draggable(nodeId, {
                        containment: 'parent'
                    })
                })
            },
            /**
             * 删除节点
             * @param nodeId 被删除节点的ID
             */
            deleteNode(nodeId) {
                this.$confirm('确定要删除节点' + nodeId + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false
                }).then(() => {
                    /**
                     * 这里需要进行业务判断，是否可以删除
                     */
                    this.data.nodeList = this.data.nodeList.filter(function (node) {
                        if (node.id === nodeId) {
                          return false
                            // 伪删除，将节点隐藏，否则会导致位置错位
                            node.show = false
                        }
                        return true
                    })
                    this.$nextTick(function () {
                        this.jsPlumb.removeAllEndpoints(nodeId);
                    })
                }).catch(() => {
                })
                return true
            },
            /**
             * 编辑节点
             * @param nodeId 被点击编辑的节点的ID
             */
            editNode(nodeId) {
                this.nodeFormVisible = true
                this.$nextTick(function () {
                    this.$refs.nodeForm.init(this.data, nodeId)
                })
            },
            // 是否具有该线
            hasLine(from, to) {
                for (var i = 0; i < this.data.lineList.length; i++) {
                    var line = this.data.lineList[i]
                    if (line.from === from && line.to === to) {
                        return true
                    }
                }
                return false
            },
            //是否是第一个节点
            canDropNode(evt) {
              let from = evt.sourceId
              let to = evt.targetId
              const { lineList } = this.data
              const type = lodash.find(this.data.nodeList, n => n.id === from).type
              const fromLines = lodash.filter(lineList, n => n.from === from) // 该节点连接了多少个节点
              const toLines = lodash.filter(lineList, n => n.to === from) // 有多少节点连接了该节点
              const isAttatchToStart = this.isAttatchToStart(from) //是否连接到开始节点
              if (type === 'start') {
                return true
              } 
              if (fromLines.length === 0) {
                return true
              }
              return false
            },
            //是否连接到开始
            isAttatchToStart(id) {
              let isAttatch = false
              const attatchLines = lodash.filter(this.data.lineList, n => n.to === id)
              lodash.forEach(attatchLines, n => {
                const index = lodash.find(this.data.nodeList, x => x.id === n.from)
                if (index.type === 'start') {
                  isAttatch = true
                }
              })
              return isAttatch
            },
            // 是否含有相反的线
            hashOppositeLine(from, to) {
                return this.hasLine(to, from)
            },
            nodeRightMenu(nodeId, evt) {
                this.menu.show = true
                this.menu.curNodeId = nodeId
                this.menu.left = evt.x + 'px'
                this.menu.top = evt.y + 'px'
            },
            getNodeData(data) {
              const startId = 'start'
              const endId = 'end'
              const nodeList = lodash.chain(data).flattenDeep().map(n => ({
                  ...n,
                  id: n.id,
                  name: n.taskName,
                  type: 'flow',
                  ico: 'el-icon-video-play',
                  show: true,
                  top: '0px',
                  left: '0px'
              })).concat({
                id: startId,
                name: '开始',
                top: '80px',
                left: '0px',
                type: 'start',
                ico: 'el-icon-video-play',
                show: true,
              }).concat({
                id: endId,
                name: '结束',
                top: '80px',
                right: '0px',
                type: 'end',
                ico: 'el-icon-video-pause',
                show: true,
              }).value()
              
              const lineList = lodash.reduce(nodeList, (result, value, key) => {
                if (value.type === 'start') {
                  return result
                }
                if (value.parentId) {
                  let parents = value.parentId.split(',')
                  lodash.forEach(parents, n => {
                    result.push({
                      from: n,
                      to: value.id
                    })
                  })
                }
                return result
              }, [])
              return {nodeList, lineList}
            },
            getSubmitData() {
              const { lineList, nodeList } = this.data
              return lodash.reduce(nodeList, (result, value, key) => {
                let parent = lodash.filter(lineList, n => {
                  return n.to === value.id
                })
                let isAttatchToEnd = lodash.filter(lineList, n => n.from === value.id && n.to === 'end')
                
                if (parent) {
                  value.parentId = lodash.map(parent, n => n.from).join(',')
                }
                value.isEndTask = isAttatchToEnd.length ? 1 : 0
                value.taskName = value.name
                result.push(value)
                return result
              }, [])
            },
            // 加载流程图
            dataReload(data = []) {
                this.easyFlowVisible = false
                this.data = this.getNodeData(data)
                this.$nextTick(() => {
                    data = lodash.cloneDeep(data)
                    this.easyFlowVisible = true
                    //this.data = data
                    this.$nextTick(() => {
                        this.jsPlumb = jsPlumb.getInstance()
                        this.$nextTick(() => {
                            this.jsPlumbInit()
                        })
                    })
                })
            },
        }
    }
</script>

<style scoped>
    #flowContainer {
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(0, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
        background-size: 10px 10px;
        height: 500px;
        background-color: rgb(251, 251, 251);
        /*background-color: #42b983;*/
        position: relative;
    }

    .labelClass {
        background-color: white;
        padding: 5px;
        opacity: 0.7;
        border: 1px solid #346789;
        /*border-radius: 10px;*/
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
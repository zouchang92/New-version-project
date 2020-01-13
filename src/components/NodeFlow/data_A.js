var data_A = {
  name: '流程A',
  nodeList: [
      {
          id: 'nodeA',
          name: '流程A-节点A',
          left: '26px',
          top: '161px',
          ico: 'el-icon-user-solid',
          show: true,
          type: 'flow'
      },
      {
          id: 'nodeB',
          name: '流程A-节点B',
          left: '340px',
          top: '161px',
          ico: 'el-icon-goods',
          show: true,
          type: 'flow'
      },
      {
          id: 'nodeC',
          name: '流程A-节点C',
          left: '739px',
          top: '161px',
          ico: 'el-icon-present',
          show: true,
          type: 'flow'
      }
  ],
  lineList: [{
      from: 'nodeA',
      to: 'nodeB'
  }, {
      from: 'nodeB',
      to: 'nodeC'
  }]
}

export function getDataA() {
  return data_A
}
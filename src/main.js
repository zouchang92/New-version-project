import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles/element-variables.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import ElTreeSelect from 'el-tree-select'
import VueFileAgent from 'vue-file-agent'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './registerServiceWorker'

import '@/styles/index.scss' // global css

// 添加自定义组件
import UCalendar from './components/Calendar/UCalendar.vue'

import App from './App'
import store from './store'
import router from './router'

import VCharts from 'v-charts'

import '@/icons' // icon
import '@/permission' // permission control
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(UCalendar)
Vue.use(window.AVUE)

Vue.use(ElTreeSelect)

Vue.use(VueFileAgent)

Vue.use(VueQuillEditor)

Vue.use(VCharts)

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

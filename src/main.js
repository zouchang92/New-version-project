import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles/element-variables.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import '@/styles/index.scss' // global css

// 添加自定义组件
import UCalendar from './components/Calendar/UCalendar.vue'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(UCalendar)
Vue.use(Avue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

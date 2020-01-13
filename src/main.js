import Vue from 'vue'
import App from './App.vue'
import router from './permission' // 经过权限处理后的router
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import 'amfe-flexible'

Vue.use(Vant) // 全局注册

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

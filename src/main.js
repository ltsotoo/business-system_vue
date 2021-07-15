import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Message from './components/base/message/index'

Vue.config.productionTip = false
Vue.prototype.$message = Message

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

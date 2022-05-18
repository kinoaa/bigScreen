import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/echarts'
import boxMixin from './mixins/box'
import vueEchartsMixin from './mixins/vueEcharts'

Vue.config.productionTip = false
Vue.mixin(boxMixin)
Vue.mixin(vueEchartsMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'; // element
import 'element-ui/lib/theme-chalk/index.css'; // element css
import '@/assets/styles/index.scss' // global css
import BaiduMap from 'vue-baidu-map';
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'sg8h16g3aCQfMVSM7tQkKvVTjpHYYsUN'
})
Vue.use(ElementUI);

new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
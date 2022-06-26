import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//charjs  zoom plugin
import ChartJsZoom from 'chartjs-plugin-zoom'

//cookie
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

// axios
import Axios from 'axios'

import vuetify from './plugins/vuetify'
const axiosConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000000,
};
Vue.prototype.$http = Axios.create(axiosConfig);
//Vue.prototype.$http.defaults.headers.common['x-access-token'] = Vue.cookie.get('x-access-token');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

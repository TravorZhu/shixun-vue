// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/dist/js/adminlte.min'
import 'fastclick/lib/fastclick'
import 'jquery-sparkline/jquery.sparkline.min'
import 'ionicons/dist/css/ionicons.min.css'
import Vuex from 'vuex'
import store from './store/index.js'
import SmartTable from 'vuejs-smart-table'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(require('vue-cookies'))
Vue.use(CKEditor)
Vue.use(SmartTable)

// eslint-disable-next-line
window.$ = $
// eslint-disable-next-line
window.jQuery = $

Vue.config.productionTip = false
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

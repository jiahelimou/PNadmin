import aMap from 'vue-amap' // 这个引入的最好放在引入的vue上面

import { VueJsonp } from 'vue-jsonp'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
// import '../src/api'

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(VueJsonp)
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

Vue.use(aMap)
aMap.initAMapApiLoader({
  key: '8180928274c86b53628ec3a27e356da4', // 你的key
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.AMapManager', 'AMap.Marker'], // 应用功能项
  v: '1.4.4', // 版本
  uiVersion: '1.0' // ui版本
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 引用mock
// 名字默认写index.js，在引入的时候就可以不用写文件名
// require(".mock/index.js")
// mock里面默认请求index.js
// require("./mock/xiaoyao")
require('../mock/xiaoyao')
// require('../mock/table')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// version: 6973.2
// 配置请求头信息
// axios.defaults.headers['version'] = '6973.2'
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: 'http://cookbook.keuaile75.top/'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: false // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做点什么
    return config
  },
  function(error) {
    // 做一些请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 对响应数据进行处理
    return response
  },
  function(error) {
    // 做一些响应错误
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  options
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin

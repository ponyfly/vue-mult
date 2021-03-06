import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import './app.css'
import './icons'

new Vue({
  el: '#app',
  router,
  render: h => <App />
})

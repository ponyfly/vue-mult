import Vue from 'vue'
import Icon from '@/common/components/icon.vue'

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

Vue.component('icon', Icon)
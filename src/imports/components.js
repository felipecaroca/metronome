import Vue from 'vue'

Vue.component('compass', require('../components/Compass').default)
Vue.component('part-line-form', require('../components/Line/Line').default)
Vue.component('part-line-view', require('../components/Line/LineView').default)
Vue.component('part', require('../components/Part').default)
import Vue from 'vue'

Vue.component('compass', require('../components/Compass').default)
Vue.component('part-line-form', require('../components/Line/PartLineForm').default)
Vue.component('part-line-view', require('../components/Line/PartLineView').default)
Vue.component('part-form', require('../components/Part/PartForm').default)
Vue.component('song-part-view', require('../components/Song/SongPartView').default)
Vue.component('part-view', require('../components/Part/PartView').default)
Vue.component('chord-form', require('../components/Chord/ChordForm').default)
Vue.component('song-form', require('../components/Song/SongForm').default)
Vue.component('song-part-name-view', require('../components/Song/SongPartNameView').default)
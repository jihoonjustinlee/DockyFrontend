import Vue from 'vue'
import App from './App.vue'
import { Plugin } from 'vue-fragment'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faToolbox, faFileDownload, faBook, faFileUpload, faStarOfLife, faFileArchive, faCode, faFileWord, faEye, faInfoCircle, faCheck, faBan, faStickyNote, faPalette, faHeading, faChevronRight, faWrench, faHammer, faTimesCircle, faClock, faBars, faEllipsisV, faComments, faHome, faColumns, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueHighlightJS from 'vue-highlightjs'

library.add(faChartLine, faToolbox, faFileDownload, faBook, faFileUpload, faStarOfLife, faFileArchive, faCode, faFileWord, faEye, faInfoCircle, faCheck, faBan, faStickyNote, faPalette, faHeading, faChevronRight, faWrench, faHammer, faTimesCircle, faClock, faBars, faEllipsisV, faComments, faHome, faColumns, faTimes, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueHighlightJS)
Vue.use(Plugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
